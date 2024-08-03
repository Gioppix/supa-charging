import type { SearchResult } from './types';

const API_URL = 'https://opendatahackathon-production.up.railway.app';
// const API_URL = 'http://10.100.1.160:3000';
export const GOOLE_MAPS_API_KEY = 'AIzaSyCszTXCRzVkOftnnG4WJGJoKihWEK56_k4';

export interface Plug {
	coords: {
		lat: number;
		lon: number;
	};
	uuid: string;
	roaDistance: number | null;
	powerWatt: number;
	outletType: string;
	cost_estimate: number | null;
	rating: number | null;
	cost: number;
	count: number;
	recharge_time_estimate: number | null;
	street_view_image: string | null;
	street: string;
	best_cost: boolean;
	best_time_recharging: boolean;
	best_rating: boolean;
	best_overall: boolean;
}

export async function get_charging_stations(
	lat: number,
	lon: number,
	time_for_charging_hours: number | null,
	battery_capacity: number | null,
	outlet_types: string[],
	percentage_to_charge: number | null,
	range: number
): Promise<Plug[] | null> {
	const url = new URL(`${API_URL}/destinations`);
	const params = {
		latitude: lat,
		longitude: lon,
		time_for_charging_hours,
		battery_capacity,
		percentage_to_charge,
		range
	};
	const searchParams = new URLSearchParams(params as unknown as Record<string, string>);
	outlet_types.forEach((type) => searchParams.append('outlet_types', type));
	url.search = searchParams.toString();

	try {
		const response = await fetch(url);
		const data = (await response.json()) as Plug[];
		console.log(data.filter((p) => !p));
		return data.filter((p) => p);
	} catch (error) {
		console.error('Error:', error);
		return null;
	}
}
