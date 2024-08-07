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

<div class="flex flex-col items-center" id={word.id}>
	<button class="group contents" on:click>
		{#if $sitelenMode === 'pona'}
			{#if word.representations?.ligatures?.length}
				<p class="whitespace-nowrap font-pona text-4xl">
					{word.representations.ligatures.slice(0, 3).join(' ')}
				</p>
			{:else}
				<span class="h-10" />
			{/if}
		{:else if $sitelenMode === 'sitelen'}
			{#if word.representations?.sitelen_sitelen}
				<img
					src={word.representations.sitelen_sitelen}
					alt="{word.word} sitelen sitelen"
					class="h-10 w-10 dark:invert"
				/>
			{:else}
				<span class="h-10" />
			{/if}
		{:else if $sitelenMode === 'jelo'}
			{#if word.representations?.sitelen_jelo}
				<p class="text-4xl">
					{word.representations.sitelen_jelo.slice(0, 3).join('')}
				</p>
			{:else}
				<span class="h-10" />
			{/if}
		{:else if word.representations?.sitelen_emosi}
			<p class="text-4xl">
				{word.representations.sitelen_emosi}
			</p>
		{:else}
			<span class="h-10" />
		{/if}

		<b class="transition group-hv:text-accent">
			{word.word}
		</b>
	</button>

	<span class="text-xs text-muted-foreground">
		<span class={categoryTextColors[word.usage_category]}>
			{getWordDisplayRecognition(word)}
		</span>

		{#if word.book !== 'none'}
			&middot;
			{word.book}
		{/if}
	</span>

	<p class="line-clamp-3 text-center text-xs">
		{translation.definition}
	</p>
</div>
