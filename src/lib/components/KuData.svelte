<script lang="ts">
	import Collapsible from './Collapsible.svelte';

	export let data: Record<string, number>;

	$: entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
</script>

<Collapsible>
	{#each entries as [key, value], i}
		{#if i > 0}
			,
		{/if}
		{key}<sup class="text-xs">{value}</sup>
	{/each}
</Collapsible>
