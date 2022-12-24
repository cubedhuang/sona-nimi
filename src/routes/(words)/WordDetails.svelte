<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';

	import type { Word } from '$lib/types';
	import { language } from '$lib/stores';
	import {
		categoryColors,
		getWordDefinition,
		getWordDisplayRecognition
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
		<div class="details" transition:fly={{ y: 24, duration: 300 }}>
			<div class="flex items-end">
				<h2 class="text-2xl">{word.word}</h2>

				<div class="ml-auto flex items-center gap-2">
					<a href="/{word.word}" class="px-2 py-1 interactable"> more </a>

					<button
						class="p-1 interactable"
						on:click={() => {
							word = null;
						}}
					>
						<X />
					</button>
				</div>
			</div>

			<p class="faded">
				{word.usage_category} &middot;
				{getWordDisplayRecognition(word)}
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
				<h3 class="mt-2 text-lg">origin</h3>

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
				<h3 class="mt-2 text-lg">sitelen pona</h3>

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
				<h3 class="mt-2 text-lg">sitelen sitelen</h3>

				<img
					src={word.sitelen_sitelen}
					alt="{word.word} sitelen sitelen"
					class="w-10 h-10 dark:invert"
				/>
			{/if}

			{#if word.sitelen_emosi}
				<h3 class="mt-2 text-lg">sitelen emosi</h3>

				<p class="text-3xl">
					{word.sitelen_emosi}
				</p>
			{/if}

			{#if word.commentary}
				<p class="mt-2 faded">
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
