<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Modal from '$lib/Modal.svelte';
	import MyStations from '$lib/MyStations.svelte';
	import Search from '$lib/Search.svelte';
	import Settings from '$lib/Settings.svelte';
	import Icon from '@iconify/svelte';
	import 'tailwindcss/tailwind.css';
	import { GOOLE_MAPS_API_KEY } from '$lib/api';

	let settings_modal: Modal;
	let my_stations_modal: Modal;
</script>

<svelte:head>
	<script
		src={`https://maps.googleapis.com/maps/api/js?key=${GOOLE_MAPS_API_KEY}&libraries=places`}
	></script>
</svelte:head>

<div class="flex items-center justify-center h-[100dvh] w-[100dvw]">
	<div class="h-full w-full sm:w-auto sm:aspect-[9/16]">
		<main class="flex flex-col h-full w-full gap-4">
			<div class="">
				<Search />
			</div>
			<div class="flex-grow min-h-0">
				<slot />
			</div>
			<div class="absolute bottom-0 left-0 m-4 z-20 join join-vertical">
				<button
					class="btn btn-circle btn-neutral join-item"
					on:click={my_stations_modal.show_modal}
				>
					<Icon icon="material-symbols:deployed-code-account-outline-rounded" height="1.5rem" />
				</button>
				<button class="btn btn-circle btn-neutral join-item" on:click={settings_modal.show_modal}>
					<Icon icon="material-symbols:settings-outline-rounded" height="1.5rem" />
				</button>
			</div>
			<Modal bind:this={settings_modal} on:close={() => invalidateAll()}>
				<Settings />
			</Modal>
			<Modal bind:this={my_stations_modal} on:close={() => invalidateAll()}>
				<MyStations />
			</Modal>
		</main>
	</div>
</div>
