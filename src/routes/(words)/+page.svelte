<script lang="ts">
	import { fly } from 'svelte/transition';

	import { client } from '@kulupu-linku/sona/client';
	import type { Book, LocalizedWord } from '@kulupu-linku/sona';

	import type { PageData } from './$types';

	import { outclick } from '$lib/actions/outclick';
	import {
		azWordSort,
		bookColors,
		categoryColors,
		combinedWordSort,
		recognitionWordSort,
		sortLanguages
	} from '$lib/util';
	import { filter } from '$lib/search';
	import {
		categories,
		language,
		sitelenMode,
		sortingMethod,
		viewMode
	} from '$lib/stores';

	import ColoredCheckbox from '$lib/components/ColoredCheckbox.svelte';
	import DetailedWordEntry from './DetailedWordEntry.svelte';
	import GlyphEntry from './GlyphEntry.svelte';
	import Search from '$lib/components/Search.svelte';
	import Select from '$lib/components/Select.svelte';
	import WordDetails from '$lib/components/WordDetails.svelte';
	import WordEntry from './WordEntry.svelte';
	import WordSpace from './WordSpace.svelte';
	import { onMount } from 'svelte';

	export let data: PageData;

	$: words = Object.values(data.words);

	let moreOptions = false;

	let search = '';
	let selectedWord: LocalizedWord | null = null;

	$: shownCategories = $categories
		.filter(category => category.shown)
		.map(category => category.name);

	let books = Object.keys(bookColors).map(book => ({
		name: book as Book,
		shown: true
	}));
	$: shownBooks = books.filter(book => book.shown).map(book => book.name);

	$: genericSorter =
		$sortingMethod === 'alphabetical'
			? azWordSort
			: $sortingMethod === 'recognition'
				? recognitionWordSort
				: combinedWordSort;

	$: genericFilter = (word: LocalizedWord) =>
		shownCategories.includes(word.usage_category) &&
		shownBooks.includes(word.book);

	$: genericFilteredWords = words.filter(genericFilter).sort(genericSorter);
	$: filteredWords = filter(genericFilteredWords, search, $language);

	let fetchedTranslations = ['en'];

	$: missingDefinitions =
		fetchedTranslations.includes($language) &&
		genericFilteredWords.some(
			word => !word.translations[$language]?.definition
		);

	$: if (!fetchedTranslations.includes($language)) {
		fetchTranslation();
	}

	async function fetchTranslation() {
		const words = await client.v1.words
			.$get({ query: { lang: $language } })
			.then(res => res.json());

		for (const word of Object.values(words)) {
			data.words[word.id].translations[$language] =
				word.translations[$language];
		}

		fetchedTranslations.push($language);
		fetchedTranslations = fetchedTranslations;
	}

	onMount(() => {
		fetchTranslation();
	});
</script>

<svelte:head>
	<title>nimi.li</title>

	<meta name="author" content="ilo Tani" />
	<meta name="description" content="Interactive Toki Pona dictionary." />
	<meta
		name="keywords"
		content="toki pona, toki pona dictionary, dictionary, nimi"
	/>

	<meta property="og:title" content="nimi.li" />
	<meta property="og:author" content="ilo Tani" />
	<meta
		property="og:description"
		content="Interactive Toki Pona dictionary."
	/>
	<meta property="og:url" content="https://nimi.li/" />
	<meta property="og:image" content="https://nimi.li/favicon.png" />
	<meta property="og:site_name" content="nimi.li" />
	<meta property="og:type" content="website" />
</svelte:head>

<h1 class="text-4xl">nimi.li</h1>

<p class="mt-2">
	<span class="font-bold">nimi.li</span> is an interactive Toki Pona dictionary.
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
						label={book.name === 'none'
							? 'no book'
							: `nimi ${book.name}`}
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
					label={book.name === 'none'
						? 'no book'
						: `nimi ${book.name}`}
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
		options={sortLanguages(data.languages).map(language => {
			return {
				label: language.name.endonym ?? language.name.en,
				value: language.id
			};
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
</div>

{#if missingDefinitions}
	<p class="mt-2">
		<span class="font-bold">o sona a!</span>
		kon pi
		{data.languages[$language].name.tok ??
			data.languages[$language].name.en}
		li lon ala ale. nimi ni la, toki Inli li lon.
	</p>
	<p>
		<span class="font-bold">Warning!</span>
		Some words are missing {data.languages[$language].name.en} translations.
		These are replaced with English translations.
	</p>
{/if}

<p class="mt-2 faded">
	{filteredWords.length} / {genericFilteredWords.length}
</p>

<Search placeholder="o alasa..." bind:value={search} />

{#if $viewMode === 'compact'}
	<div class="mt-4 grid">
		{#each filteredWords as word (word.id)}
			<WordEntry
				{word}
				on:click={() => {
					if (selectedWord?.id === word.id) selectedWord = null;
					else selectedWord = word;
				}}
			/>
		{/each}
	</div>
{:else if $viewMode === 'glyphs'}
	<div class="mt-4 grid gap-4 grid-cols-fill-24">
		{#each filteredWords as word (word.id)}
			<GlyphEntry
				{word}
				on:click={() => {
					if (selectedWord?.id === word.id) selectedWord = null;
					else selectedWord = word;
				}}
			/>
		{/each}
	</div>
{:else if $viewMode === 'detailed'}
	<div class="mt-4 grid gap-4 grid-cols-fill-96">
		{#each filteredWords as word (word.id)}
			<DetailedWordEntry
				{word}
				on:click={() => {
					if (selectedWord?.id === word.id) selectedWord = null;
					else selectedWord = word;
				}}
			/>
		{/each}
	</div>
{:else}
	<div class="mt-4 grid gap-4 grid-cols-fill-80">
		{#each filteredWords as word (word.id)}
			<WordSpace
				{word}
				on:click={() => {
					if (selectedWord?.id === word.id) selectedWord = null;
					else selectedWord = word;
				}}
			/>
		{/each}
	</div>
{/if}

{#if !filteredWords.length}
	<p>wile sina la, nimi li lon ala!</p>
	<p class="faded">Your query didn't match any words!</p>
{/if}

<WordDetails
	bind:word={selectedWord}
	lipamanka={data.lipamanka[selectedWord?.id ?? '']}
	on:refer={e => {
		if (!filteredWords.some(word => word.word === e.detail)) {
			search = '';

			$categories = $categories.map(category => ({
				...category,
				shown:
					category.shown ||
					category.name === data.words[e.detail].usage_category
			}));
			books = books.map(book => ({
				...book,
				shown: book.shown || book.name === data.words[e.detail].book
			}));
		}
	}}
/>
