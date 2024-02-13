<script lang="ts">
	import type { Word } from '$lib/types';
	import {
		categoryColors,
		getWordDefinition,
		getWordDisplayRecognition
	} from '$lib/util';
	import { language } from '$lib/stores';
	import Space from '$lib/components/Space.svelte';

	export let word: Word;
</script>

<Space on:click id={word.id}>
	<div class="grid grid-cols-3 faded">
		<div>
			{#if word.source_language}
				<p class="break-all line-clamp-1">
					{word.source_language}
				</p>
			{/if}
			{#if word.etymology}
				<p class="text-xs break-all line-clamp-1">
					{word.etymology}
				</p>
			{/if}
		</div>

		<p class="mt-auto text-center text-xs faded">
			{word.usage_category} &middot;
			{getWordDisplayRecognition(word)}
			{#if word.book !== 'none'}
				&middot; {word.book}
			{/if}
		</p>

		<div class="text-right">
			{#if word.creator}
				<p class="break-all line-clamp-1">
					{word.creator}
				</p>
			{/if}
			{#if word.coined_era}
				<p class="text-xs break-all line-clamp-1">
					{word.coined_era}

					{#if word.coined_year}
						&middot; {word.coined_year}
					{/if}
				</p>
			{/if}
		</div>
	</div>

	<div class="mt-1 text-center flex gap-2">
		<div class="w-9 shrink-0 flex flex-col items-end text-right">
			{#if word.sitelen_pona}
				{#each word.sitelen_pona.split(' ') as sitelen}
					<p class="font-pona text-4xl">{sitelen}</p>
				{/each}
			{/if}
		</div>

		<div class="w-full">
			<h2 class="text-3xl group-hocus-visible:text-blue-500 transition">
				{word.word}
			</h2>

			<p class="mt-1">{getWordDefinition(word, $language)}</p>

			{#if word.commentary}
				<p class="mt-2 faded text-sm">{word.commentary}</p>
			{/if}
		</div>

		<div class="w-9 shrink-0">
			{#if word.sitelen_sitelen}
				<img
					src={word.sitelen_sitelen}
					alt="{word.word} sitelen sitelen"
					class="ml-auto w-9 h-9 dark:invert"
				/>
			{/if}
		</div>
	</div>

	<span
		class="absolute -top-3 -left-3 p-3 rounded-full {categoryColors[
			word.usage_category
		]}"
	/>
</Space>
