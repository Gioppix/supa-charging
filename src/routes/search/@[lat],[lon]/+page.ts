import { get_charging_stations } from '$lib/api';
import type { Position, SearchResult } from '$lib/types';
import type { PageLoad } from './$types';

async function load_data() {
	await new Promise((resolve) => setTimeout(resolve, 2000));
	await get_charging_stations();

	let results: SearchResult[] = [
		{
			cost_cents_per_kwh: 100,
			id: 'charging1',
			position: {
				lat: 45,
				lon: 9
			},
			speed_watts: 22000
		},
		{
			cost_cents_per_kwh: 200,
			id: 'charging2',
			position: {
				lat: 46,
				lon: 9
			},
			speed_watts: 11000
		},
		{
			cost_cents_per_kwh: 300,
			id: 'charging3',
			position: {
				lat: 45,
				lon: 9
			},
			speed_watts: 50000
		}
	];
	results = [...results, ...results, ...results, ...results, ...results];
	return results;
}

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
		console.log(results);
		return results ?? [];
	}

	return { results: load_data() };
};
