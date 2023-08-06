<script lang="ts">
	import { onMount } from 'svelte';
	import X from './X.svelte';

	export let placeholder: string;
	export let value = '';

	let div: HTMLDivElement;
	let searchBar: HTMLInputElement;
	let stick = false;

	onMount(() => {
		const observer = new IntersectionObserver(
			([e]) => (stick = e.intersectionRatio < 1),
			{ threshold: [1] }
		);
		observer.observe(div);

		return () => observer.disconnect();
	});
</script>

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
		class="p-2 max-w-full w-96 interactable cursor-auto"
	/>

	{#if value}
		<button
			class="p-2 interactable shrink-0"
			on:click={() => {
				value = '';
				searchBar.focus();
			}}
		>
			<X />
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
