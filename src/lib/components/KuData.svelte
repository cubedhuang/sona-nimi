<script lang="ts">
	import Collapsible from './Collapsible.svelte';

	interface Props {
		data: Record<string, number>;
	}

	const { data }: Props = $props();

	const entries = $derived(Object.entries(data).sort((a, b) => b[1] - a[1]));
</script>

<Collapsible>
	{#each entries as [key, value], i}
		{#if i > 0}
			,
		{/if}
		{key}<sup class="text-xs">{value}</sup>
	{/each}
</Collapsible>
