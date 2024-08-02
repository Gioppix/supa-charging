import type { Position, SearchResult } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const position: Position = {
		lat: parseFloat(params.lat),
		lon: parseFloat(params.lon)
	};

	if (isNaN(position.lat) || isNaN(position.lon)) {
		throw new Error('Invalid latitude or longitude');
	}
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
	return { results };
};
