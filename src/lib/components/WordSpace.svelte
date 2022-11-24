<script lang="ts">
	import type { Word } from '$lib/types';
	import { categoryColors } from '$lib/util';
	import { sitelenMode } from '$lib/stores';

	export let word: Word;

	const maxLength = 120;
	$: def =
		word.def.en.length > maxLength
			? word.def.en.slice(0, maxLength) + '...'
			: word.def.en;
</script>

<button
	on:click
	id={word.word}
	class="relative w-full overflow-hidden grid p-4 border border-gray-200 rounded-lg text-left hover:scale-[1.02] hocus:border-gray-400 focus:outline-none transition
		dark:border-gray-800 dark:hocus:border-gray-700"
>
	<div class="flex gap-2 justify-between">
		<div>
			<h2 class="text-xl font-bold">{word.word}</h2>

			<p class="text-gray-500 dark:text-gray-400">
				{word.usage_category} &middot;
				{word.recognition['2022-08']}%
				{#if word.coined_era}
					&middot; {word.coined_era}
				{/if}
				{#if word.coined_year}
					&middot; {word.coined_year}
				{/if}
			</p>

			<p>{def}</p>
		</div>

		{#if $sitelenMode === 'pona'}
			{#if word.sitelen_pona}
				<p class="font-pona text-4xl text-right">{word.sitelen_pona}</p>
			{/if}
		{:else if $sitelenMode === 'sitelen'}
			{#if word.sitelen_sitelen}
				<img
					src={word.sitelen_sitelen}
					alt="{word.word} sitelen sitelen"
					class="ml-auto w-10 h-10 dark:invert"
				/>
			{/if}
		{:else if word.sitelen_emosi}
			<p class="ml-auto text-3xl text-right">
				{word.sitelen_emosi}
			</p>
		{/if}

		<span
			class="absolute -top-3 -left-3 p-3 rounded-full {categoryColors[
				word.usage_category
			]}"
		/>
	</div>
</button>

<style>
	@keyframes highlight-light {
		0% {
			@apply bg-blue-100;
		}
		100% {
			@apply bg-white;
		}
	}

	@keyframes highlight-dark {
		0% {
			@apply bg-slate-900;
		}
		100% {
			@apply bg-black;
		}
	}

	:target {
		animation: highlight-light 3s ease-in-out;
	}

	:global(.dark) :target {
		animation: highlight-dark 3s ease-in-out;
	}
</style>
