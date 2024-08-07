<script lang="ts">
	import { onMount } from 'svelte';

	import XMark from './icons/XMark.svelte';

	export let placeholder: string;
	export let value = '';

	let div: HTMLDivElement;
	let searchBar: HTMLInputElement;
	let stick = false;

	onMount(() => {
		searchBar?.focus();

		const observer = new IntersectionObserver(
			([e]) => (stick = e.intersectionRatio < 1),
			{ threshold: [1] }
		);
		observer.observe(div);

		return () => observer.disconnect();
	});
</script>

<svelte:window
	on:keydown={e => {
		if (e.ctrlKey || e.metaKey || e.altKey) {
			return;
		}

		if (searchBar === document.activeElement && e.key === 'Escape') {
			value = '';
			searchBar.blur();
		} else if (/^[a-z]$/i.test(e.key)) {
			searchBar.focus();
		}
	}}
/>

<div
	bind:this={div}
	class="sticky -top-1 z-10 -mx-2 -mb-2 -mt-2 box-content flex w-fit max-w-full items-center gap-1 rounded-b-lg px-2 pb-2 pt-3 transition
		{!stick ? 'bg-transparent' : 'bg-card shadow-lg ring-1 ring-border'}"
>
	<input
		type="search"
		{placeholder}
		bind:value
		bind:this={searchBar}
		class="focusable w-96 max-w-full cursor-auto px-4 py-2"
	/>

	{#if value}
		<button
			class="interactable shrink-0 p-2"
			on:click={() => {
				value = '';
				searchBar.focus();
			}}
			aria-label="clear search"
		>
			<XMark />
		</button>
	{/if}
</div>

<style lang="postcss">
	input[type='search']::-webkit-search-decoration,
	input[type='search']::-webkit-search-cancel-button,
	input[type='search']::-webkit-search-results-button,
	input[type='search']::-webkit-search-results-decoration {
		@apply hidden;
	}
</style>
