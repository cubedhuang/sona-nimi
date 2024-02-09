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
	class="sticky -top-1 z-10 w-fit max-w-full box-content -mt-2 pt-3 px-2 -mx-2 pb-2 -mb-2 flex gap-1 items-center rounded-b-lg bg-white transition
		dark:bg-black ring-gray-800"
	class:bg-opacity-0={!stick}
	class:dark:bg-opacity-0={!stick}
	class:shadow-lg={stick}
	class:bg-opacity-100={stick}
	class:dark:bg-opacity-100={stick}
	class:dark:ring-1={stick}
>
	<input
		type="search"
		{placeholder}
		bind:value
		bind:this={searchBar}
		class="px-4 py-2 max-w-full w-96 focusable cursor-auto"
	/>

	{#if value}
		<button
			class="p-2 interactable shrink-0"
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
