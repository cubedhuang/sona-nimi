<script lang="ts">
	import type { LocalizedWord } from '@kulupu-linku/sona';

	import {
		categoryTextColors,
		getWordDisplayRecognition,
		getWordTranslation
	} from '$lib/util';
	import { language, sitelenMode } from '$lib/stores';

	export let word: LocalizedWord;

	$: translation = getWordTranslation(word, $language);
</script>

<p class="flex gap-1" id={word.id}>
	{#if $sitelenMode === 'pona'}
		{#if word.representations?.ligatures?.length}
			<span class="shrink-0 font-pona text-xl"
				>{word.representations.ligatures[0]}</span
			>
		{:else}
			<span class="shrink-0 w-5" />
		{/if}
	{:else if $sitelenMode === 'sitelen'}
		{#if word.representations?.sitelen_sitelen}
			<img
				src={word.representations.sitelen_sitelen}
				alt="{word.word} sitelen sitelen"
				class="shrink-0 my-0.5 w-6 h-6 dark:invert"
			/>
		{:else}
			<span class="shrink-0 w-6" />
		{/if}
	{:else if $sitelenMode === 'jelo'}
		{#if word.representations?.sitelen_jelo}
			<span class="shrink-0 text-xl w-6">
				{word.representations.sitelen_jelo[0]}
			</span>
		{:else}
			<span class="shrink-0 w-6" />
		{/if}
	{:else if word.representations?.sitelen_emosi}
		<span class="shrink-0 text-xl w-6">
			{word.representations.sitelen_emosi}
		</span>
	{:else}
		<span class="shrink-0 w-6" />
	{/if}

	<span class="ml-0.5 mt-0.5">
		<button on:click class="font-bold hv:text-blue-500 transition">
			{word.word}
		</button>

		<span class="text-xs faded">
			<span class={categoryTextColors[word.usage_category]}>
				{getWordDisplayRecognition(word)}
			</span>

			{#if word.book !== 'none'}
				{word.book}
			{/if}
		</span>

		{translation.definition}
	</span>
</p>
