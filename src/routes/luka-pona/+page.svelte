<script lang="ts">
	import type { LocalizedWord } from '@kulupu-linku/sona';

	import type { PageData } from './$types';

	import { azWordSort, categoryColors } from '$lib/util';
	import { filter } from '$lib/search';
	import { autoplay, language } from '$lib/stores';

	import ColoredCheckbox from '$lib/components/ColoredCheckbox.svelte';
	import LukaPonaEntry from './LukaPonaEntry.svelte';
	import Search from '$lib/components/Search.svelte';
	import SignDetails from './SignDetails.svelte';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();

	const words = $derived(data.words);

	let search = $state('');
	let selectedWord = $state<LocalizedWord | null>(null);

	const genericFilteredWords = $derived(
		words.filter(word => data.signs[word.id]).sort(azWordSort)
	);

	const filteredWords = $derived(
		filter(genericFilteredWords, search, $language)
	);
</script>

<svelte:head>
	<title>luka pona &ndash; nimi.li</title>

	<meta name="author" content="ilo Tani" />
	<meta
		name="description"
		content="Explore and search for Luka Pona signs."
	/>
	<meta
		name="keywords"
		content="toki pona, toki pona dictionary, dictionary, nimi, luka pona, sign language, toki pona sign language, toki pona sign language dictionary"
	/>

	<meta property="og:title" content="luka pona – nimi.li" />
	<meta property="og:author" content="ilo Tani" />
	<meta
		property="og:description"
		content="Explore and search for Luka Pona signs."
	/>
	<meta property="og:url" content="https://nimi.li/luka-pona" />
	<meta property="og:image" content="https://nimi.li/favicon.png" />
	<meta property="og:site_name" content="nimi.li" />
	<meta property="og:type" content="website" />
</svelte:head>

<h1 class="text-4xl">luka pona</h1>

<p class="mt-2">
	Explore <b>Luka Pona</b> signs. Hover over a sign to watch it!
</p>

<div class="mt-4 flex flex-wrap gap-1 sm:gap-x-2 sm:gap-y-1">
	<ColoredCheckbox
		bind:checked={$autoplay}
		label="Play Videos Automatically"
		color={categoryColors['core']}
	/>
</div>

<p class="mt-2 text-muted">
	{filteredWords.length} / {genericFilteredWords.length}
</p>

<Search placeholder="o alasa..." bind:value={search} />

<div class="mt-4 grid gap-3 grid-cols-fill-64">
	{#each filteredWords as word (word.id)}
		<LukaPonaEntry
			word={word.id}
			video={data.signs[word.id][0].video}
			onclick={() => {
				if (selectedWord?.id === word.id) selectedWord = null;
				else selectedWord = word;
			}}
		/>
	{/each}
</div>

{#if !filteredWords.length}
	<p>wile sina la, nimi li lon ala!</p>
	<p class="text-muted">Your query didn't match any words!</p>
{/if}

<SignDetails
	bind:word={selectedWord}
	signs={data.signs[selectedWord?.id ?? ''] || []}
/>
