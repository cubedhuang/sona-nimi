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
		class="faded underline underline-offset-2 decoration-transparent hocus-visible:decoration-current transition"
		class:block={expanded}
		on:click={() => (expanded = !expanded)}
	>
		{expanded ? 'less' : '...more'}
	</button>
{/if}
