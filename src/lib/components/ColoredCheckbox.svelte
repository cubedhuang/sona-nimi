<script lang="ts">
	export let checked: boolean;
	export let label: string;
	export let color: string;
</script>

<button
	class="flex items-center border border-gray-200 rounded-lg overflow-hidden select-none hocus:border-gray-400 focus:outline-none transition-colors
		dark:border-gray-800 dark:hocus:border-gray-700"
	on:click={() => (checked = !checked)}
	on:keypress|stopPropagation
	role="checkbox"
	aria-checked={checked}
>
	<span
		class="{color} w-4 h-full transition-opacity"
		class:opacity-100={checked}
		class:opacity-30={!checked}
	/>

	<span class="px-2 py-0.5">{label}</span>
</button>
