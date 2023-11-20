<script lang="ts">
	import type { Word } from '$lib/types';
	import {
		categoryColors,
		getWordDefinition,
		getWordDisplayRecognition
	} from '$lib/util';
	import { language, sitelenMode } from '$lib/stores';

	import Space from '$lib/components/Space.svelte';

	export let word: Word;
	export let detailed = false;

	const maxLength = 120;
	$: def = getWordDefinition(word, $language);
	$: ellipsizedDef = detailed
		? def
		: def.length > maxLength
		? def.slice(0, maxLength) + '...'
		: def;
</script>

<Space on:click id={word.id}>
	<div class="flex gap-2 justify-between">
		<div>
			<h2 class="text-xl">{word.word}</h2>

			<p class="faded">
				{word.usage_category} &middot;
				{getWordDisplayRecognition(word)}
				{#if word.book !== 'none'}
					&middot; {word.book}
				{/if}
				{#if word.coined_year}
					&middot; {word.coined_year}
				{/if}
			</p>

			<p>{ellipsizedDef}</p>

			{#if detailed}
				{#if word.ku_data}
					<p class="mt-2">
						{word.ku_data}
					</p>
				{/if}

				{#if word.etymology}
					<p class="mt-2">
						{word.source_language}
						&middot;
						{word.etymology}
					</p>
				{/if}
				{#if word.creator}
					<p class="italic">
						{word.creator}
					</p>
				{/if}

				{#if word.commentary}
					<p class="mt-2 faded">{word.commentary}</p>
				{/if}
			{/if}
		</div>

		{#if $sitelenMode === 'pona'}
			{#if word.sitelen_pona}
				<div class="flex flex-col items-end text-right">
					{#each word.sitelen_pona.split(' ') as sitelen}
						<p class="font-pona text-4xl">{sitelen}</p>
					{/each}
				</div>
			{/if}
		{:else if $sitelenMode === 'sitelen'}
			{#if word.sitelen_sitelen}
				<img
					src={word.sitelen_sitelen}
					alt="{word.word} sitelen sitelen"
					class="ml-auto w-10 h-10 dark:invert"
				/>
			{/if}
		{:else if word.sitelen_emosi}
			<p class="ml-auto text-3xl text-right">
				{word.sitelen_emosi}
			</p>
		{/if}

		<span
			class="absolute -top-3 -left-3 p-3 rounded-full {categoryColors[
				word.usage_category
			]}"
		/>
	</div>
</Space>
