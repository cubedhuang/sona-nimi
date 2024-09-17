<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type { Language } from '@kulupu-linku/sona';

	import { language } from '$lib/stores';
	import { sortLanguages } from '$lib/util';

	import Select from './Select.svelte';

	let dispatch = createEventDispatcher<{ select: string }>();

	export let languages: Record<string, Language>;
</script>

<Select
	name="Language"
	options={sortLanguages(languages).map(language => {
		return {
			label: language.name.endonym ?? language.name.en,
			value: language.id
		};
	})}
	value={$language}
	on:change={e => {
		// @ts-expect-error The type of e is only Event, not ChangeEvent
		const lang = e.target.value;

		dispatch('select', lang);
	}}
/>
