import { writable } from 'svelte/store';

export function persistentStore<T>(key: string, initialValue: T) {
	const is_browser = typeof window !== 'undefined' && window.localStorage;

	const storedValue = is_browser ? localStorage.getItem(key) : null;
	const initial = storedValue ? JSON.parse(storedValue) : initialValue;

	const store = writable<T>(initial);

	if (is_browser) {
		store.subscribe((value) => {
			localStorage.setItem(key, JSON.stringify(value));
		});
	}

	return store;
}

export const battery_size = persistentStore<number | null>('battery_size', null);

export const range = persistentStore<number>('range', 10);

export const compatible_chargers = persistentStore<string[]>('compatible_chargers', []);

export const user_uuid = persistentStore<string>(
	'user_uuid',
	Math.floor(Math.random() * 100000).toString()
);
