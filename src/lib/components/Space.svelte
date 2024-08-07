<script lang="ts">
	export let id: string | undefined;
</script>

<button
	on:click
	{id}
	class="interactable relative flex w-full flex-col items-stretch overflow-hidden p-4 text-left transition hover:scale-[1.02]"
>
	<slot />
</button>
