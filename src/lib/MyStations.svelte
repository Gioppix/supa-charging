<script lang="ts">
	import { onMount } from 'svelte';
	import Modal from './Modal.svelte';
	import { createClient } from '@supabase/supabase-js';
	import { ALL_TYPES } from './types';
	import { user_uuid } from './storage';
	import { get, writable } from 'svelte/store';
	import Icon from '@iconify/svelte';

	const supabase = createClient(
		'https://tkzqhmeownsmxalsizmq.supabase.co',
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrenFobWVvd25zbXhhbHNpem1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI2Nzc4MzEsImV4cCI6MjAzODI1MzgzMX0.xBCr-r_K-9GtrloxEscjIZbc5lgEaH8nmOwqthZbnbg'
	);

	let new_station_modal: Modal;
	let latitude: number;
	let longitude: number;
	let street: string;
	let outletType: string;
	let powerWatt: number;
	let cost: number;
	let address_input_element: HTMLInputElement;

	let chargers_promise = writable(get_personal_stations());

	async function get_personal_stations() {
		let { data: stations } = await supabase
			.from('stations')
			.select('*')
			.eq('user_uuid', get(user_uuid))
			.throwOnError();
		if (!stations) throw new Error();
		return stations;
	}

	async function addStation() {
		const { error } = await supabase
			.from('stations')
			.insert([
				{
					lat: latitude,
					lon: longitude,
					street,
					outletType,
					powerWatt,
					cost,
					station_uuid: Math.floor(Math.random() * 100000),
					user_uuid: get(user_uuid)
				}
			])
			.select();
		if (error) console.error('Error adding station:', error);
		else {
			new_station_modal.close_modal();
			chargers_promise.set(get_personal_stations());
			// Optionally, refresh the stations list here
		}
	}

	onMount(() => {
		console.log('mounting');
		// eslint-disable-next-line no-undef
		const autocomplete = new google.maps.places.Autocomplete(address_input_element);
		console.log(address_input_element);
		autocomplete.addListener('place_changed', () => {
			const place = autocomplete.getPlace();
			if (place.geometry && place.geometry.location) {
				latitude = place.geometry.location.lat();
				longitude = place.geometry.location.lng();
				street = place.formatted_address || '';
			}
		});
	});
</script>

<div class="form-control gap-4 max-h-[70dvh]">
	<h2 class="font-bold text-xl">My Stations</h2>
	<button class="btn btn-sm btn-primary" on:click={new_station_modal.show_modal}>New station</button
	>

	{#await $chargers_promise}
		Loading stations...
	{:then stations}
		{#each stations as station}
			<div class="join flex items-center">
				<p class=" input input-sm truncate flex-grow join-item bg-base-300">{station.street}</p>
				<button
					class="btn btn-sm btn-error shrink-0 join-item"
					on:click={async () => {
						const { error } = await supabase
							.from('stations')
							.delete()
							.eq('station_uuid', station.station_uuid);
						chargers_promise.set(get_personal_stations());
					}}
				>
					<Icon icon="material-symbols:delete-rounded" height="1.2rem" /></button
				>
			</div>
		{/each}
	{/await}

	<Modal bind:this={new_station_modal}>
		<form class="form-control gap-4" on:submit|preventDefault={addStation}>
			<input
				bind:this={address_input_element}
				bind:value={street}
				type="text"
				placeholder="Address"
				class="input input-bordered relative"
				required
			/>
			<input
				bind:value={latitude}
				type="number"
				step="any"
				placeholder="Latitude"
				class="input input-bordered"
				required
			/>
			<input
				bind:value={longitude}
				type="number"
				step="any"
				placeholder="Longitude"
				class="input input-bordered"
				required
			/>

			<select bind:value={outletType} class="select select-bordered" required>
				<option value="" disabled selected>Select Outlet Type</option>
				{#each ALL_TYPES as type}
					<option value={type}>{type}</option>
				{/each}
			</select>
			<input
				bind:value={powerWatt}
				type="number"
				step="any"
				placeholder="Power (kW)"
				class="input input-bordered"
				required
			/>
			<input
				bind:value={cost}
				type="number"
				step="any"
				placeholder="Cost (€/kWh)"
				class="input input-bordered"
				required
			/>
			<button type="submit" class="btn btn-primary">Add Station</button>
		</form>
	</Modal>
</div>
