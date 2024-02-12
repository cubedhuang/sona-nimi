<script lang="ts">
	import type { Word } from '$lib/types';
	import { categoryTextColors, getWordDisplayRecognition } from '$lib/util';

	export let word: Word;
</script>

<div class="flex flex-col">
	<button class="text-left contents group" on:click>
		{#if word.luka_pona?.gif}
			<img
				src={word.luka_pona?.gif}
				alt="{word.word} luka pona"
				class="rounded-lg w-full aspect-video bg-blue-100 dark:bg-blue-950"
				loading="lazy"
			/>
		{:else}
			<div
				class="h-full aspect-video bg-gray-100 dark:bg-gray-900 rounded-lg"
			>
				<p class="sr-only">no luka pona available</p>
			</div>
		{/if}

		<b class="group-hocus-visible:text-blue-500 transition">
			{word.word}
		</b>
	</button>

	<span class="text-xs faded">
		<span class={categoryTextColors[word.usage_category]}>
			{getWordDisplayRecognition(word)}
		</span>

		{#if word.book !== 'none'}
			&middot;
			{word.book}
		{/if}
	</span>
</div>
