<script lang="ts">
	import { onMount } from 'svelte';

	import type { LocalizedWord } from '@kulupu-linku/sona';

	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	import { filter } from '$lib/search';
	import { language, sitelenMode, viewMode } from '$lib/stores';
	import { azWordSort, recognitionWordSort } from '$lib/util';

	import Search from '$lib/components/Search.svelte';
	import Select from '$lib/components/Select.svelte';
	import SelectLanguage from '$lib/components/SelectLanguage.svelte';
	import WordDetails from '$lib/components/WordDetails.svelte';
	import WordView from '$lib/components/WordView.svelte';

	export let data: PageData;

	$: words = Object.values(data.words);

	let search = '';
	let selectedWord: LocalizedWord | null = null;

	let sortingMethod: 'alphabetical' | 'recognition' = 'recognition';

	$: genericSorter =
		sortingMethod === 'alphabetical' ? azWordSort : recognitionWordSort;

	$: sortedWords = words.sort(genericSorter);
	$: filteredWords = filter(sortedWords, search, $language);

	let fetchedTranslations = ['en'];

	$: missingDefinitions =
		$language !== 'en' &&
		fetchedTranslations.includes($language) &&
		sortedWords.some(
			word =>
				!word.translations[$language]?.definition ||
				word.translations[$language].definition ===
					word.translations.en.definition
		);

	$: if (!fetchedTranslations.includes($language)) {
		fetchTranslation($language);
	}

	async function fetchTranslation(lang: string) {
		const words = (await fetch(`/api/sandbox?lang=${lang}`).then(res =>
			res.json()
		)) as Record<string, LocalizedWord>;

		for (const word of Object.values(words)) {
			data.words[word.id].translations[lang] = word.translations[lang];
		}

		fetchedTranslations.push(lang);
		fetchedTranslations = fetchedTranslations;

		$language = lang;
	}

	onMount(() => {
		fetchTranslation($language);
	});
</script>

<svelte:head>
	<title>sandbox &ndash; nimi.li</title>

	<meta name="author" content="ilo Tani" />
	<meta name="description" content="Explore Linku's sandbox." />
	<meta
		name="keywords"
		content="toki pona, toki pona dictionary, dictionary, nimi, sandbox"
	/>

	<meta property="og:title" content="sandbox – nimi.li" />
	<meta property="og:author" content="ilo Tani" />
	<meta property="og:description" content="Explore Linku's sandbox." />
	<meta property="og:url" content="https://nimi.li/sandbox" />
	<meta property="og:image" content="https://nimi.li/favicon.png" />
	<meta property="og:site_name" content="nimi.li" />
	<meta property="og:type" content="website" />
</svelte:head>

<h1 class="text-4xl">sandbox</h1>

<p class="mt-2 leading-relaxed">
	Explore Linku's <strong>sandbox</strong>, a collection of proposed words
	which are
	<em>not actively in use</em>. Some of these words are of value to the
	community as pieces of culture, essentially memes. Some reflect early drafts
	of Toki Pona. Many are one-off jokes, created and abandoned immediately.
</p>

<p class="alert my-4 p-4 leading-relaxed">
	<strong>Warning!</strong>
	If you are a learner, <em>stick to the main dictionary</em>. These words
	will not help you speak the language.
</p>

<div class="mt-4 flex flex-wrap gap-1 sm:gap-x-2 sm:gap-y-1">
	<Select
		name="View"
		options={[
			{ label: 'Normal View', value: 'normal' },
			{ label: 'Detailed View', value: 'detailed' },
			{ label: 'List View', value: 'compact' },
			{ label: 'Glyph View', value: 'glyphs' }
		]}
		bind:value={$viewMode}
	/>

	<Select
		name="Sorting Method"
		options={[
			{ label: 'Sort by Usage', value: 'recognition' },
			{ label: 'Sort Alphabetically', value: 'alphabetical' }
		]}
		bind:value={sortingMethod}
	/>

	<SelectLanguage
		languages={data.languages}
		on:select={e => {
			if (fetchedTranslations.includes(e.detail)) {
				$language = e.detail;
			} else {
				fetchTranslation(e.detail);
			}
		}}
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

{#if missingDefinitions}
	<p class="mt-2">
		<strong>o sona a!</strong>
		{data.languages[$language].name.tok ??
			data.languages[$language].name.en}
		la sona pi nimi ale li lon ala. toki Inli li lon nimi ni.
	</p>
	<p>
		<strong>Warning!</strong>
		Some words are missing {data.languages[$language].name.en} translations.
		These are replaced with English translations.
	</p>
{/if}

<p class="mt-2 text-muted">
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
