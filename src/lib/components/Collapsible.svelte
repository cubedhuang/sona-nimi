<script lang="ts">
	export let content: string;
	export let length: number;

	$: collapsible = content.length > length;

	let expanded = false;

	$: shownContent = expanded ? content : content.slice(0, length);
</script>

{shownContent}

{#if collapsible}
	<button
		class="inline faded underline underline-offset-2 decoration-transparent hocus-visible:decoration-current transition"
		on:click={() => (expanded = !expanded)}
	>
		{expanded ? 'show less' : '...more'}
	</button>
{/if}
