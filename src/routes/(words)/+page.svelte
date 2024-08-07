<script lang="ts">
	import { onMount } from 'svelte';

	import type { LocalizedWord } from '@kulupu-linku/sona';
	import type { Book } from '@kulupu-linku/sona/utils';

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
	import { flyAndScale } from '$lib/transitions';

	import ColoredCheckbox from '$lib/components/ColoredCheckbox.svelte';
	import Search from '$lib/components/Search.svelte';
	import Select from '$lib/components/Select.svelte';
	import WordDetails from '$lib/components/WordDetails.svelte';
	import WordView from '$lib/components/WordView.svelte';

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
		$language !== 'en' &&
		$language !== 'eng' &&
		fetchedTranslations.includes($language) &&
		genericFilteredWords.some(
			word =>
				!word.translations[$language]?.definition ||
				word.translations[$language].definition ===
					word.translations.en.definition
		);

	$: if (!fetchedTranslations.includes($language)) {
		setTranslation($language);
	}

	async function setTranslation(lang: string) {
		if (fetchedTranslations.includes(lang)) {
			$language = lang;
			return;
		}

		const words = (await fetch(`/data/linku?lang=${lang}`).then(res =>
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
		setTranslation($language);
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
			class="interactable p-0.5 lg:block"
			class:hidden={moreOptions}
			aria-label="more options"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="h-6 w-6"
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
				transition:flyAndScale|local={{ y: -4 }}
				use:outclick
				on:outclick={() => {
					// delay to make clicking on the button also close
					requestAnimationFrame(() => {
						moreOptions = false;
					});
				}}
				class="absolute top-full z-10 mt-2 hidden w-max flex-wrap gap-1 rounded-lg border bg-background p-2 shadow-lg
					sm:gap-x-2 sm:gap-y-1 lg:flex"
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
		class="mt-2 flex items-start justify-between gap-2 rounded-lg border border-contrast p-2
			lg:hidden"
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
			class="interactable shrink-0 p-0.5"
			aria-label="close options"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="h-6 w-6"
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
			{ label: 'List View', value: 'compact' },
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
		value={$language}
		on:change={e => {
			// @ts-expect-error The type of e is only Event, not ChangeEvent
			const lang = e.target.value;

			setTranslation(lang);
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
		<span class="font-bold">o sona a!</span>
		toki kon ale pi
		{data.languages[$language].name.tok ??
			data.languages[$language].name.en}
		li lon ala. nimi ni la, toki Inli li lon.
	</p>
	<p>
		<span class="font-bold">Warning!</span>
		Some words are missing {data.languages[$language].name.en} translations.
		These are replaced with English translations.
	</p>
{/if}

<p class="mt-2 text-muted-foreground">
	{filteredWords.length} / {genericFilteredWords.length}
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
