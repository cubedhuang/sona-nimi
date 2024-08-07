<script lang="ts">
	import { font, type Font } from '$lib/stores';

	export let value: Font;
	export let name: string;

	$: selected = value === $font;
</script>

<button
	class="interactable max-w-full px-4 py-1 transition-colors {value}
		{selected
		? 'ring-2 ring-secondary-foreground ring-offset-2 ring-offset-card'
		: ''}"
	on:click|stopPropagation
	on:touchstart|passive|stopPropagation
	on:click={() => {
		$font = value;
	}}
	role="option"
	aria-selected="false"
>
	{name}
</button>
