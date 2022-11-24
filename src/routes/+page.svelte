<script lang="ts">
	import { distance } from 'fastest-levenshtein';

	import type { PageData } from './$types';

	import { categoryColors } from '$lib/util';
	import type { UsageCategory, Word } from '$lib/types';

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
			: (a: Word, b: Word) =>
					Number(b.recognition['2022-08']) - Number(a.recognition['2022-08']);

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
					(word.def.en.toLowerCase().includes(fixedSearch) ||
						word.ku_data?.toLowerCase().includes(fixedSearch))
			)
			.sort(sorter);
	}
</script>

<svelte:window
	on:keypress={e => {
		if (document.activeElement !== searchBar) {
			searchBar.focus();
		}
	}}
/>

<div class="px-8 py-16 lg:px-16 max-w-screen-2xl m-auto">
	<div>
		<div class="flex justify-between">
			<h1 class="text-4xl font-bold">sona nimi</h1>

			<DarkModeToggle />
		</div>

		<p class="mt-4">
			<span class="font-bold">sona nimi</span> is an interactive toki pona
			dictionary. It uses
			<a href="https://lipu-linku.github.io/about/jasima/" class="text-blue-500"
				>jasima Linku</a
			>
			for data. You can view the source code
			<a href="https://github.com/cubedhuang/sona-nimi" class="text-blue-500"
				>here</a
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
		</div>

		<div class="mt-4 flex gap-1 items-center">
			<input
				type="text"
				placeholder="nimi..."
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
