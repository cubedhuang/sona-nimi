<script lang="ts">
	import type { LocalizedWord, WordTranslation } from '@kulupu-linku/sona';

	export let word: LocalizedWord;
	export let translation: WordTranslation;
</script>

{#if word.source_language.startsWith('multiple') || word.source_language.startsWith('unknown')}
	<p class="italic">
		{word.source_language}
	</p>
{/if}

{#each word.etymology as { word: sourceWord, alt }, i}
	{#if !(word.source_language === 'unknown' && sourceWord === 'unknown')}
		{@const { definition, language } = translation.etymology[i]}
		<p>
			{language}
			{#if sourceWord}
				&middot;
				{sourceWord}
				{#if alt}
					{alt}
				{/if}
				{#if definition !== sourceWord}
					&lsquo;{definition}&rsquo;
				{/if}
			{/if}
		</p>
	{/if}
{/each}

{#if word.creator.length}
	<p class="italic">
		by
		{word.creator.join(', ')}
	</p>
{/if}
