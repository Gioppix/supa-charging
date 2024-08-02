<script lang="ts">
	import Icon from '@iconify/svelte';
	import { type Position } from './types';
	let address = '';
	let available_time_minutes = 60;
	let desiredChargePercentage = '';
	let currentLocation = '';
	let current_location_available = true;
	let desired_charge = 80;

	let position: Position | null = null;

	function getCurrentLocation() {
		console.log('getting location');
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				(got_position) => {
					console.log('got position');
					const { latitude, longitude } = got_position.coords;
					position = { lat: latitude, lon: longitude };
					currentLocation = `${latitude}, ${longitude}`;
					address = currentLocation;
				},
				(error) => {
					console.log('error' + error.message);
				},
				{
					enableHighAccuracy: true
				}
			);
		} else {
			current_location_available = false;
		}
	}

	function handleSubmit() {
		// Handle form submission here
		console.log({ address, availableTime: available_time_minutes, desiredChargePercentage });
	}
</script>

<form
	class="w-full bg-base-200 form-control p-2 gap-2 rounded-b-2xl"
	on:submit|preventDefault={handleSubmit}
>
	<div class="flex gap-2">
		<input
			type="text"
			placeholder="Inserisci l'indirizzo"
			bind:value={address}
			class="input input-bordered input-sm w-full"
		/>
		<button
			type="button"
			class="btn btn-primary btn-sm btn-square"
			on:click={getCurrentLocation}
			disabled={!current_location_available}
		>
			<Icon icon="material-symbols:my-location-outline-rounded" height="1.2rem" />
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
			href={`/search/@${position?.lat},${position?.lon}`}
			type="submit"
			class={'btn btn-primary btn-sm flex-grow ' + (position ? '' : 'btn-disabled')}>Cerca</a
		>
	</div>
</form>
