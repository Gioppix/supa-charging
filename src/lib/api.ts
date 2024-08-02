import type { SearchResult } from './types';

const API_URL = 'http://10.100.1.160:3052';

interface Plug {
	coords: {
		lat: number;
		lon: number;
	};
	street: string;
	uuid: string;
	roaDistance: number | null;
	powerWatt: number;
	outletType: string;
	rating: number | null;
	cost: number;
}

export async function get_charging_stations(
	lat: number,
	lon: number,
	distance_meters: number
): Promise<SearchResult[] | null> {
	const url = new URL(`${API_URL}/destinations`);
	const params = {
		latitude: lat,
		longitude: lon,
		distance_meters
	};
	url.search = new URLSearchParams(params as unknown as Record<string, string>).toString();

	try {
		const response = await fetch(url);
		const data = (await response.json()) as Plug[];
		return data.map((p) => ({
			cost_cents_per_kwh: p.cost,
			id: p.uuid,
			position: {
				lat: p.coords.lat,
				lon: p.coords.lon
			},
			speed_watts: p.powerWatt,
			address: p.street,
			time_to_reach_minutes: p.roaDistance
		}));
	} catch (error) {
		console.error('Error:', error);
		return null;
	}
}
