<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();

	let span = $state<HTMLSpanElement | undefined>();
	const expandable = $derived(
		span ? span.scrollHeight > span.clientHeight + 2 : false
	);
	let expanded = $state(false);

	let button = $state<HTMLButtonElement | undefined>();
</script>

<span class:line-clamp-2={!expanded} bind:this={span}>
	{@render children()}
</span>

{#if expandable}
	<button
		class="rounded text-muted underline decoration-transparent underline-offset-2 outline-none outline-offset-4 transition focus-visible:outline-contrast hv:decoration-current"
		class:block={expanded}
		onclick={() => {
			expanded = !expanded;
			button?.blur();
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
