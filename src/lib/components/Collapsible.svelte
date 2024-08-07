<script lang="ts">
	import { onMount } from 'svelte';

	let span: HTMLSpanElement;
	let expandable = false;

	onMount(() => {
		expandable = span.scrollHeight > span.clientHeight + 2;
	});

	let expanded = false;

	let button: HTMLButtonElement;
</script>

<span class:line-clamp-2={!expanded} bind:this={span}>
	<slot />
</span>

{#if expandable}
	<button
		class="rounded text-muted underline decoration-transparent underline-offset-2 outline-none outline-offset-4 transition focus-visible:outline-contrast hv:decoration-current"
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
