<script lang="ts">
	import type { Word } from '$lib/types';

	export let word: Word;
</script>

<button class="text-left group" on:click id={word.id}>
	{#if word.luka_pona?.gif}
		<img
			src={word.luka_pona?.gif}
			alt="{word.word} luka pona"
			class="rounded-lg w-full aspect-video bg-gray-100 dark:bg-gray-900"
			loading="lazy"
		/>
	{/if}

	<b class="block mt-2 group-hocus-visible:text-blue-500 transition">
		{word.word}
	</b>
</button>
