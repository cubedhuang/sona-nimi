<script lang="ts">
	import { distance } from 'fastest-levenshtein';

	import type { PageData } from './$types';

	import { categoryColors } from '$lib/util';
	import type { UsageCategory, Word } from '$lib/types';

	import ColoredCheckbox from '$lib/components/ColoredCheckbox.svelte';
	import WordSpace from '$lib/components/WordSpace.svelte';
	import WordDetails from '$lib/components/WordDetails.svelte';

	export let data: PageData;

	const words = Object.values(data.data);

	let search = '';
	let definitionSearch = false;
	let selectedWord: Word | null = null;

	$: fixedSearch = search.trim().toLowerCase();

	let categories = Object.keys(categoryColors).map(category => ({
		name: category as UsageCategory,
		shown: true
	}));

	$: shownCategories = categories
		.filter(category => category.shown)
		.map(category => category.name);

	let filteredWords: Word[] = [];

	$: if (!definitionSearch) {
		filteredWords = words
			.filter(
				word =>
					shownCategories.includes(word.usage_category) &&
					(word.word.toLowerCase().includes(fixedSearch) ||
						distance(word.word, search) <= 1)
			)
			.sort((a, b) => a.word.localeCompare(b.word))
			.sort((a, b) => {
				if (search === '') return 0;
				const aContains = a.word.toLowerCase().includes(fixedSearch);
				const bContains = b.word.toLowerCase().includes(fixedSearch);
				if (aContains && !bContains) return -1;
				if (!aContains && bContains) return 1;
				return distance(a.word, search) - distance(b.word, search);
			});
	} else {
		filteredWords = words.filter(
			word =>
				shownCategories.includes(word.usage_category) &&
				(word.def.en.toLowerCase().includes(fixedSearch) ||
					word.ku_data?.toLowerCase().includes(fixedSearch))
		);
	}
</script>

<div class="p-16">
	<div>
		<h1 class="text-4xl font-bold">sona nimi</h1>

		<div class="mt-4 flex flex-wrap gap-2">
			{#each categories as category}
				<ColoredCheckbox
					bind:checked={category.shown}
					label={category.name[0].toUpperCase() + category.name.slice(1)}
					color={categoryColors[category.name]}
				/>
			{/each}
		</div>

		<div class="mt-2 flex">
			<ColoredCheckbox
				bind:checked={definitionSearch}
				label="Search by Definition"
				color="bg-emerald-400"
			/>
		</div>

		<input
			type="text"
			placeholder="nimi..."
			bind:value={search}
			class="mt-4 p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors max-w-full w-96"
		/>
	</div>

	<div class="mt-4 grid grid-cols gap-4">
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

<WordDetails bind:word={selectedWord} />

<style>
	.grid-cols {
		grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
	}
</style>
