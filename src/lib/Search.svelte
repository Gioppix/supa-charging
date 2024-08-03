<script lang="ts">
	import Icon from '@iconify/svelte';
	import { type Position } from './types';
	import { GOOLE_MAPS_API_KEY } from './api';
	import { onMount } from 'svelte';

	let available_time_minutes = 60;
	let getting_current_location = false;
	let address_input: string;
	let using_current_location = false;
	let selected_location: Position | null = null;
	let current_location_available = true;
	let desired_charge = 80;

	// eslint-disable-next-line no-undef
	let autocomplete: google.maps.places.Autocomplete;
	let address_input_element: HTMLInputElement;

	onMount(() => {
		// eslint-disable-next-line no-undef
		autocomplete = new google.maps.places.Autocomplete(address_input_element);
		autocomplete.addListener('place_changed', onPlaceChanged);
	});

	function getCurrentLocation() {
		if ('geolocation' in navigator) {
			getting_current_location = true;
			navigator.geolocation.getCurrentPosition(
				(got_position) => {
					const { latitude, longitude } = got_position.coords;
					selected_location = { lat: latitude, lon: longitude };
					getting_current_location = false;
					address_input = 'Current location';
					using_current_location = true;
				},
				(error) => {
					console.log('error' + error.message);
					getting_current_location = false;
				},
				{
					enableHighAccuracy: true,
					maximumAge: 0
				}
			);
		} else {
			current_location_available = false;
		}
	}

	function reset() {
		using_current_location = false;
		selected_location = null;
		address_input = '';
		selected_location = null;
	}

	function onPlaceChanged() {
		const place = autocomplete.getPlace();
		if (place.geometry && place.geometry.location) {
			selected_location = {
				lat: place.geometry.location.lat(),
				lon: place.geometry.location.lng()
			};
			address_input = place.formatted_address || '';
		}
	}
</script>

<svelte:head>
	<script
		src={`https://maps.googleapis.com/maps/api/js?key=${GOOLE_MAPS_API_KEY}&libraries=places&loading=async`}
	></script>
</svelte:head>
<form class="w-full bg-base-200 form-control p-2 gap-2 rounded-b-2xl">
	<div class="flex gap-2">
		<input
			bind:this={address_input_element}
			type="text"
			placeholder="Inserisci l'indirizzo"
			bind:value={address_input}
			disabled={using_current_location}
			class="input input-bordered input-sm w-full"
		/>
		<button type="button" class="btn btn-primary btn-sm btn-square" on:click={reset}>
			<Icon icon="material-symbols:close-rounded" height="1.2rem" />
		</button>
		<button
			type="button"
			class="btn btn-primary btn-sm btn-square"
			on:click={getCurrentLocation}
			disabled={!current_location_available}
		>
			{#if getting_current_location}
				<span class="loading loading-spinner loading-xs"></span>
			{:else}
				<Icon icon="material-symbols:my-location-outline-rounded" height="1.2rem" />
			{/if}
		</button>
	</div>

	<div class="flex gap-2 items-center">
		<p class="label-text min-w-max">Charge amount:</p>
		<input
			type="range"
			min="0"
			max="100"
			bind:value={desired_charge}
			class="range range-xs flex-grow min-w-0"
		/>
		<p class="label-text-alt">{desired_charge}%</p>
	</div>

	<div class="flex gap-2">
		<div class="flex gap-2">
			<button
				type="button"
				class="btn btn-primary btn-sm btn-square"
				on:click={() => (available_time_minutes = Math.max(0, available_time_minutes - 30))}
			>
				-
			</button>
			<div class="input input-sm input-bordered flex-grow flex items-center justify-center w-20">
				{Math.floor(available_time_minutes / 60)}:{String(available_time_minutes % 60).padStart(
					2,
					'0'
				)} h
			</div>
			<button
				type="button"
				class="btn btn-primary btn-sm btn-square"
				on:click={() => (available_time_minutes += 30)}
			>
				+
			</button>
		</div>

		<a
			href={`/search/@${selected_location?.lat},${selected_location?.lon}`}
			type="submit"
			class={'btn btn-primary btn-sm flex-grow ' + (selected_location ? '' : 'btn-disabled')}
		>
			Cerca
		</a>
	</div>
</form>
