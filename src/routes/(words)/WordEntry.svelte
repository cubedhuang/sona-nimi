<script lang="ts">
	import type { Word } from '$lib/types';
	import {
		categoryTextColors,
		getWordDefinition,
		getWordDisplayRecognition
	} from '$lib/util';
	import { language, sitelenMode } from '$lib/stores';

	export let word: Word;
</script>

<p class="flex gap-1" id={word.id}>
	{#if $sitelenMode === 'pona'}
		{#if word.sitelen_pona}
			<span class="font-pona text-xl"
				>{word.sitelen_pona?.split(' ', 1)[0]}</span
			>
		{:else}
			<span class="w-5" />
		{/if}
	{:else if $sitelenMode === 'sitelen'}
		{#if word.sitelen_sitelen}
			<img
				src={word.sitelen_sitelen}
				alt="{word.word} sitelen sitelen"
				class="my-0.5 w-6 h-6 dark:invert"
			/>
		{:else}
			<span class="w-6" />
		{/if}
	{:else if word.sitelen_emosi}
		<span class="text-xl w-6">{word.sitelen_emosi}</span>
	{:else}
		<span class="w-6" />
	{/if}

	<span class="ml-0.5 mt-0.5">
		<button on:click class="font-bold hocus-visible:text-blue-500 transition">
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

		{getWordDefinition(word, $language)}
	</span>
</p>
