<script lang="ts">
	import { get } from 'svelte/store';
	import { battery_size } from './storage';

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

<div class="form-control">
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
