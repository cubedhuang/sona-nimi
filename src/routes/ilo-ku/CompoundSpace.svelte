<script lang="ts">
	import type { Compound } from '$lib/types';

	import Space from '$lib/components/Space.svelte';

	export let compound: Compound;

	$: uses = Object.entries(compound.uses).sort((a, b) => b[1] - a[1]);
	$: usesString = uses
		.map(([use]) => use.replaceAll(' (', '\u00a0('))
		.join(', ');
</script>

<Space on:click id={compound.compound}>
	<div class="flex justify-between gap-2">
		<div>
			<h2 class="text-xl">{compound.compound}</h2>

			<p class="text-muted">{uses[0][1]}%</p>

			<p class="line-clamp-3">
				{usesString}
			</p>
		</div>

		{#if compound.glyphs?.length}
			<div class="flex flex-col items-end text-right">
				{#each compound.glyphs as glyph}
					<p class="whitespace-nowrap font-pona text-4xl">{glyph}</p>
				{/each}
			</div>
		{/if}
	</div>
</Space>
