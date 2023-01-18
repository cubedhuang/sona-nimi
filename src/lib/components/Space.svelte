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

<style lang="postcss">
	@keyframes highlight-light {
		0% {
			@apply bg-blue-100;
		}
		100% {
			@apply bg-white;
		}
	}

	@keyframes highlight-dark {
		0% {
			@apply bg-slate-900;
		}
		100% {
			@apply bg-black;
		}
	}

	:target {
		animation: highlight-light 3s ease-in-out;
	}

	:global(.dark) :target {
		animation: highlight-dark 3s ease-in-out;
	}
</style>
