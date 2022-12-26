<script lang="ts">
	import { fly } from 'svelte/transition';

	import type { Compound } from '$lib/types';

	import Link from '$lib/components/Link.svelte';
	import X from '$lib/components/X.svelte';

	export let compound: Compound | null;
</script>

{#if compound}
	<div
		class="fixed bottom-0 right-0 w-full"
		transition:fly|local={{ y: 24, duration: 300 }}
	>
		{#key compound.compound}
			<div class="details" transition:fly|local={{ y: 24, duration: 300 }}>
				<div class="flex">
					<h2 class="text-2xl">{compound.compound}</h2>

					<button
						class="ml-auto p-1 interactable"
						on:click={() => {
							compound = null;
						}}
					>
						<X />
					</button>
				</div>

				<p class="font-pona text-4xl">
					{compound.glyphs?.join(' ') || compound.compound}
				</p>

				<p>
					see
					{#each compound.compound.split(' ') as word, i (word)}
						{i !== 0 ? ',' : ''}
						<Link href="/{word}">{word}</Link>
					{/each}
				</p>

				<div class="flex flex-col mt-2">
					{#each Object.entries(compound.uses) as [use, count]}
						<p>
							{use}
							<span class="faded">
								&middot; {count}%
							</span>
						</p>
					{/each}
				</div>
			</div>
		{/key}
	</div>
{/if}
