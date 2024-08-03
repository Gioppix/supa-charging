<script lang="ts">
	import 'leaflet/dist/leaflet.css';
	import 'leaflet/dist/leaflet.css';
	import { afterUpdate, onDestroy, onMount } from 'svelte';
	import type { DivIcon, Map as LeafletMap } from 'leaflet';
	import Charger from './Charger.svelte';

	export let data;

	let L: typeof import('leaflet');
	let map: LeafletMap;

	function createIcon(color: string): DivIcon {
		return L.divIcon({
			html: `<svg version="1.1" id="icons" xmlns="http://www.w3.org/2000/svg" width="30" height="30" x="0" y="0" viewBox="0 0 128 128" style="enable-background:new 0 0 128 128" xml:space="preserve"><style>.st0,.st1{display:none;fill:#191919}.st1,.st4{fill-rule:evenodd;clip-rule:evenodd}.st4,.st5{display:inline;fill:#191919}</style><g id="row1"><path id="nav:4" d="M64 1C38.8 1 18.3 21.2 18.3 46S64 127 64 127s45.7-56.2 45.7-81S89.2 1 64 1zm0 73.9c-16.6 0-30-13.2-30-29.5C34 29 47.4 15.8 64 15.8S94 29 94 45.3 80.6 74.9 64 74.9z" style="fill-rule:evenodd;clip-rule:evenodd;fill:${color}"/><circle cx="64" cy="45.3" r="29.5" fill="white"/></g></svg>`,
			className: 'svg-icon'
		});
	}

	onMount(async () => {});
	onDestroy(() => {
		if (map) {
			map.remove();
		}
	});
	async function mount_map() {
		console.log('mounting');
		const results = await data.results_promise;
		L = await import('leaflet');
		map = L.map('map');
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
		const bounds = L.latLngBounds(
			[data.selected_location.lat, data.selected_location.lon],
			[data.selected_location.lat, data.selected_location.lon]
		);

		L.marker([data.selected_location.lat, data.selected_location.lon])
			.setIcon(createIcon('red'))
			.addTo(map)
			.bindPopup('Current location');
		results.forEach((r) => {
			const domelement = document.getElementById(JSON.stringify(r));
			if (!domelement) return;
			const marker = L.marker([r.coords.lat, r.coords.lon])
				.addTo(map)
				.bindPopup(domelement, {
					className: 'custom-popup',
					closeButton: false,
					minWidth: 300,
					pane: 'popupPane',
					content: '<div></div>'
				})
				.setIcon(createIcon('black'));
			if (r.best_cost) {
				marker.setIcon(createIcon('var(--fallback-a,oklch(var(--a)/var(--tw-bg-opacity)))'));
			} else if (r.best_time_recharging) {
				marker.setIcon(createIcon('var(--fallback-s,oklch(var(--p)/var(--tw-bg-opacity)))'));
			} else if (r.best_rating) {
				marker.setIcon(createIcon('var(--fallback-s,oklch(var(--s)/var(--tw-bg-opacity)))'));
			}
			bounds.extend([r.coords.lat, r.coords.lon]);
		});
		map.fitBounds(bounds);
	}

	afterUpdate(() => {
		if (list) {
			map?.remove();
		} else {
			mount_map();
		}
	});

	let list = true;
</script>

<div class="flex flex-col p-2 h-full w-full bg-base-200 rounded-t-xl">
	<div role="tablist" class="tabs tabs-boxed">
		<button role="tab" class={'tab ' + (list ? 'tab-active' : '')} on:click={() => (list = true)}>
			List
		</button>
		<button role="tab" class={'tab ' + (list ? '' : 'tab-active')} on:click={() => (list = false)}>
			Map
		</button>
	</div>
	{#await data.results_promise}
		<div class="skeleton h-full w-full rounded-b-none"></div>
	{:then results}
		<div
			class={'flex flex-col gap-4 flex-grow min-h-0 p-2 pb-0 overflow-y-scroll overflow-x-hidden ' +
				(list ? '' : 'hidden')}
		>
			{#each results as result}
				<div id={JSON.stringify(result)}>
					<Charger {result} />
				</div>
			{/each}
		</div>
		<div class={'h-full w-full ' + (list ? ' hidden' : '')} id="map"></div>
	{/await}
</div>

<style>
	:global(.custom-popup) {
		padding: 0;
		margin: 0;
		margin-bottom: 20px;
	}

	:global(.custom-popup > div) {
		background: none;
		box-shadow: none;
		padding: 0;
		margin: 0;
	}

	:global(.custom-popup > div > div) {
		background: none;
		box-shadow: none;
		padding: 0;
		margin: 0;
	}
</style>
