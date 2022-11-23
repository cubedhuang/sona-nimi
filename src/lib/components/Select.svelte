<script lang="ts">
	export let options: {
		label: string;
		value: string;
	}[];

	export let value: string;
</script>

<select
	bind:value
	class="px-2 py-0.5 border border-gray-200 cursor-pointer rounded-lg focus:outline-none hocus:border-gray-400 transition-colors"
>
	{#each options as option}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>
