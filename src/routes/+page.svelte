<script lang="ts">
	import { distance } from 'fastest-levenshtein';

	import type { PageData } from './$types';
	import { categoryColors } from '$lib/util';

	import ColoredCheckbox from '$lib/components/ColoredCheckbox.svelte';
	import WordSpace from '$lib/components/WordSpace.svelte';
	import type { UsageCategory } from '$lib/types';

	export let data: PageData;

	const words = Object.values(data.data);

	let search = '';

	let categories = Object.keys(categoryColors).map(category => ({
		name: category as UsageCategory,
		shown: true
	}));

	$: shownCategories = categories
		.filter(category => category.shown)
		.map(category => category.name);

	$: filteredWords = words
		.filter(
			word =>
				shownCategories.includes(word.usage_category) &&
				(word.word.toLowerCase().includes(search.toLowerCase()) ||
					distance(word.word, search) <= 1)
		)
		.sort((a, b) => a.word.localeCompare(b.word))
		.sort((a, b) => {
			if (search === '') return 0;
			const aContains = a.word.toLowerCase().includes(search.toLowerCase());
			const bContains = b.word.toLowerCase().includes(search.toLowerCase());
			if (aContains && !bContains) return -1;
			if (!aContains && bContains) return 1;
			return distance(a.word, search) - distance(b.word, search);
		});
</script>

<div class="p-16">
	<div>
		<h1 class="text-4xl font-bold">sona nimi</h1>

		<div class="mt-4 flex gap-2">
			{#each categories as category}
				<ColoredCheckbox
					bind:checked={category.shown}
					label={category.name[0].toUpperCase() + category.name.slice(1)}
					color={categoryColors[category.name]}
				/>
			{/each}
		</div>

		<input
			type="text"
			placeholder="nimi..."
			bind:value={search}
			class="mt-4 p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors min-w-full"
		/>
	</div>

	<div class="mt-4 grid gap-4">
		{#each filteredWords as word (word.word)}
			<WordSpace {word} />
		{/each}
	</div>
</div>

<style>
	.grid {
		grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
	}
</style>
