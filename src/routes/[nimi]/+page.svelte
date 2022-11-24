<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import type { PageData } from './$types';

	import DarkModeToggle from '$lib/components/DarkModeToggle.svelte';

	export let data: PageData;

	$: word = data.data[$page.params.nimi];

	$: if (browser && !word) {
		goto('/');
	}
</script>

{#if word}
	<div class="flex justify-between items-start">
		<div>
			<a
				href="/"
				class="inline-block px-2 py-1 border border-gray-200 hocus:border-gray-400 rounded-lg transition-colors text-lg
					dark:border-gray-800 dark:hocus:border-gray-700"
			>
				back
			</a>

			<h1 class="mt-4 text-4xl font-bold">{word.word}</h1>
		</div>

		<DarkModeToggle />
	</div>

	<p class="mt-2">
		<span class="text-gray-500 dark:text-gray-400">Usage category:</span>
		{word.usage_category}
	</p>

	<p class="mt-2">
		<span class="text-gray-500 dark:text-gray-400">Recognition:</span>
		{word.recognition['2022-08']}%
	</p>

	<p class="mt-2">
		<span class="text-gray-500 dark:text-gray-400">Book:</span>
		{word.book}
	</p>

	{#if word.coined_era}
		<p class="mt-2">
			<span class="text-gray-500 dark:text-gray-400">Coined era:</span>
			{word.coined_era}
		</p>
	{/if}

	{#if word.coined_year}
		<p class="mt-2">
			<span class="text-gray-500 dark:text-gray-400">Coined year:</span>
			{word.coined_year}
		</p>
	{/if}

	<p class="mt-2">
		{word.def.en}
	</p>

	{#if word.commentary}
		<h2 class="mt-4 text-2xl font-bold">commentary</h2>
		<p>
			{word.commentary}
		</p>
	{/if}

	{#if word.ku_data}
		<h2 class="mt-4 text-2xl font-bold">lipu ku translations</h2>
		<p>
			{word.ku_data}
		</p>
	{/if}

	{#if word.see_also}
		<h2 class="mt-4 text-2xl font-bold">related words</h2>

		{@const words = word.see_also.split(', ')}

		<p>
			{#each words as other, i (other)}
				<!-- Formatting here is weird to prevent additional spaces between commas -->
				<a href="/{other}" class="text-blue-500">{other}</a
				>{#if i < words.length - 1}{', '}{/if}
			{/each}
		</p>
	{/if}

	{#if word.creator || word.etymology}
		<h2 class="mt-4 text-2xl font-bold">origin</h2>

		{#if word.etymology}
			<p>
				<span class="text-gray-500 dark:text-gray-400">Source Language:</span>
				{word.source_language}
			</p>

			<p>
				<span class="text-gray-500 dark:text-gray-400">Etymology:</span>
				{word.etymology}
			</p>
		{/if}

		{#if word.creator}
			<p>
				<span class="text-gray-500 dark:text-gray-400">Creator(s):</span>
				{word.creator}
			</p>
		{/if}
	{/if}

	{#if word.sitelen_pona}
		<h2 class="mt-4 text-2xl font-bold">sitelen pona</h2>

		<span class="font-medium font-pona text-7xl">
			{word.sitelen_pona}
		</span>

		{#if word.sitelen_pona_etymology}
			<p>
				<span class="text-gray-500 dark:text-gray-400">Etymology:</span>
				{word.sitelen_pona_etymology}
			</p>
		{/if}
	{/if}

	{#if word.sitelen_sitelen}
		<h2 class="mt-4 text-2xl font-bold">sitelen sitelen</h2>

		<img
			src={word.sitelen_sitelen}
			alt="{word.word} sitelen sitelen"
			class="w-16 h-16 dark:invert"
		/>
	{/if}

	{#if word.sitelen_emosi}
		<h2 class="mt-4 text-2xl font-bold">sitelen emosi</h2>

		<p class="text-6xl">
			{word.sitelen_emosi}
		</p>
	{/if}

	{#if word.audio}
		{@const audios = Object.entries(word.audio)}

		<h2 class="mt-4 text-2xl font-bold">audio</h2>

		{#each audios as [person, url] (url)}
			<p>
				<a
					href={url}
					target="_blank"
					rel="noopener noreferrer"
					class="text-blue-500"
				>
					Recording by {person
						.split('_')
						.map((name, i) =>
							i === 0 ? name : name[0].toUpperCase() + name.slice(1)
						)
						.join(' ')}
				</a>
			</p>
		{/each}
	{/if}

	{#if word.luka_pona}
		<h2 class="mt-4 text-2xl font-bold">luka pona</h2>

		<p>
			<a
				href={word.luka_pona.gif}
				target="_blank"
				rel="noopener noreferrer"
				class="text-blue-500">luka pona gif</a
			>
		</p>
		<p>
			<a
				href={word.luka_pona.mp4}
				target="_blank"
				rel="noopener noreferrer"
				class="text-blue-500">luka pona mp4</a
			>
		</p>
	{/if}
{/if}
