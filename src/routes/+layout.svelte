<script lang="ts">
	import Modal from '$lib/Modal.svelte';
	import Search from '$lib/Search.svelte';
	import Settings from '$lib/Settings.svelte';
	import Icon from '@iconify/svelte';
	import 'tailwindcss/tailwind.css';

	let settings_modal: Modal;
</script>

<div class="flex min-h-screen items-center justify-center h-[100dvh] w-[100dvw]">
	<div class="h-full w-full sm:w-auto sm:aspect-[9/16]">
		<main class="flex flex-col h-full w-full gap-4">
			<div class="">
				<Search />
			</div>
			<div class="flex-grow min-h-0">
				<slot />
			</div>
			<div class="absolute bottom-0 left-0 m-4">
				<button class="btn btn-circle btn-neutral" on:click={settings_modal.show_modal}>
					<Icon icon="material-symbols:settings-outline-rounded" height="1.5rem" />
				</button>
			</div>
			<Modal bind:this={settings_modal}>
				<Settings />
			</Modal>
		</main>
	</div>
</div>
