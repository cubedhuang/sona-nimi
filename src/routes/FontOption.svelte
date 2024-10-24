<script lang="ts">
	import {
		createBubbler,
		stopPropagation,
		handlers,
		passive
	} from 'svelte/legacy';

	const bubble = createBubbler();
	import { font, type Font } from '$lib/stores';

	interface Props {
		value: Font;
		name: string;
	}

	const { value, name }: Props = $props();

	const selected = $derived(value === $font);
</script>

<button
	class="interactable max-w-full px-4 py-1 transition-colors {value}
		{selected
		? 'ring-2 ring-secondary-foreground ring-offset-2 ring-offset-card'
		: ''}"
	onclick={handlers(stopPropagation(bubble('click')), () => {
		$font = value;
	})}
	use:passive={['touchstart', () => stopPropagation(bubble('touchstart'))]}
	role="option"
	aria-selected="false"
>
	{name}
</button>
