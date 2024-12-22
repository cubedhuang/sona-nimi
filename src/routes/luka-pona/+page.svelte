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
	import Meta from '$lib/components/Meta.svelte';

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

<Meta
	title="luka pona – nimi.li | Toki Pona Dictionary"
	description="Explore and search for signs in Luka Pona Sign Language."
	url="https://nimi.li/luka-pona"
	keywords={[
		'luka pona',
		'sign language',
		'toki pona sign language',
		'toki pona sign language dictionary'
	]}
/>

<h1 class="text-4xl">luka pona</h1>

<p class="mt-2">
	Explore signs for <b>Luka Pona Sign Language</b>. Hover over a sign to watch
	it!
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
