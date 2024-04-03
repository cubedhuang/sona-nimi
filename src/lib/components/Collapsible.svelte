<script lang="ts">
	import { onMount } from 'svelte';

	let span: HTMLSpanElement;
	let expandable = false;

	onMount(() => {
		expandable = span.scrollHeight > span.clientHeight;
	});

	let expanded = false;

	let button: HTMLButtonElement;
</script>

<span class:line-clamp-2={!expanded} bind:this={span}>
	<slot />
</span>

{#if expandable}
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
			more
		{/if}
	</button>
{/if}
