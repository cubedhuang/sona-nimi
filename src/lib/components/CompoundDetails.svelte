<script lang="ts">
	import { fly } from 'svelte/transition';

	import type { Compound } from '$lib/types';

	import X from './X.svelte';

	export let compound: Compound | null;
</script>

{#if compound}
	{#key compound.compound}
		<div
			class="fixed bottom-0 right-0 left-0 md:bottom-4 md:right-4 md:left-auto md:w-[36rem] max-h-80 md:max-h-[40rem] p-6 overflow-y-auto bg-white border-t md:border border-gray-400 md:rounded-lg shadow-lg
				dark:bg-black dark:border-gray-800"
			transition:fly={{ y: 24, duration: 300 }}
		>
			<div class="flex">
				<h2 class="text-2xl font-bold">{compound.compound}</h2>

				<button
					class="ml-auto p-1 rounded-lg hocus:bg-gray-200 focus:outline-none transition-colors
						dark:hocus:bg-gray-900"
					on:click={() => {
						compound = null;
					}}
				>
					<X />
				</button>
			</div>

			<p class="font-pona text-4xl">
				{compound.glyphs.join(' ') || compound.compound}
			</p>

			<p>
				see
				{#each compound.compound.split(' ') as word, i (word)}
					{i !== 0 ? ',' : ''}
					<a href="/{word}" class="text-blue-500">{word}</a>
				{/each}
			</p>

			<div class="flex flex-col mt-2">
				{#each Object.entries(compound.uses) as [use, count]}
					<p>
						{use}
						<span class="text-gray-500 dark:text-gray-400">
							&middot; {count}%
						</span>
					</p>
				{/each}
			</div>
		</div>
	{/key}
{/if}
