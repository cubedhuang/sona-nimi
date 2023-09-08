<script lang="ts">
	import { fly } from 'svelte/transition';
	import { distance } from 'fastest-levenshtein';

	import type { PageData } from './$types';

	import { outclick } from '$lib/actions/outclick';
	import type { BookName, UsageCategory, Word } from '$lib/types';
	import {
		bookColors,
		categoryColors,
		getWordDefinition,
		getWordRecognition,
		normalize,
		sortLanguages,
		usageCategories
	} from '$lib/util';
	import {
		categories,
		language,
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

	$: fixedSearch = normalize(search);

	$: shownCategories = $categories
		.filter(category => category.shown)
		.map(category => category.name);

	let books = Object.keys(bookColors).map(book => ({
		name: book as BookName,
		shown: true
	}));
	$: shownBooks = books.filter(book => book.shown).map(book => book.name);

	let detailed = false;

	const categoryIndex = Object.fromEntries(
		usageCategories.map((category, index) => [category, index] as const)
	) as Record<UsageCategory, number>;

	const azSorter = (a: Word, b: Word) => a.word.localeCompare(b.word);
	const recognitionSorter = (a: Word, b: Word) =>
		getWordRecognition(b) - getWordRecognition(a);
	const combinedSorter = (a: Word, b: Word) => {
		if (a.usage_category === b.usage_category) return azSorter(a, b);
		return categoryIndex[a.usage_category] - categoryIndex[b.usage_category];
	};

	let filteredWords: Word[] = [];

	$: genericSorter =
		$sortingMethod === 'alphabetical'
			? azSorter
			: $sortingMethod === 'recognition'
			? recognitionSorter
			: combinedSorter;

	$: genericFilter = (word: Word) =>
		shownCategories.includes(word.usage_category) &&
		shownBooks.includes(word.book);

	$: genericFilteredWords = words.filter(genericFilter);

	const scoreMatch = (content: string | undefined) => {
		if (!content) return 0;

		const includes = content.includes(fixedSearch);
		const dist = distance(fixedSearch, content);
		const maxDist = content.length / 3;

		if (!includes && dist > maxDist) return 0;

		let score = 1;

		if (dist <= maxDist) {
			score += ((maxDist - dist) / maxDist) * 2;
		}

		if (includes) {
			score += 1;
		}

		return score;
	};

	$: searchFilter = (word: Word) => {
		if (!search) return true;

		return (
			scoreMatch(word.word) ||
			scoreMatch(getWordDefinition(word, $language)) ||
			scoreMatch(word.ku_data) ||
			scoreMatch(word.etymology) ||
			scoreMatch(word.source_language) ||
			scoreMatch(word.creator) ||
			scoreMatch(word.commentary)
		);
	};

	$: scoreSearch = (word: Word) => {
		let score = 0;

		score += scoreMatch(word.word) * 100;
		score += scoreMatch(getWordDefinition(word, $language)) * 50;
		score += scoreMatch(word.ku_data) * 40;
		score += scoreMatch(word.etymology) * 30;
		score += scoreMatch(word.source_language) * 20;
		score += scoreMatch(word.creator) * 10;
		score += scoreMatch(word.commentary) * 5;

		return score;
	};

	$: if (search) {
		filteredWords = genericFilteredWords
			.filter(searchFilter)
			.sort(genericSorter)
			.sort((a, b) => scoreSearch(b) - scoreSearch(a));
	} else {
		filteredWords = genericFilteredWords.sort(genericSorter);
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

	<div class="relative flex justify-center">
		<button
			on:click={() => {
				moreOptions = !moreOptions;
			}}
			class="p-0.5 interactable lg:block"
			class:hidden={moreOptions}
			aria-label="more options"
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
				use:outclick
				on:outclick={() => {
					// delay to make clicking on the button also close
					requestAnimationFrame(() => {
						moreOptions = false;
					});
				}}
				class="z-10 absolute top-full mt-2 p-2 w-max
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
			aria-label="close options"
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

<div class="mt-2 flex flex-wrap gap-1 sm:gap-x-2 sm:gap-y-1">
	<Select
		name="Sorting Method"
		options={[
			{ label: 'Sort A-Z by Usage', value: 'combined' },
			{ label: 'Sort by Usage', value: 'recognition' },
			{ label: 'Sort Alphabetically', value: 'alphabetical' }
		]}
		bind:value={$sortingMethod}
	/>

	<Select
		name="Language"
		options={sortLanguages(data.languages).map(([code, language]) => {
			return { label: language.name_endonym, value: code };
		})}
		bind:value={$language}
	/>

	<Select
		name="sitelen type"
		options={[
			{ label: 'sitelen pona', value: 'pona' },
			{ label: 'sitelen sitelen', value: 'sitelen' },
			{ label: 'sitelen Emosi', value: 'emosi' }
		]}
		bind:value={$sitelenMode}
	/>

	<ColoredCheckbox
		bind:checked={detailed}
		label="Detailed View"
		color="bg-blue-500"
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
	{filteredWords.length} / {genericFilteredWords.length}
</p>

<Search placeholder="o lukin..." bind:value={search} />

<Grid width={detailed ? '30rem' : '24rem'}>
	{#each filteredWords as word (word.id)}
		<WordSpace
			{word}
			{detailed}
			on:click={() => {
				if (selectedWord?.id === word.id) selectedWord = null;
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
