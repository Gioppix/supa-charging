<script lang="ts">
	import { get } from 'svelte/store';
	import { battery_size, compatible_chargers, range } from './storage';
	import { ALL_TYPES } from './types';

	let inputValue: number | null = get(battery_size);

	function reset() {
		inputValue = null;
		battery_size.set(null);
	}

	function update() {
		if (inputValue !== null) {
			battery_size.set(inputValue);
		}
	}
</script>

<div class="form-control gap-6">
	<div>
		<label class="label" for="battery-size">
			<span class="label-text">Battery Size (kWh)</span>
		</label>
		<div class="input-group flex gap-2">
			<input
				type="number"
				id="battery-size"
				placeholder="Enter battery size"
				class="input input-bordered w-full input-sm"
				bind:value={inputValue}
			/>
			<button class="btn btn-outline btn-sm" on:click={reset}>Reset</button>
			<button class="btn btn-primary btn-sm" on:click={update}>Update</button>
		</div>
	</div>
	<div>
		<label class="label" for="range">
			<span class="label-text"> Current Range (km): {$range} </span>
		</label>
		<div class="input-group flex gap-2">
			<input type="range" min="0" max="200" class="range" bind:value={$range} />
		</div>
	</div>
	<div>
		<div class="label">
			<span class="label-text"> Compatible chargers </span>
		</div>
		<div class="flex flex-wrap gap-2">
			{#each ALL_TYPES as charger_type}
				<label class="label cursor-pointer gap-2 bg-base-200 rounded-md p-2">
					<span class="label-text"> {charger_type} </span>
					<input
						type="checkbox"
						checked={$compatible_chargers.includes(charger_type)}
						class="checkbox"
						on:change={(e) => {
							$compatible_chargers = [
								...$compatible_chargers.filter((c) => c != charger_type),
								...(e.currentTarget.checked ? [charger_type] : [])
							];
						}}
					/>
				</label>
			{/each}
		</div>
	</div>
</div>
