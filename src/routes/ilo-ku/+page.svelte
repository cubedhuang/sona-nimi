<script lang="ts">
	import { distance } from 'fastest-levenshtein';

	import type { PageData } from './$types';

	import type { Compound } from '$lib/types';
	import { normalize } from '$lib/util';

	import CompoundDetails from './CompoundDetails.svelte';
	import CompoundSpace from './CompoundSpace.svelte';
	import Link from '$lib/components/Link.svelte';
	import Search from '$lib/components/Search.svelte';

	export let data: PageData;

	function getCompoundRecognition(compound: Compound) {
		return Math.max(...Object.values(compound.uses));
	}

	$: compounds = Object.values(data).sort(
		(a: Compound, b: Compound) =>
			getCompoundRecognition(b) - getCompoundRecognition(a)
	);

	let search = '';
	let selectedCompound: Compound | null = null;

	$: fixedSearch = normalize(search);

	$: filteredCompounds = compounds
		.filter(
			compound =>
				compound.compound.includes(fixedSearch) ||
				distance(compound.compound, fixedSearch) <= 2 ||
				Object.keys(compound.uses).some(
					use =>
						use.includes(fixedSearch) ||
						distance(use, fixedSearch) <= 2
				)
		)
		.sort((a, b) => {
			if (fixedSearch === '') return 0;
			if (a.compound === fixedSearch) return -1;
			if (b.compound === fixedSearch) return 1;
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
</script>

<svelte:head>
	<title>ilo ku &ndash; nimi.li</title>

	<meta name="author" content="ilo Tani" />
	<meta
		name="description"
		content="ilo ku lets you explore the public subset of Toki Pona Dictionary."
	/>
	<meta
		name="keywords"
		content="toki pona, toki pona dictionary, dictionary, nimi, compounds, ku, ilo ku, compound expressions"
	/>

	<meta property="og:title" content="ilo ku – nimi.li" />
	<meta property="og:author" content="ilo Tani" />
	<meta
		property="og:description"
		content="ilo ku lets you explore the public subset of Toki Pona Dictionary."
	/>
	<meta property="og:url" content="https://nimi.li/ilo-ku" />
	<meta property="og:image" content="https://nimi.li/favicon.png" />
	<meta property="og:site_name" content="nimi.li" />
	<meta property="og:type" content="website" />
</svelte:head>

<h1 class="text-4xl">ilo ku</h1>

<p class="mt-2">
	<strong>ilo ku</strong> lets you explore the
	<Link href="https://tokipona.org/compounds.txt">public subset</Link> of
	<span class="italic">
		<Link
			href="https://www.amazon.com/Toki-Pona-Dictionary-Official/dp/0978292367"
		>
			Toki Pona Dictionary</Link
		></span
	>. Click on an expression to see more!
</p>

<blockquote class="alert my-4 p-4 leading-relaxed">
	<p>
		<strong>Warning!</strong>
		There are no hard-set compound phrases in Toki Pona. This is by design! Part
		of the goal of the language is for you to break down your surroundings from
		your own viewpoint and describe things dynamically, not use the same phrase
		to mean the same thing all the time. Think about what the topic means to
		you, and consider what is important about it.
	</p>

	<footer class="mt-2">
		&mdash; jan Lipiki, in <cite>Toki Pona Dictionary</cite>
	</footer>
</blockquote>

<p class="mt-2 text-muted">
	{filteredCompounds.length} / {compounds.length}
</p>

<Search placeholder="o alasa..." bind:value={search} />

<div class="mt-4 grid gap-4 grid-cols-fill-64">
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
</div>

<CompoundDetails bind:compound={selectedCompound} />
