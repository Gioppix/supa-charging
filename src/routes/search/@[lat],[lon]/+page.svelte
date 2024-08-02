<script lang="ts">
	import Result from './Result.svelte';

	export let data;
</script>

<div class="flex flex-col gap-4 h-full p-2 overflow-y-scroll overflow-x-hidden">
	{#each data.results as result}
		<Result {result} />
	{/each}
</div>
