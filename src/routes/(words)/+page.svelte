<script lang="ts">
	import { fly } from 'svelte/transition';
	import { distance } from 'fastest-levenshtein';

	import type { PageData } from './$types';

	import type { BookName, UsageCategory, Word } from '$lib/types';
	import {
		bookColors,
		categoryColors,
		getWordDefinition,
		getWordRecognition,
		sortLanguages
	} from '$lib/util';
	import {
		categories,
		language,
		searchMethod,
		sitelenMode,
		sortingMethod
	} from '$lib/stores';

	import ColoredCheckbox from '$lib/components/ColoredCheckbox.svelte';
	import Grid from '$lib/components/Grid.svelte';
	import Search from '$lib/components/Search.svelte';
	import Select from '$lib/components/Select.svelte';
	import WordDetails from './WordDetails.svelte';
	import WordSpace from './WordSpace.svelte';

	export let data: PageData;

	const words = Object.values(data.data);

	let moreOptions = false;

	let search = '';
	let selectedWord: Word | null = null;

	$: fixedSearch = search.trim().toLowerCase();

	$: shownCategories = $categories
		.filter(category => category.shown)
		.map(category => category.name);

	let books = Object.keys(bookColors).map(book => ({
		name: book as BookName,
		shown: true
	}));
	$: shownBooks = books.filter(book => book.shown).map(book => book.name);

	let detailed = false;

	const categoryIndex: Record<UsageCategory, number> = {
		core: 0,
		widespread: 1,
		common: 2,
		uncommon: 3,
		rare: 4,
		obscure: 5
	};

	const azSorter = (a: Word, b: Word) => a.word.localeCompare(b.word);
	const recognitionSorter = (a: Word, b: Word) =>
		getWordRecognition(b) - getWordRecognition(a);
	const combinedSorter = (a: Word, b: Word) => {
		if (a.usage_category === b.usage_category) return azSorter(a, b);
		return categoryIndex[a.usage_category] - categoryIndex[b.usage_category];
	};

	$: genericSorter =
		$sortingMethod === 'alphabetical'
			? azSorter
			: $sortingMethod === 'recognition'
			? recognitionSorter
			: combinedSorter;

	let filteredWords: Word[] = [];

	$: genericFilter = (word: Word) =>
		shownCategories.includes(word.usage_category) &&
		shownBooks.includes(word.book);

	$: if ($searchMethod === 'term') {
		filteredWords = words
			.filter(genericFilter)
			.filter(
				word =>
					word.word.toLowerCase().includes(fixedSearch) ||
					distance(word.word, search) <= 1
			)
			.sort(genericSorter)
			.sort((a, b) => {
				if (fixedSearch === '') return 0;
				if (a.word.toLowerCase() === fixedSearch) return -1;
				if (b.word.toLowerCase() === fixedSearch) return 1;
				const aContains = a.word.toLowerCase().includes(fixedSearch);
				const bContains = b.word.toLowerCase().includes(fixedSearch);
				if (aContains && bContains) return 0;
				if (aContains && !bContains) return -1;
				if (!aContains && bContains) return 1;
				return distance(a.word, search) - distance(b.word, search);
			});
	} else if ($searchMethod === 'definition') {
		filteredWords = words
			.filter(genericFilter)
			.filter(
				word =>
					getWordDefinition(word, $language)
						.toLowerCase()
						.includes(fixedSearch) ||
					word.ku_data?.toLowerCase().includes(fixedSearch)
			)
			.sort(genericSorter);
	} else if ($searchMethod === 'creator') {
		filteredWords = words
			.filter(genericFilter)
			.filter(word => word.creator)
			.filter(
				word =>
					word.creator?.toLowerCase().includes(fixedSearch) ||
					distance(word.creator!.toLowerCase(), search) <= 1
			)
			.sort(genericSorter);
	} else if ($searchMethod === 'origin') {
		filteredWords = words
			.filter(genericFilter)
			.filter(word => word.source_language)
			.filter(
				word =>
					word.source_language?.toLowerCase().includes(fixedSearch) ||
					distance(word.source_language!.toLowerCase(), search) <= 1 ||
					word.etymology?.toLowerCase().includes(fixedSearch)
			)
			.sort(genericSorter);
	} else {
		filteredWords = words.filter(genericFilter);
	}

	$: missingDefinitions = Object.values(
		data.languages[$language].completeness_percent
	).some(percent => percent !== '100');
</script>

<svelte:head>
	<title>nimi.li</title>

	<meta name="author" content="jan Tani" />
	<meta name="description" content="interactive toki pona dictionary" />
	<meta
		name="keywords"
		content="toki pona, toki pona dictionary, dictionary, nimi"
	/>

	<meta property="og:title" content="nimi.li" />
	<meta property="og:author" content="jan Tani" />
	<meta property="og:description" content="interactive toki pona dictionary" />
	<meta property="og:url" content="https://nimi.li/" />
	<meta property="og:site_name" content="nimi.li" />
	<meta property="og:type" content="website" />
</svelte:head>

<h1 class="text-4xl">nimi.li</h1>

