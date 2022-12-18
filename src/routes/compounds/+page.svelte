<script lang="ts">
	import { distance } from 'fastest-levenshtein';

	import type { PageData } from './$types';

	import type { Compound } from '$lib/types';
	import { categoryColors } from '$lib/util';

	import ColoredCheckbox from '$lib/components/ColoredCheckbox.svelte';
	import CompoundDetails from './CompoundDetails.svelte';
	import CompoundSpace from './CompoundSpace.svelte';
	import Grid from '$lib/components/Grid.svelte';
	import Search from '$lib/components/Search.svelte';
	import Select from '$lib/components/Select.svelte';

	export let data: PageData;

	function getCompoundRecognition(compound: Compound) {
		return Math.max(...Object.values(compound.uses));
	}

	const allCompounds = Object.values(data);

	let onlyShowCompounds = false;

	$: compounds = onlyShowCompounds
		? allCompounds.filter(compound => compound.compound.split(' ').length > 1)
		: allCompounds;

	let search = '';
	let selectedCompound: Compound | null = null;

	$: fixedSearch = search.trim().toLowerCase();

	let searchMethod: 'term' | 'definition' = 'term';

	let sortingMethod: 'alphabetical' | 'recognition' = 'recognition';
	$: sorter =
		sortingMethod === 'alphabetical'
			? (a: Compound, b: Compound) => a.compound.localeCompare(b.compound)
			: (a: Compound, b: Compound) =>
					getCompoundRecognition(b) - getCompoundRecognition(a);

	let filteredCompounds: Compound[] = [];

	$: if (searchMethod === 'term') {
		filteredCompounds = compounds
			.filter(
				compound =>
					compound.compound.toLowerCase().includes(fixedSearch) ||
					Object.keys(compound.compound.split(' ')).some(
						word => distance(word, fixedSearch) <= 1
					)
			)
			.sort(sorter)
			.sort((a, b) => {
				if (fixedSearch === '') return 0;
				if (a.compound.toLowerCase() === fixedSearch) return -1;
				if (b.compound.toLowerCase() === fixedSearch) return 1;
				const aContains = a.compound.toLowerCase().includes(fixedSearch);
				const bContains = b.compound.toLowerCase().includes(fixedSearch);
				if (aContains && bContains) return 0;
				if (aContains && !bContains) return -1;
				if (!aContains && bContains) return 1;
				return 0;
			});
	} else {
		filteredCompounds = compounds
			.filter(compound =>
				Object.keys(compound.uses).some(
					use => use.includes(fixedSearch) || distance(use, fixedSearch) <= 1
				)
			)
			.sort(sorter)
			.sort((a, b) => {
				if (fixedSearch === '') return 0;
				if (Object.keys(a.uses).includes(fixedSearch)) return -1;
				if (Object.keys(b.uses).includes(fixedSearch)) return 1;
				const aContains = Object.keys(a.uses).some(use =>
					use.includes(fixedSearch)
				);
				const bContains = Object.keys(b.uses).some(use =>
					use.includes(fixedSearch)
				);
				if (aContains && bContains) return 0;
				if (aContains && !bContains) return -1;
				if (!aContains && bContains) return 1;
				return 0;
			});
	}
</script>

<svelte:head>
	<title>compounds &ndash; sona nimi</title>

	<meta name="author" content="jan Tani" />
	<meta name="description" content="interactive toki pona dictionary" />
	<meta
		name="keywords"
		content="toki pona, toki pona dictionary, dictionary, nimi, compounds, compound expressions"
	/>

	<meta property="og:title" content="compounds – sona nimi" />
	<meta property="og:author" content="jan Tani" />
	<meta property="og:description" content="interactive toki pona dictionary" />
	<meta property="og:url" content="https://nimi.li/compounds" />
	<meta property="og:site_name" content="sona nimi" />
	<meta property="og:type" content="website" />
</svelte:head>

<h1 class="text-4xl font-bold">compounds &ndash; sona nimi</h1>

<p class="mt-4">
	This is a list of popular compound phrases and interpretations of words in
	toki pona. This is <span class="font-bold">not</span>
	a list of definitions, just common ways people express their ideas! Click on an
	expression to see more details.
</p>

<div class="mt-4 flex flex-wrap gap-2">
	<ColoredCheckbox
		bind:checked={onlyShowCompounds}
		label="Only show compound expressions"
		color={categoryColors.core}
	/>
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

<p class="mt-2 text-gray-500 dark:text-gray-400">
	{filteredCompounds.length} / {compounds.length}
</p>

<Search
	placeholder={searchMethod === 'term' ? 'nimi...' : 'definition...'}
	bind:value={search}
/>

<Grid width="16rem">
	{#each filteredCompounds as compound (compound.compound)}
		<CompoundSpace
			{compound}
			on:click={() => {
				if (selectedCompound?.compound === compound.compound)
					selectedCompound = null;
				else selectedCompound = compound;
			}}
		/>
	{/each}
</Grid>

<CompoundDetails bind:compound={selectedCompound} />
