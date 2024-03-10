<script lang="ts">
	import type { LocalizedWord, WordTranslation } from '@kulupu-linku/sona';

	export let word: LocalizedWord;
	export let translation: WordTranslation;

	let className = '';
</script>

{#if word.source_language.startsWith('multiple')}
	<p class="italic">
		{word.source_language}
	</p>
{/if}

{#each word.etymology as { word: sourceWord, alt }, i}
	{@const { definition, language } = translation.etymology[i]}
	<p>
		{language}
		{#if sourceWord}
			&middot;
			{sourceWord}
			{#if alt}
				{alt}
			{/if}
			&lsquo;{definition}&rsquo;
		{/if}
	</p>
{/each}

{#if word.creator.length}
	<p class="italic">
		by
		{word.creator.join(', ')}
	</p>
{/if}
