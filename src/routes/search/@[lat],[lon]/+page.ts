import { get_charging_stations } from '$lib/api';
import type { Position } from '$lib/types';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';
import { battery_size, compatible_chargers, range } from '$lib/storage';

export const load: PageLoad = async ({ params, url }) => {
	const position: Position = {
		lat: parseFloat(params.lat),
		lon: parseFloat(params.lon)
	};
	const raw_available_time_minutes = url.searchParams.get('available_time_minutes');
	const available_time_minutes = raw_available_time_minutes
		? parseFloat(raw_available_time_minutes) / 60
		: null;

	const raw_desired_charge = url.searchParams.get('desired_charge');
	const desired_charge = raw_desired_charge ? parseFloat(raw_desired_charge) : null;

	if (isNaN(position.lat) || isNaN(position.lon)) {
		throw new Error('Invalid latitude or longitude');
	}

	async function load_data() {
		const results = await get_charging_stations(
			position.lat,
			position.lon,
			available_time_minutes,
			get(battery_size),
			get(compatible_chargers),
			desired_charge,
			get(range)
		);
		return results ?? [];
	}

	return { results_promise: load_data(), selected_location: position };
};
