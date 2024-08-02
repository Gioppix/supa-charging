<script lang="ts">
	import Result from './Result.svelte';

	export let data;
</script>

<div class="flex flex-col gap-4 h-full p-2 pb-0 overflow-y-scroll overflow-x-hidden">
	{#await data.results}
		<div class="skeleton h-full w-full rounded-b-none"></div>
	{:then results}
		{#each results as result}
			<Result {result} />
		{/each}
	{/await}
</div>
