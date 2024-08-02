<script lang="ts">
	import Icon from '@iconify/svelte';
	export let icon: string;
	export let text: string;
</script>

<span class="inline-flex items-center gap-1">
	<Icon icon={`material-symbols:${icon}`} class="h-[1em]" />
	{text}
</span>
