import { get_charging_stations } from '$lib/api';
import type { Position } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const position: Position = {
		lat: parseFloat(params.lat),
		lon: parseFloat(params.lon)
	};

	if (isNaN(position.lat) || isNaN(position.lon)) {
		throw new Error('Invalid latitude or longitude');
	}

	async function load_data() {
		const results = await get_charging_stations(position.lat, position.lon, 10000);
		return results ?? [];
	}

	return { results_promise: load_data(), selected_location: position };
};
