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
		class="p-2 max-w-full w-96 interactable cursor-auto"
	/>

	{#if value}
		<button
			class="p-2 interactable"
			on:click={() => {
				value = '';
				searchBar.focus();
			}}
		>
			<X />
		</button>
	{/if}
</div>
