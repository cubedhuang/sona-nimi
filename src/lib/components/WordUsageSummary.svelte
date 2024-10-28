<script lang="ts">
	import type { LocalizedWord } from '@kulupu-linku/sona';

	import { getWordDisplayRecognition } from '$lib/util';

	interface Props {
		word: LocalizedWord;
	}

	const { word }: Props = $props();
	const displayRecognition = $derived(getWordDisplayRecognition(word));
</script>

{#if word.usage_category !== 'sandbox'}
	{word.usage_category} &middot;
{/if}
{#if displayRecognition !== 'unknown'}
	{getWordDisplayRecognition(word)}
	{#if word.book !== 'none' || word.coined_year}
		&middot;
	{/if}
{/if}
{#if word.book !== 'none'}
	{word.book}
	{#if word.coined_year}
		&middot;
	{/if}
{/if}
{#if word.coined_year}
	{word.coined_year}
{/if}
