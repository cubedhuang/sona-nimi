<script lang="ts">
	import type { LocalizedWord } from '@kulupu-linku/sona';

	import { getWordDisplayRecognition } from '$lib/util';

	interface Props {
		word: LocalizedWord;
	}

	const { word }: Props = $props();
</script>

{#if word.usage_category !== 'sandbox'}
	{word.usage_category}
	&middot;
{/if}
{getWordDisplayRecognition(word)}
{#if word.book !== 'none'}
	&middot; {word.book}
{/if}
{#if word.coined_year}
	&middot; {word.coined_year}
{/if}
