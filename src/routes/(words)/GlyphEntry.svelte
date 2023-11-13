<script lang="ts">
	import type { Word } from '$lib/types';
	import {
		categoryTextColors,
		getWordDefinition,
		getWordDisplayRecognition
	} from '$lib/util';
	import { language, sitelenMode } from '$lib/stores';

	export let word: Word;

	$: def = getWordDefinition(word, $language);
</script>

<div class="flex flex-col items-center">
	<button class="contents group" on:click>
		{#if $sitelenMode === 'pona'}
			{#if word.sitelen_pona}
				<p class="font-pona text-4xl">{word.sitelen_pona}</p>
			{/if}
		{:else if $sitelenMode === 'sitelen'}
			{#if word.sitelen_sitelen}
				<img
					src={word.sitelen_sitelen}
					alt="{word.word} sitelen sitelen"
					class="w-10 h-10 dark:invert"
				/>
			{/if}
		{:else if word.sitelen_emosi}
			<p class="text-4xl">
				{word.sitelen_emosi}
			</p>
		{/if}

		<b class="group-hocus-visible:text-blue-500 transition">
			{word.word}
		</b>
	</button>

	<span class="text-xs faded">
		<span class={categoryTextColors[word.usage_category]}>
			{getWordDisplayRecognition(word)}
		</span>

		{#if word.book !== 'none'}
			&middot;
			{word.book}
		{/if}
	</span>

	<p class="text-xs line-clamp-3 text-center">
		{def}
	</p>
</div>
