<script lang="ts">
	export let id: string | undefined;
</script>

<button
	on:click
	{id}
	class="relative w-full overflow-hidden grid p-4 text-left hover:scale-[1.02] interactable transition"
>
	<slot />
</button>
