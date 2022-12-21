<script lang="ts">
	import type { Compound } from '$lib/types';

	import Space from '$lib/components/Space.svelte';

	export let compound: Compound;

	$: uses = Object.entries(compound.uses).sort((a, b) => b[1] - a[1]);
	$: usesString = uses
		.map(([use]) => use.replaceAll(' (', '\u00a0('))
		.join(', ');
	$: ellipsized =
		usesString.length > 100 ? usesString.slice(0, 100) + '...' : usesString;
</script>

<Space on:click id={compound.compound}>
	<div class="flex gap-2 justify-between">
		<div>
			<h2 class="text-xl">{compound.compound}</h2>

			<p class="faded">{uses[0][1]}%</p>

			<p>
				{ellipsized}
			</p>
		</div>

		{#if compound.glyphs?.length}
			<div class="flex flex-col items-end text-right">
				{#each compound.glyphs as glyph}
					<p class="font-pona text-4xl whitespace-nowrap">{glyph}</p>
				{/each}
			</div>
		{/if}
	</div>
</Space>
