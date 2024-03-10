<script lang="ts">
	import type { LocalizedWord } from '@kulupu-linku/sona';

	import type { PageData } from './$types';

	import { azWordSort } from '$lib/util';
	import { filter } from '$lib/search';
	import { categories, language, sitelenMode, viewMode } from '$lib/stores';

	import Search from '$lib/components/Search.svelte';
	import Select from '$lib/components/Select.svelte';
	import WordDetails from '$lib/components/WordDetails.svelte';
	import WordView from '$lib/components/WordView.svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;

	$: words = Object.values(data.words);

	let search = '';
	let selectedWord: LocalizedWord | null = null;

	$: filteredWords = filter(words, search, $language);
</script>

<svelte:head>
	<title>sandbox &ndash; nimi.li</title>

	<meta name="author" content="ilo Tani" />
	<meta
		name="description"
		content="Find and explore Linku's nimisin sandbox."
	/>
	<meta
		name="keywords"
		content="toki pona, toki pona dictionary, dictionary, nimi, sandbox"
	/>

	<meta property="og:title" content="luka pona – nimi.li" />
	<meta property="og:author" content="ilo Tani" />
	<meta
		property="og:description"
		content="Find and explore Linku's nimisin sandbox."
	/>
	<meta property="og:url" content="https://nimi.li/sandbox" />
	<meta property="og:image" content="https://nimi.li/favicon.png" />
	<meta property="og:site_name" content="nimi.li" />
	<meta property="og:type" content="website" />
</svelte:head>

<h1 class="text-4xl">sandbox</h1>

<p class="mt-2 leading-relaxed">
	Find and explore Linku's nimisin <b>sandbox</b>. These words are not notable
	enough to be added to the main dictionary but are still documented, either
	for historical reasons or in case usage of a word rises before the next
	survey.
</p>

<div class="mt-4 flex flex-wrap gap-1 sm:gap-x-2 sm:gap-y-1">
	<Select
		name="View"
		options={[
			{ label: 'Normal View', value: 'normal' },
			{ label: 'Detailed View', value: 'detailed' },
			{ label: 'Compact View', value: 'compact' },
			{ label: 'Glyph View', value: 'glyphs' }
		]}
		bind:value={$viewMode}
	/>

	<Select
		name="sitelen type"
		options={[
			{ label: 'sitelen pona', value: 'pona' },
			{ label: 'sitelen sitelen', value: 'sitelen' },
			{ label: 'sitelen jelo', value: 'jelo' },
			{ label: 'sitelen Emosi', value: 'emosi' }
		]}
		bind:value={$sitelenMode}
	/>
</div>

<p class="mt-2 faded">
	{filteredWords.length} / {words.length}
</p>

<Search placeholder="o alasa..." bind:value={search} />

<WordView
	words={filteredWords}
	on:select={e => {
		if (selectedWord?.id === e.detail.id) selectedWord = null;
		else selectedWord = e.detail;
	}}
/>

{#if !filteredWords.length}
	<p>wile sina la, nimi li lon ala!</p>
	<p class="faded">Your query didn't match any words!</p>
{/if}

<WordDetails
	bind:word={selectedWord}
	on:refer={e => {
		if (!filteredWords.some(word => word.word === e.detail)) {
			if (!words.some(word => word.word === e.detail)) {
				goto(`/${e.detail}`);
			} else {
				search = '';
			}
		}
	}}
/>
