<script lang="ts">
	import '../app.css';
</script>

<svelte:head>
	<title>sona nimi</title>

	<meta name="author" content="jan Tani" />
	<meta name="description" content="interactive toki pona dictionary" />
	<meta
		name="keywords"
		content="toki pona, toki pona dictionary, dictionary, nimi"
	/>

	<meta property="og:title" content="sona nimi" />
	<meta property="og:description" content="interactive toki pona dictionary" />
	<meta property="og:url" content="https://nimi.dan.onl/" />
</svelte:head>

<div
	class="px-8 py-16 lg:px-16 max-w-screen-2xl m-auto"
	data-sveltekit-prefetch
>
	<slot />
</div>
