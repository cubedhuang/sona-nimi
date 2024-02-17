<script lang="ts">
	import type { LocalizedWord } from '@kulupu-linku/sona';

	import {
		categoryColors,
		getWordDisplayRecognition,
		getWordEtymologies,
		getWordTranslation
	} from '$lib/util';
	import { language, sitelenMode } from '$lib/stores';
	import Space from '$lib/components/Space.svelte';

	export let word: LocalizedWord;

	$: translation = getWordTranslation(word, $language);
</script>

<Space on:click id={word.id}>
	<div class="grid grid-cols-3 faded">
		<div>
			<p class="break-all line-clamp-1">
				{word.source_language}
			</p>

			{#if word.etymology}
				<p class="text-xs break-all line-clamp-1">
					{getWordEtymologies(word, $language)}
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
			{#if word.creator.length}
				<p class="break-all line-clamp-1">
					{word.creator.join(', ')}
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
			{#each word.representations?.ligatures ?? [] as sitelen}
				<p class="font-pona text-4xl">{sitelen}</p>
			{/each}
		</div>

		<div class="w-full">
			<h2 class="text-3xl group-hv:text-blue-500 transition">
				{word.word}
			</h2>

			<p class="mt-1">{translation.definition}</p>

			{#if translation.commentary}
				<p class="mt-2 faded text-sm">{translation.commentary}</p>
			{/if}
		</div>

		<div class="w-9 shrink-0">
			{#if $sitelenMode === 'emosi'}
				{#if word.representations?.sitelen_emosi}
					<span class="text-3xl w-9 text-center">
						{word.representations.sitelen_emosi}
					</span>
				{/if}
			{:else if word.representations?.sitelen_sitelen}
				<img
					src={word.representations.sitelen_sitelen}
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
