<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	const { children, ...props }: HTMLButtonAttributes = $props();
</script>

<button
	class="interactable relative flex w-full flex-col items-stretch overflow-hidden p-4 text-left transition hover:scale-[1.02]"
	{...props}
>
	{@render children?.()}
</button>
