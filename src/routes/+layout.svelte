<script>
	import Search from '$lib/Search.svelte';
	import 'tailwindcss/tailwind.css';
</script>

<div class="flex min-h-screen items-center justify-center h-[100dvh] w-[100dvw]">
	<div class="h-full w-full sm:w-auto sm:aspect-[9/16]">
		<main class="flex flex-col h-full w-full gap-4 overflow-hidden">
			<div class="">
				<Search />
			</div>
			<div class="flex-grow min-h-0">
				<slot />
			</div>
		</main>
	</div>
</div>
