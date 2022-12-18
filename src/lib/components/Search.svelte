<script lang="ts">
	import X from './X.svelte';

	export let placeholder: string;
	export let value = '';

	let searchBar: HTMLInputElement;
</script>

<svelte:body
	on:keypress={() => {
		if (document.activeElement !== searchBar) {
			searchBar.focus();
		}
	}}
/>

<div class="mt-1 flex gap-1 items-center">
	<input
		type="text"
		{placeholder}
		bind:value
		bind:this={searchBar}
		class="p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors max-w-full w-96
			dark:bg-black dark:border-gray-800 dark:focus:border-gray-700"
	/>

	{#if value}
		<button
			class="p-2 rounded-lg border border-gray-200 hocus:border-gray-400 focus:outline-none transition-colors
				dark:border-gray-800 dark:hocus:border-gray-600"
			on:click={() => {
				value = '';
				searchBar.focus();
			}}
		>
			<X />
		</button>
	{/if}
</div>
