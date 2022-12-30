<script lang="ts">
	import type { PageData } from './$types';

	import { getWordDefinition, getWordDisplayRecognition } from '$lib/util';
	import { language } from '$lib/stores';
	import Link from '$lib/components/Link.svelte';

	export let data: PageData;

	$: word = data;
</script>

<svelte:head>
	<title>{word.word} &ndash; nimi.li</title>

	<meta name="author" content="jan Tani" />
	<meta name="description" content={word.def.en} />
	<meta
		name="keywords"
		content="toki pona, toki pona dictionary, dictionary, nimi, {word.word}"
	/>

	<meta property="og:title" content={word.word} />
	<meta property="og:author" content="jan Tani" />
	<meta property="og:description" content={word.def.en} />
	<meta property="og:url" content="https://nimi.li/{word.word}" />
	<meta property="og:site_name" content="nimi.li" />
	<meta property="og:type" content="website" />
</svelte:head>

{#if word}
	<a href="/" class="inline-block px-2 py-1 interactable">back</a>

	<h1 class="mt-4 text-4xl">{word.word}</h1>

	<p class="mt-2">
		<span class="faded">Usage category:</span>
		{word.usage_category}
	</p>

	<p class="mt-2">
		<span class="faded">Recognition:</span>
		{getWordDisplayRecognition(word)}
	</p>

	<p class="mt-2">
		<span class="faded">Book:</span>
		{word.book}
	</p>

	{#if word.coined_era}
		<p class="mt-2">
			<span class="faded">Coined era:</span>
			{word.coined_era}
		</p>
	{/if}

	{#if word.coined_year}
		<p class="mt-2">
			<span class="faded">Coined year:</span>
			{word.coined_year}
		</p>
	{/if}

	<p class="mt-2">
		{getWordDefinition(word, $language)}
	</p>

	{#if word.commentary}
		<h2 class="mt-4 text-2xl">commentary</h2>
		<p class="mt-2">
			{word.commentary}
		</p>
	{/if}

	{#if word.ku_data}
		<h2 class="mt-4 text-2xl">lipu ku translations</h2>
		<p class="mt-2">
			{word.ku_data}
		</p>
	{/if}

	{#if word.see_also}
		<h2 class="mt-4 text-2xl">related words</h2>

		{@const words = word.see_also.split(', ')}

		<p class="mt-2">
			{#each words as other, i (other)}
				<!-- Formatting here is weird to prevent additional spaces between commas -->
				<Link href="/{other}">{other}</Link
				>{#if i < words.length - 1}{', '}{/if}
			{/each}
		</p>
	{/if}

	{#if word.creator || word.etymology}
		<h2 class="mt-4 text-2xl">origin</h2>

		{#if word.etymology}
			<p class="mt-2">
				<span class="faded">Source Language:</span>
				{word.source_language}
			</p>

			<p class="mt-2">
				<span class="faded">Etymology:</span>
				{word.etymology}
			</p>
		{/if}

		{#if word.creator}
			<p class="mt-2">
				<span class="faded">Creator(s):</span>
				{word.creator}
			</p>
		{/if}
	{/if}

	{#if word.sitelen_pona}
		<h2 class="mt-4 text-2xl">sitelen pona</h2>

		<span class="mt-2 font-medium font-pona text-7xl">
			{word.sitelen_pona}
		</span>

		{#if word.sitelen_pona_etymology}
			<p class="mt-2">
				<span class="faded">Etymology:</span>
				{word.sitelen_pona_etymology}
			</p>
		{/if}
	{/if}

	{#if word.sitelen_sitelen}
		<h2 class="mt-4 text-2xl">sitelen sitelen</h2>

		<img
			src={word.sitelen_sitelen}
			alt="{word.word} sitelen sitelen"
			class="mt-2 w-16 h-16 dark:invert"
		/>
	{/if}

	{#if word.sitelen_emosi}
		<h2 class="mt-4 text-2xl">sitelen emosi</h2>

		<p class="mt-2 text-6xl">
			{word.sitelen_emosi}
		</p>
	{/if}

	{#if word.audio}
		{@const audios = Object.entries(word.audio)}

		<h2 class="mt-4 text-2xl">audio</h2>

		{#each audios as [person, url] (url)}
			<p>
				<Link href={url}>
					Recording by {person
						.split('_')
						.map((name, i) =>
							i === 0 ? name : name[0].toUpperCase() + name.slice(1)
						)
						.join(' ')}
				</Link>
			</p>
		{/each}
	{/if}

	{#if word.luka_pona}
		<h2 class="mt-4 text-2xl">luka pona</h2>

		<p>
			<Link href={word.luka_pona.gif}>luka pona gif</Link>
		</p>
		<p>
			<Link href={word.luka_pona.mp4}>luka pona mp4</Link>
		</p>
	{/if}
{/if}
