<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';

	import type { Word } from '$lib/types';
	import { language } from '$lib/stores';
	import {
		categoryColors,
		getWordDefinition,
		getWordRecognition
	} from '$lib/util';

	import Link from '$lib/components/Link.svelte';
	import X from '$lib/components/X.svelte';

	const dispatch = createEventDispatcher<{
		refer: string;
	}>();

	export let word: Word | null;
</script>

{#if word}
	{#key word.word}
		<div
			class="fixed bottom-0 right-0 left-0 top-1/3 md:bottom-4 md:right-4 md:left-auto md:top-auto md:w-[36rem] md:max-h-[40rem] p-6 overflow-y-auto bg-white border-t md:border border-gray-400 md:rounded-lg shadow-lg
				dark:bg-black dark:border-gray-800"
			transition:fly={{ y: 24, duration: 300 }}
		>
			<div class="flex items-end">
				<h2 class="text-2xl font-bold">{word.word}</h2>

				<div class="ml-auto flex items-center gap-2">
					<a
						href="/{word.word}"
						class="px-2 py-1 border border-gray-200 hocus:border-gray-400 rounded-lg focus:outline-none transition-colors
							dark:border-gray-800 dark:hocus:border-gray-600"
					>
						more
					</a>

					<button
						class="p-1 rounded-lg border border-gray-200 hocus:border-gray-400 focus:outline-none transition-colors
							dark:border-gray-800 dark:hocus:border-gray-600"
						on:click={() => {
							word = null;
						}}
					>
						<X />
					</button>
				</div>
			</div>

			<p class="text-gray-500 dark:text-gray-400">
				{word.usage_category} &middot;
				{getWordRecognition(word)}%
				{#if word.book !== 'none'}
					&middot; {word.book}
				{/if}
				{#if word.coined_year}
					&middot; {word.coined_year}
				{/if}
			</p>

			<p class="mt-2">
				{getWordDefinition(word, $language)}
			</p>

			{#if word.ku_data}
				<p class="mt-2">
					{word.ku_data}
				</p>
			{/if}

			{#if word.see_also}
				{@const words = word.see_also.split(', ')}

				<p class="mt-2">
					see
					{#each words as other, i (other)}
						<!-- Formatting here is weird to prevent additional spaces between commas -->
						{i !== 0 ? ',' : ''}
						<Link
							href="#{other}"
							on:click={() => {
								dispatch('refer', other);
							}}>{other}</Link
						>
					{/each}
				</p>
			{/if}

			{#if word.creator || word.etymology}
				<h3 class="mt-2 text-lg font-bold">origin</h3>

				{#if word.etymology}
					<p>
						{word.source_language} &middot;
						{word.etymology}
					</p>
				{/if}

				{#if word.creator}
					<p class="italic">
						{word.creator}
					</p>
				{/if}
			{/if}

			{#if word.sitelen_pona}
				<h3 class="mt-2 text-lg font-bold">sitelen pona</h3>

				<span class="font-medium font-pona text-4xl">
					{word.sitelen_pona}
				</span>

				{#if word.sitelen_pona_etymology}
					<p>
						{word.sitelen_pona_etymology}
					</p>
				{/if}
			{/if}

			{#if word.sitelen_sitelen}
				<h3 class="mt-2 text-lg font-bold">sitelen sitelen</h3>

				<img
					src={word.sitelen_sitelen}
					alt="{word.word} sitelen sitelen"
					class="w-10 h-10 dark:invert"
				/>
			{/if}

			{#if word.sitelen_emosi}
				<h3 class="mt-2 text-lg font-bold">sitelen emosi</h3>

				<p class="text-3xl">
					{word.sitelen_emosi}
				</p>
			{/if}

			{#if word.commentary}
				<p class="mt-2 text-gray-500 dark:text-gray-400">
					{word.commentary}
				</p>
			{/if}

			<span
				class="absolute -top-4 -left-4 p-4 rounded-full {categoryColors[
					word.usage_category
				]}"
			/>
		</div>
	{/key}
{/if}
