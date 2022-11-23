<script lang="ts">
	export let checked: boolean;
	export let label: string;
	export let color: string;
</script>

<label
	class="relative flex items-center px-2 py-0.5 border border-gray-200 cursor-pointer rounded-lg overflow-hidden"
>
	<input type="checkbox" bind:checked class="hidden" />

	<span
		class="{color} absolute top-0 left-0 w-4 h-full transition-opacity"
		class:opacity-100={checked}
		class:opacity-50={!checked}
	/>

	<span class="ml-4">{label}</span>
</label>
