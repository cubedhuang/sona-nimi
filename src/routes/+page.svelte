<script lang="ts">
	import { distance } from 'fastest-levenshtein';

	import type { PageData } from './$types';

	import type { UsageCategory, Word } from '$lib/types';
	import {
		categoryColors,
		getDefinition,
		getRecognition,
		sortLanguages
	} from '$lib/util';
	import { language, sitelenMode } from '$lib/stores';

	import ColoredCheckbox from '$lib/components/ColoredCheckbox.svelte';
	import DarkModeToggle from '$lib/components/DarkModeToggle.svelte';
	import Select from '$lib/components/Select.svelte';
	import WordSpace from '$lib/components/WordSpace.svelte';
	import WordDetails from '$lib/components/WordDetails.svelte';
	import X from '$lib/components/X.svelte';

	export let data: PageData;

	const words = Object.values(data.data);

	let searchBar: HTMLInputElement;
	let search = '';
	let selectedWord: Word | null = null;

	$: fixedSearch = search.trim().toLowerCase();

	let categories = Object.keys(categoryColors).map(category => ({
		name: category as UsageCategory,
		shown: true
	}));

	$: shownCategories = categories
		.filter(category => category.shown)
		.map(category => category.name);

	let searchMethod: 'term' | 'definition' = 'term';

	let sortingMethod: 'alphabetical' | 'recognition' = 'recognition';
	$: sorter =
		sortingMethod === 'alphabetical'
			? (a: Word, b: Word) => a.word.localeCompare(b.word)
			: (a: Word, b: Word) => getRecognition(b) - getRecognition(a);

	let filteredWords: Word[] = [];

	$: if (searchMethod === 'term') {
		filteredWords = words
			.filter(
				word =>
					shownCategories.includes(word.usage_category) &&
					(word.word.toLowerCase().includes(fixedSearch) ||
						distance(word.word, search) <= 1)
			)
			.sort(sorter)
			.sort((a, b) => {
				if (fixedSearch === '') return 0;
				const aContains = a.word.toLowerCase().includes(fixedSearch);
				const bContains = b.word.toLowerCase().includes(fixedSearch);
				if (aContains && bContains) return 0;
				if (aContains && !bContains) return -1;
				if (!aContains && bContains) return 1;
				return distance(a.word, search) - distance(b.word, search);
			});
	} else {
		filteredWords = words
			.filter(
				word =>
					shownCategories.includes(word.usage_category) &&
					(getDefinition(word, $language).toLowerCase().includes(fixedSearch) ||
						word.ku_data?.toLowerCase().includes(fixedSearch))
			)
			.sort(sorter);
	}

	$: missingDefinitions = Object.values(
		data.languages[$language].completeness_percent
	).some(percent => percent !== '100');
</script>

<svelte:window
	on:keypress={e => {
		if (document.activeElement !== searchBar) {
			searchBar.focus();
		}
	}}
/>

<div>
	<div class="flex justify-between items-start">
		<h1 class="text-4xl font-bold">sona nimi</h1>

		<DarkModeToggle />
	</div>

	<p class="mt-4">
		<span class="font-bold">sona nimi</span> is an interactive toki pona
		dictionary. It uses
		<a
			href="https://lipu-linku.github.io/about/jasima/"
			target="_blank"
			rel="noopener noreferrer"
			class="text-blue-500">jasima Linku</a
		>
		for data. You can view the source code
		<a
			href="https://github.com/cubedhuang/sona-nimi"
			target="_blank"
			rel="noopener noreferrer"
			class="text-blue-500">here</a
		>.
	</p>

	<div class="mt-4 flex flex-wrap gap-2">
		{#each categories as category}
			<ColoredCheckbox
				bind:checked={category.shown}
				label={category.name[0].toUpperCase() + category.name.slice(1)}
				color={categoryColors[category.name]}
			/>
		{/each}
	</div>

	<div class="mt-2 flex flex-wrap gap-2">
		<Select
			options={[
				{ label: 'Search with Toki Pona', value: 'term' },
				{ label: 'Search with Definition', value: 'definition' }
			]}
			bind:value={searchMethod}
		/>

		<Select
			options={[
				{ label: 'Sort by Usage', value: 'recognition' },
				{ label: 'Sort Alphabetically', value: 'alphabetical' }
			]}
			bind:value={sortingMethod}
		/>

		<Select
			options={sortLanguages(data.languages).map(([code, language]) => {
				return { label: language.name_toki_pona, value: code };
			})}
			bind:value={$language}
		/>

		<Select
			options={[
				{ label: 'sitelen pona', value: 'pona' },
				{ label: 'sitelen sitelen', value: 'sitelen' },
				{ label: 'sitelen emosi', value: 'emosi' }
			]}
			bind:value={$sitelenMode}
		/>
	</div>

	{#if missingDefinitions}
		<p class="mt-4">
			<span class="font-bold">o lukin a!</span>
			nimi li jo ala e nasin pi {data.languages[$language].name_toki_pona}. nimi
			ni li kepeken e toki Inli.
		</p>
		<p>
			<span class="font-bold">Warning!</span>
			Some words are missing {data.languages[$language].name_english} translations.
			These are replaced with English translations.
		</p>
	{/if}

	<div class="mt-4 flex gap-1 items-center">
		<input
			type="text"
			placeholder={searchMethod === 'term' ? 'nimi...' : 'definition...'}
			bind:value={search}
			bind:this={searchBar}
			class="p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors max-w-full w-96
					dark:bg-black dark:border-gray-800 dark:focus:border-gray-700"
		/>

		{#if search}
			<button
				class="p-2 rounded-lg hover:bg-gray-200 focus:outline-none focus:bg-gray-200 border border-transparent transition-colors
						dark:hocus:bg-gray-900"
				on:click={() => {
					search = '';
					searchBar.focus();
				}}
			>
				<X />
			</button>
		{/if}
	</div>
</div>

<div class="mt-4 flex flex-col sm:grid grid-cols gap-4">
	{#each filteredWords as word (word.word)}
		<WordSpace
			{word}
			on:click={() => {
				if (selectedWord?.word === word.word) selectedWord = null;
				else selectedWord = word;
			}}
		/>
	{/each}
</div>

<WordDetails
	bind:word={selectedWord}
	on:refer={e => {
		if (!filteredWords.some(word => word.word === e.detail)) {
			search = '';
		}
	}}
/>

<style>
	.grid-cols {
		grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
	}
</style>
