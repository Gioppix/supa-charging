<script lang="ts">
	import IconText from '$lib/IconText.svelte';
	import type { SearchResult } from '$lib/types';
	import Icon from '@iconify/svelte';
	export let result: SearchResult;
</script>

<div class="card card-compact bg-base-300 w-full shadow-md p-3">
	<div class="flex flex-row">
		<div class="flex-grow min-w-0 flex flex-col">
			<h2 class="card-title">Card title!</h2>
			<div class="flex flex-wrap gap-2">
				<IconText icon="wallet" text={result.cost_cents_per_kwh + ' €'} />
				<IconText icon="bolt-rounded" text={Math.floor(result.speed_watts / 1000) + ' kWh'} />
				<IconText icon="timer-outline-rounded" text="1:30 h" />
			</div>

			<!-- <Icon icon="mdi-light:home" /> -->
		</div>
		<div class="flex items-center justify-center flex flex-col">
			<a
				href={`https://www.google.com/maps/search/?api=1&query=${result.position.lat}%2C${result.position.lon}`}
				target="_blank"
				class="btn btn-success btn-square rounded-xl"
			>
				<Icon icon="material-symbols:directions" height="1.5rem" />
			</a>
			5 min
		</div>
	</div>
</div>
