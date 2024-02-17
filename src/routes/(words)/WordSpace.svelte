<script lang="ts">
	import type { LocalizedWord } from '@kulupu-linku/sona';

	import {
		categoryColors,
		getWordDisplayRecognition,
		getWordTranslation
	} from '$lib/util';
	import { language, sitelenMode } from '$lib/stores';

	import Space from '$lib/components/Space.svelte';

	export let word: LocalizedWord;

	$: translation = getWordTranslation(word, $language);
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

			<p class="line-clamp-3">
				{translation.definition}
			</p>
		</div>

		{#if $sitelenMode === 'pona'}
			{#if word.representations?.ligatures?.length}
				<div class="flex flex-col items-end text-right">
					{#each word.representations.ligatures as sitelen}
						<p class="font-pona text-4xl">{sitelen}</p>
					{/each}
				</div>
			{/if}
		{:else if $sitelenMode === 'sitelen'}
			{#if word.representations?.sitelen_sitelen}
				<img
					src={word.representations.sitelen_sitelen}
					alt="{word.word} sitelen sitelen"
					class="ml-auto w-10 h-10 dark:invert"
				/>
			{/if}
		{:else if word.representations?.sitelen_emosi}
			<p class="ml-auto text-3xl text-right">
				{word.representations.sitelen_emosi}
			</p>
		{/if}

		<span
			class="absolute -top-3 -left-3 p-3 rounded-full {categoryColors[
				word.usage_category
			]}"
		/>
	</div>
</Space>
