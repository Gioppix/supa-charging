<script lang="ts">
	import IconText from '$lib/IconText.svelte';
	import type { SearchResult } from '$lib/types';
	import Icon from '@iconify/svelte';
	export let result: SearchResult;
</script>

<div class="card card-compact bg-base-300 w-full shadow-md p-3">
	<div class="flex flex-row gap-3">
		<div class="flex-grow min-w-0 flex flex-col gap-1">
			<div class="flex gap-2 items-center">
				<h2 class="font-bold text-lg min-w-0 flex-grow overflow-hidden text-nowrap text-ellipsis">
					{result.address}
				</h2>
			</div>
			{#if result.rating}
				<IconText icon="star-outline-rounded" text={result.rating.toString()} />
			{/if}
			<div class="flex flex-wrap gap-3">
				<IconText icon="wallet" text={result.cost_cents_per_kwh.toFixed(3) + ' €'} />
				<IconText icon="bolt-rounded" text={Math.floor(result.speed_kw) + ' kWh'} />
				<IconText icon="timer-outline-rounded" text="1:30 h" />
			</div>
			<div class="flex gap-2">
				{#if result.best_cost}
					<span class="badge badge-accent"> Cheapest </span>
				{/if}
				{#if result.best_time}
					<span class="badge badge-primary"> Fastest </span>
				{/if}
				{#if result.best_rating}
					<span class="badge badge-secondary"> Nicest </span>
				{/if}
			</div>

			<!-- <Icon icon="mdi-light:home" /> -->
		</div>
		<div class="flex items-center justify-center flex-col">
			<a
				href={`https://www.google.com/maps/search/?api=1&query=${result.position.lat}%2C${result.position.lon}`}
				target="_blank"
				class="btn btn-success btn-square rounded-xl"
			>
				<Icon icon="material-symbols:directions" height="1.5rem" />
			</a>
			{#if result.time_to_reach_minutes}
				<p class="whitespace-nowrap min-w-max">{result.time_to_reach_minutes + ' min'}</p>
			{/if}
		</div>
	</div>
</div>
