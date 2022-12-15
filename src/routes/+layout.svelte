<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import '../app.css';
</script>

<div class="px-8 lg:px-16 max-w-screen-2xl m-auto font-text">
	<Nav />

	<div class="pt-8 pb-24" data-sveltekit-preload-data="hover">
		<slot />
	</div>
</div>
