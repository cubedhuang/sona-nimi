<script lang="ts">
	import { flyAndScale } from '$lib/transitions';

	// ESLint doesn't recognize Svelte's generic types
	// eslint-disable-next-line no-undef
	type T = $$Generic;

	export let value: T | null;
	export let key: (value: T) => string;

	// This is a hack since the type of value is T | null even though it's
	// guaranteed to be non-null in the template.
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	$: nonNullValue = value!;
</script>

<svelte:window
	on:keydown={e => {
		if (e.key === 'Escape') value = null;
	}}
/>

{#if value}
	<div
		class="fixed bottom-0 right-0 z-20 w-full md:top-0 md:w-0"
		transition:flyAndScale|local={{ y: 16, start: 0.975 }}
	>
		{#key key(value)}
			<div
				transition:flyAndScale|local={{ y: 16, start: 0.975 }}
				class="absolute bottom-0 left-0 right-0 max-h-[75vh] overflow-y-auto border-t border-contrast bg-card p-6 shadow-lg
					md:bottom-4 md:left-auto md:right-4 md:max-h-[min(40rem,100vh-2rem)] md:w-[36rem] md:rounded-lg md:border"
			>
				<slot value={nonNullValue} />
			</div>
		{/key}
	</div>
{/if}
