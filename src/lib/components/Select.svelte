<script lang="ts">
	type T = $$Generic;

	export let options: {
		label: string;
		value: T;
	}[];

	export let value: T;
</script>

<select bind:value class="px-2 py-0.5 interactable">
	{#each options as option}
		<option value={option.value} selected={option.value === value}>
			{option.label}
		</option>
	{/each}
</select>
