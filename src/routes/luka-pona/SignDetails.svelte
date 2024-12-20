<script lang="ts">
	import type { LocalizedSign, LocalizedWord } from '@kulupu-linku/sona';

	import { language } from '$lib/stores';
	import { getWordLink, getTranslation } from '$lib/util';

	import Details from '$lib/components/Details.svelte';
	import Wikipedia from '$lib/components/icons/Wikipedia.svelte';
	import XMark from '$lib/components/icons/XMark.svelte';

	interface Props {
		word: LocalizedWord | null;
		signs: LocalizedSign[];
	}

	let { word: possibleWord = $bindable(), signs }: Props = $props();
</script>

<Details bind:value={possibleWord} key={word => word.id} padding={false}>
	{#snippet children(word)}
		{@const translation = getTranslation(word, $language)}

		<video
			src={signs[0].video.mp4}
			class="aspect-video w-full bg-secondary"
			autoplay
			loop
			muted
			playsinline
		>
			<track kind="captions" />
		</video>

		<div class="p-6">
			<div class="flex items-end">
				<h2 class="text-2xl">{word.word.toUpperCase()}</h2>

				<div class="ml-auto flex items-center gap-2">
					<a
						href={getWordLink(word.id, $language)}
						class="interactable px-2 py-1"
					>
						more
					</a>

					{#if word.resources?.sona_pona}
						<a
							href={word.resources.sona_pona}
							target="_blank"
							rel="noreferrer noopener"
							class="interactable p-1"
						>
							<Wikipedia />
						</a>
					{/if}

					<button
						class="interactable p-1"
						onclick={() => {
							possibleWord = null;
						}}
						aria-label="close popup"
					>
						<XMark />
					</button>
				</div>
			</div>

			<p class="mt-2">
				{translation.definition}
			</p>

			{#each signs as sign}
				{@const translation = getTranslation(sign, $language)}
				{@const parameters = [
					translation.parameters.handshape,
					translation.parameters.movement,
					translation.parameters.placement,
					translation.parameters.orientation
				].filter(Boolean)}

				<div class="mt-4">
					<h3 class="text-lg">{sign.new_gloss}</h3>

					<p>
						<i>{translation.icons}</i>
					</p>

					<p>
						{sign.is_two_handed ? 'two-handed' : 'one-handed'}
						&middot; {parameters.join(' · ')}
					</p>

					{#each sign.etymology as etymology}
						<p class="text-muted">
							{etymology.language}
							{#if etymology.sign}
								&middot; {etymology.sign}
							{/if}
						</p>
					{/each}
				</div>
			{/each}
		</div>
	{/snippet}
</Details>
