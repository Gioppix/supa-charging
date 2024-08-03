<script lang="ts">
	let modal: HTMLDialogElement;
	export const show_modal = () => modal.showModal();
	export const close_modal = () => modal.close();

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	function handleClose() {
		dispatch('close');
	}
</script>

<dialog on:close={handleClose} bind:this={modal} class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		</form>
		<div class="mt-4">
			<slot />
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button class="h-full">close</button>
	</form>
</dialog>
