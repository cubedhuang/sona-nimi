<script lang="ts">
	export let checked: boolean;
	export let label: string;
	export let color: string;
</script>

<button
	class="relative flex items-center px-2 py-0.5 border border-gray-200 cursor-pointer rounded-lg overflow-hidden select-none hocus:border-gray-400 focus:outline-none transition-colors
		dark:border-gray-800 dark:hocus:border-gray-700"
	on:click={e => (checked = !checked)}
	on:keypress|stopPropagation
	role="checkbox"
	aria-checked={checked}
>
	<span
		class="{color} absolute top-0 bottom-0 left-0 w-4 transition-opacity"
		class:opacity-100={checked}
		class:opacity-30={!checked}
	/>

	<span class="ml-4">{label}</span>
</button>
