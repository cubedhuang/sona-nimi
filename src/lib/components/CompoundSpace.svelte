<script lang="ts">
	import type { Compound } from '$lib/types';

	import Space from './Space.svelte';

	export let compound: Compound;

	$: uses = Object.entries(compound.uses).sort((a, b) => b[1] - a[1]);
	$: usesString = uses.map(([use]) => use).join(', ');
	$: ellipsized =
		usesString.length > 100 ? usesString.slice(0, 100) + '...' : usesString;
</script>

<Space on:click id={compound.compound}>
	<div class="flex gap-2 justify-between">
		<div>
			<h2 class="text-xl font-bold">{compound.compound}</h2>

			<p class="text-gray-500 dark:text-gray-400">{uses[0][1]}%</p>

			<p>
				{ellipsized}
			</p>
		</div>

		{#if compound.glyphs.length}
			<div class="flex flex-col items-end text-right">
				{#each compound.glyphs as glyph}
					<p class="font-pona text-4xl">{glyph}</p>
				{/each}
			</div>
		{/if}
	</div>
</Space>
