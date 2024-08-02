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
			<div class="flex flex-wrap gap-2">
				<IconText icon="wallet" text={result.cost_cents_per_kwh.toFixed(3) + ' €'} />
				<IconText icon="bolt-rounded" text={Math.floor(result.speed_watts / 1000) + ' kWh'} />
				<IconText icon="timer-outline-rounded" text="1:30 h" />
			</div>
			<span class="badge">Badge</span>

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
			<p class="whitespace-nowrap min-w-max">{result.time_to_reach_minutes + ' min'}</p>
		</div>
	</div>
</div>
