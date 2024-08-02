export interface Position {
	lat: number;
	lon: number;
}

export interface SearchResult {
	position: Position;
	id: string;
	speed_watts: number;
	cost_cents_per_kwh: number;
	address: string;
	time_to_reach_minutes: string;
}
