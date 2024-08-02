import { writable } from 'svelte/store';

export const battery_size = writable<number | null>(null);
