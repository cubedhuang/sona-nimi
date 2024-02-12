<script lang="ts">
	import type { PageData } from './$types';

	import type { Word } from '$lib/types';
	import { azWordSort } from '$lib/util';
	import { filter } from '$lib/search';
	import { categories, language } from '$lib/stores';

	import LukaPonaEntry from './LukaPonaEntry.svelte';
	import Search from '$lib/components/Search.svelte';
	import WordDetails from '$lib/components/WordDetails.svelte';

	export let data: PageData;

	const words = Object.values(data.data);

	let search = '';
	let selectedWord: Word | null = null;

	$: genericFilteredWords = words
		.filter(word => word.luka_pona)
		.sort(azWordSort);

	$: filteredWords = filter(genericFilteredWords, search, $language);
</script>

<svelte:head>
	<title>luka pona &ndash; nimi.li</title>

	<meta name="author" content="jan Tani" />
	<meta name="description" content="interactive toki pona dictionary" />
	<meta
		name="keywords"
		content="toki pona, toki pona dictionary, dictionary, nimi, luka pona, sign language, toki pona sign language, toki pona sign language dictionary"
	/>

	<meta property="og:title" content="ilo ku – nimi.li" />
	<meta property="og:author" content="jan Tani" />
	<meta
		property="og:description"
		content="interactive toki pona dictionary"
	/>
	<meta property="og:url" content="https://nimi.li/luka-pona" />
	<meta property="og:site_name" content="nimi.li" />
	<meta property="og:type" content="website" />
</svelte:head>

<h1 class="text-4xl">luka pona</h1>

<p class="mt-2">Explore and search for <b>Luka Pona</b> signs.</p>

<p class="mt-4 faded">
	{filteredWords.length} / {genericFilteredWords.length}
</p>

<Search placeholder="o alasa..." bind:value={search} />

<div class="mt-4 grid gap-4 lp">
	{#each filteredWords as word (word.id)}
		<LukaPonaEntry
			{word}
			on:click={() => {
				if (selectedWord?.id === word.id) selectedWord = null;
				else selectedWord = word;
			}}
		/>
	{/each}
</div>

{#if !filteredWords.length}
	<p>wile sina la, nimi li lon ala!</p>
	<p class="faded">Your query didn't match any words!</p>
{/if}

<WordDetails
	bind:word={selectedWord}
	on:refer={e => {
		if (!filteredWords.some(word => word.word === e.detail)) {
			search = '';
		}
	}}
/>

<style lang="postcss">
	.lp {
		grid-template-columns: repeat(
			auto-fill,
			minmax(theme('width.64'), 1fr)
		);
	}
</style>
