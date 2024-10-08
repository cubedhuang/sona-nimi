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
	<div class="flex justify-between gap-2">
		<div>
			<h2 class="text-xl">{word.word}</h2>

			<p class="text-muted">
				<WordUsageSummary {word} />
			</p>

			<p class="line-clamp-3">
				{translation.definition}
			</p>

			{#if word.usage_category === 'sandbox' && word.creator.length}
				<p class="mt-1 italic text-muted">
					by {word.creator.join(', ')}
				</p>
			{/if}
		</div>

		{#if $sitelenMode === 'pona'}
			{#if word.representations?.ligatures?.length}
				<div class="flex shrink-0 flex-col items-end text-right">
					{#each word.representations.ligatures as sitelen}
						<p class="font-pona text-4xl">{sitelen}</p>
					{/each}
				</div>
			{/if}
		{:else if $sitelenMode === 'sitelen'}
			{#if word.representations?.sitelen_sitelen}
				<img
					src="/api/ss?word={word.word}"
					alt="{word.word} sitelen sitelen"
					class="invertible ml-auto h-10 w-10 shrink-0"
				/>
			{/if}
		{:else if $sitelenMode === 'jelo'}
			{#if word.representations?.sitelen_jelo}
				<div class="shrink-0">
					{#each word.representations.sitelen_jelo.slice(0, 3) as sitelen}
						<p class="ml-auto text-right text-3xl">
							{sitelen}
						</p>
					{/each}
				</div>
			{/if}
		{:else if word.representations?.sitelen_emosi}
			<p class="ml-auto shrink-0 text-right text-3xl">
				{word.representations.sitelen_emosi}
			</p>
		{/if}

		<span
			class="absolute -left-3 -top-3 rounded-full p-3 {categoryColors[
				word.usage_category
			]}"
		/>
	</div>
</Space>