<p class="mt-2">
	<span class="font-bold">nimi.li</span> is an interactive toki pona dictionary.
	Click on a word to read more!
</p>

<div class="mt-4 flex flex-wrap gap-1 sm:gap-x-2 sm:gap-y-1">
	{#each $categories as category}
		<ColoredCheckbox
			bind:checked={category.shown}
			label={category.name[0].toUpperCase() + category.name.slice(1)}
			color={categoryColors[category.name]}
		/>
	{/each}

	<ColoredCheckbox
		bind:checked={detailed}
		label="sona mute"
		color="bg-pink-400"
	/>

	<div class="relative flex justify-center">
		<button
			on:click={() => {
				moreOptions = !moreOptions;
			}}
			class="p-0.5 interactable lg:block"
			class:hidden={moreOptions}
			title="more"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
				/>
			</svg>
		</button>

		{#if moreOptions}
			<div
				transition:fly|local={{ y: 4, duration: 300 }}
				on:click|stopPropagation
				on:touchstart|passive|stopPropagation
				on:keydown|stopPropagation
				class="absolute top-full mt-2 p-2 w-max 
					hidden lg:flex flex-wrap gap-1 sm:gap-x-2 sm:gap-y-1
					bg-white border-gray-200 border rounded-lg shadow-lg
					dark:border-gray-800 dark:bg-black"
			>
				{#each books as book}
					<ColoredCheckbox
						bind:checked={book.shown}
						label={book.name === 'none' ? 'no book' : `nimi ${book.name}`}
						color={bookColors[book.name]}
					/>
				{/each}
			</div>
		{/if}
	</div>
</div>

{#if moreOptions}
	<div
		on:click|stopPropagation
		on:touchstart|passive|stopPropagation
		on:keydown|stopPropagation
		class="mt-2 p-2 flex lg:hidden items-start justify-between gap-2 border border-gray-400 rounded-lg
			dark:border-gray-800"
	>
		<div class="flex flex-wrap gap-1 sm:gap-x-2 sm:gap-y-1">
			{#each books as book}
				<ColoredCheckbox
					bind:checked={book.shown}
					label={book.name === 'none' ? 'no book' : `nimi ${book.name}`}
					color={bookColors[book.name]}
				/>
			{/each}
		</div>

		<button
			on:click={() => {
				moreOptions = false;
			}}
			class="shrink-0 p-0.5 interactable"
			title="close"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</button>
	</div>
{/if}

<div class="mt-2 flex flex-wrap gap-2">
	<Select
		options={[
			{ label: 'Search by Toki Pona', value: 'term' },
			{ label: 'Search by Definition', value: 'definition' },
			{ label: 'Search by Creator', value: 'creator' },
			{ label: 'Search by Origin', value: 'origin' }
		]}
		bind:value={$searchMethod}
	/>

	<Select
		options={[
			{ label: 'Sort A-Z by Usage', value: 'combined' },
			{ label: 'Sort by Usage', value: 'recognition' },
			{ label: 'Sort Alphabetically', value: 'alphabetical' }
		]}
		bind:value={$sortingMethod}
	/>

	<Select
		options={sortLanguages(data.languages).map(([code, language]) => {
			return { label: language.name_endonym, value: code };
		})}
		bind:value={$language}
	/>

	<Select
		options={[
			{ label: 'sitelen pona', value: 'pona' },
			{ label: 'sitelen sitelen', value: 'sitelen' },
			{ label: 'sitelen Emosi', value: 'emosi' }
		]}
		bind:value={$sitelenMode}
	/>
</div>

{#if missingDefinitions}
	<p class="mt-4">
		<span class="font-bold">o lukin a!</span>
		kon pi
		{data.languages[$language].name_toki_pona}
		li lon nimi ale ala. kon ni li kepeken toki Inli.
	</p>
	<p>
		<span class="font-bold">Warning!</span>
		Some words are missing {data.languages[$language].name_english} translations.
		These are replaced with English translations.
	</p>
{/if}

<p class="mt-2 faded">
	{filteredWords.length} / {words.length}
</p>

<Search
	placeholder={$searchMethod === 'term'
		? 'nimi...'
		: $searchMethod === 'definition'
		? 'definition...'
		: $searchMethod === 'creator'
		? 'creator...'
		: 'language or etymology...'}
	bind:value={search}
/>

<Grid width={detailed ? '30rem' : '24rem'}>
	{#each filteredWords as word (word.word)}
		<WordSpace
			{word}
			{detailed}
			on:click={() => {
				if (selectedWord?.word === word.word) selectedWord = null;
				else selectedWord = word;
			}}
		/>
	{/each}
</Grid>

<WordDetails
	bind:word={selectedWord}
	on:refer={e => {
		if (!filteredWords.some(word => word.word === e.detail)) {
			search = '';

			$categories = $categories.map(category => ({
				...category,
				shown:
					category.shown || category.name === data.data[e.detail].usage_category
			}));
			books = books.map(book => ({
				...book,
				shown: book.shown || book.name === data.data[e.detail].book
			}));
		}
	}}
/>
