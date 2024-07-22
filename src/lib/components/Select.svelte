<script lang="ts">
	// ESLint doesn't recognize Svelte's generic types
	// eslint-disable-next-line no-undef
	type T = $$Generic;

	export let options: {
		label: string;
		value: T;
	}[];

	export let name: string;
	export let value: T;
</script>

<label class="contents">
	<span class="sr-only">{name}</span>

	<select
		bind:value
		on:change
		class="appearance-none pl-2 py-0.5 interactable text-ellipsis max-w-full"
	>
		{#each options as option}
			<option value={option.value} selected={option.value === value}>
				{option.label}
			</option>
		{/each}
	</select>
</label>

<style lang="postcss">
	select {
		background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
		background-position: right 0.5rem center;
		background-repeat: no-repeat;
		background-size: 1.5em 1.5em;
		padding-right: 2.5em;
	}
</style>
