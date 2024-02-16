<script lang="ts">
	export let content: string;
	export let length: number;

	$: collapsible = content.length > length;

	let expanded = false;

	$: shownContent = expanded ? content : content.slice(0, length);

	let button: HTMLButtonElement;
</script>

{shownContent}

{#if collapsible}
	<button
		class="faded underline underline-offset-2 decoration-transparent hv:decoration-current outline-none outline-offset-4 focus-visible:outline-gray-500 rounded transition"
		class:block={expanded}
		on:click={() => {
			expanded = !expanded;
			button.blur();
		}}
		bind:this={button}
	>
		{#if expanded}
			less
		{:else}
			&hellip;more
		{/if}
	</button>
{/if}
