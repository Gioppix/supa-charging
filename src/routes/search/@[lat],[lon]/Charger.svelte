<script lang="ts">
	import { type Plug } from '$lib/api';
	import IconText from '$lib/IconText.svelte';
	import Icon from '@iconify/svelte';
	export let result: Plug;

	let open = false;
</script>

<div class="card card-compact bg-base-300 w-full shadow-md p-3">
	<button class="flex flex-row gap-5 text-left" on:click={() => (open = !open)}>
		<div class="flex-grow min-w-0 flex flex-col gap-1">
			<div class="flex gap-2 items-center">
				<h2 class="font-bold text-lg min-w-0 flex-grow overflow-hidden text-nowrap text-ellipsis">
					{result.street ?? 'Charging Station'}
				</h2>
			</div>
			{#if result.rating}
				<IconText icon="star-outline-rounded" text={result.rating.toString()} />
			{/if}
			<div class="flex flex-wrap gap-x-3 gap-y-0">
				{#if result.cost_estimate}
					<IconText icon="wallet" text={result.cost_estimate.toFixed(2) + ' €'} />
				{/if}
				{#if result.powerWatt}
					<IconText icon="bolt-rounded" text={Math.floor(result.powerWatt) + ' kWh'} />
				{/if}
				{#if result.recharge_time_estimate}
					<IconText
						icon="timer-outline-rounded"
						text={`${Math.floor(result.recharge_time_estimate)} h ${String(
							Math.round((result.recharge_time_estimate % 1) * 60)
						).padStart(2, '0')} min`}
					/>
				{/if}
				{#if result.outletType}
					<IconText icon="power-plug-outline-rounded" text={result.outletType} />
				{/if}
			</div>
			<div class="flex gap-2">
				{#if result.best_cost}
					<span class="badge badge-accent"> Cheapest </span>
				{/if}
				{#if result.best_time_recharging}
					<span class="badge badge-primary"> Fastest </span>
				{/if}
				{#if result.best_overall}
					<span class="badge badge-secondary"> Best Overall </span>
				{/if}
			</div>

			<!-- <Icon icon="mdi-light:home" /> -->
		</div>
		<div class="flex items-center justify-center flex-col">
			<a
				href={`https://www.google.com/maps/search/?api=1&query=${result.coords.lat}%2C${result.coords.lon}`}
				target="_blank"
				class="btn btn-success btn-square rounded-xl"
			>
				<Icon icon="material-symbols:directions" height="1.5rem" />
			</a>
			{#if result.roaDistance}
				<p class="whitespace-nowrap min-w-max">{result.roaDistance + ' min'}</p>
			{/if}
		</div>
	</button>
	{#if open}
		<div class="flex flex-col mt-3 gap-3">
			<img
				alt="street-view-img"
				src={`https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${result.coords.lat},${result.coords.lon}&key=AIzaSyCszTXCRzVkOftnnG4WJGJoKihWEK56_k4`}
			/>
			<!-- <div class="flex gap-3">
				<button class="btn flex-grow min-w-0 btn-sm btn-error"> Already Occupied </button>
				<button class="btn flex-grow min-w-0 btn-sm btn-success"> Charghing here </button>
			</div> -->
		</div>
	{/if}
</div>
