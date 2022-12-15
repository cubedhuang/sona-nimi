<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import '../app.css';
</script>

<div
	class="px-8 py-20 lg:px-16 max-w-screen-2xl m-auto font-text"
	data-sveltekit-preload-data="hover"
>
	<Nav />
	<slot />
</div>
