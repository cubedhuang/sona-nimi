<script lang="ts">
	import type { LocalizedWord } from '@kulupu-linku/sona';

	import { categoryColors, getWordTranslation } from '$lib/util';
	import { language, sitelenMode } from '$lib/stores';

	import Space from '$lib/components/Space.svelte';
	import WordUsageSummary from './WordUsageSummary.svelte';

	export let word: LocalizedWord;

	$: translation = getWordTranslation(word, $language);
</script>

<Space on:click id={word.id}>
	<div class="flex gap-2 justify-between">
		<div>
			<h2 class="text-xl">{word.word}</h2>

			<p class="faded">
				<WordUsageSummary {word} />
			</p>

			<p class="line-clamp-3">
				{translation.definition}
			</p>

			{#if word.usage_category === 'sandbox' && word.creator.length}
				<p class="mt-1 faded italic">by {word.creator.join(', ')}</p>
			{/if}
		</div>

		{#if $sitelenMode === 'pona'}
			{#if word.representations?.ligatures?.length}
				<div class="flex flex-col items-end text-right shrink-0">
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
					class="ml-auto w-10 h-10 shrink-0 dark:invert"
				/>
			{/if}
		{:else if $sitelenMode === 'jelo'}
			{#if word.representations?.sitelen_jelo}
				<div class="shrink-0">
					{#each word.representations.sitelen_jelo.slice(0, 3) as sitelen}
						<p class="ml-auto text-3xl text-right">
							{sitelen}
						</p>
					{/each}
				</div>
			{/if}
		{:else if word.representations?.sitelen_emosi}
			<p class="ml-auto text-3xl text-right shrink-0">
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
