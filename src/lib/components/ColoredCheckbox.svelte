<script lang="ts">
	export let checked: boolean;
	export let label: string;
	export let color: string;
</script>

<button
	class="interactable flex items-center"
	on:click={() => (checked = !checked)}
	role="checkbox"
	aria-checked={checked}
>
	<span
		class="{color} h-full w-4 transition-opacity"
		class:opacity-100={checked}
		class:opacity-30={!checked}
	/>

	<span class="px-2 py-0.5 transition-colors" class:text-muted={!checked}>
		{label}
	</span>
</button>
