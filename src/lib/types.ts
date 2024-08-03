export interface Position {
	lat: number;
	lon: number;
}

export interface SearchResult {
	position: Position;
	id: string;
	speed_kw: number;
	cost_cents_per_kwh: number;
	address: string;
	time_to_reach_minutes: number | null;
	best_cost: boolean;
	best_time: boolean;
	best_rating: boolean;
	rating: number | null;
}
