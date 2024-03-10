<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { LocalizedWord } from '@kulupu-linku/sona';

	import { language } from '$lib/stores';
	import {
		categoryColors,
		categoryTextColors,
		getWordDisplayRecognition,
		getWordLink,
		getWordTranslation
	} from '$lib/util';

	import Copy from '$lib/components/Copy.svelte';
	import Details from '$lib/components/Details.svelte';
	import ExternalLink from '$lib/components/icons/ExternalLink.svelte';
	import KuData from './KuData.svelte';
	import Link from '$lib/components/Link.svelte';
	import LipamankaData from '$lib/components/LipamankaData.svelte';
	import WordEtymology from './WordEtymology.svelte';
	import XMark from '$lib/components/icons/XMark.svelte';

	const dispatch = createEventDispatcher<{
		refer: string;
	}>();

	let possibleWord: LocalizedWord | null;
	export { possibleWord as word };

	export let lipamanka: string | undefined = undefined;

	let audio: HTMLAudioElement | null = null;

	function play() {
		audio?.play();
	}

	$: audioUrl = possibleWord?.audio[0]?.link;
</script>

<Details bind:value={possibleWord} key={word => word.id} let:value={word}>
	{@const translation = getWordTranslation(word, $language)}

	<div class="flex items-end">
		<h2 class="text-2xl">{word.word}</h2>

		<div class="ml-auto flex items-center gap-2">
			<a
				href={getWordLink(word.id, $language)}
				class="px-2 py-1 interactable"
			>
				more
			</a>

			{#if audioUrl}
				<audio src={audioUrl} bind:this={audio} />

				<button class="p-1 interactable" on:click={play}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
						/>
					</svg>
				</button>
			{/if}

			<button
				class="p-1 interactable"
				on:click={() => {
					possibleWord = null;
				}}
				aria-label="close popup"
			>
				<XMark />
			</button>
		</div>
	</div>

	<p class="faded">
		{word.usage_category} &middot;
		{getWordDisplayRecognition(word)}
		{#if word.book !== 'none'}
			&middot; {word.book}
		{/if}
		{#if word.coined_year}
			&middot; {word.coined_year}
		{/if}
	</p>

	{#if word.usage_category === 'obscure' || word.usage_category === 'sandbox'}
		<p class="mt-2 faded text-sm">
			This word is
			{#if word.usage_category === 'sandbox'}
				in the
				<b class={categoryTextColors.sandbox}>sandbox</b>,
			{:else}
				<b class={categoryTextColors.obscure}>obscure</b>,
			{/if}
			so most speakers will not understand it.
		</p>
	{/if}

	{#if word.deprecated}
		<p class="my-4 p-4 alert">
			This word is
			<b>deprecated by its creator</b>, and its use is discouraged.
		</p>
	{/if}

	<p class="mt-2">
		{translation.definition}
	</p>

	{#if word.see_also.length}
		<p class="mt-2">
			see
			{#each word.see_also as other, i (other)}
				<!-- Formatting here is weird to prevent additional spaces between commas -->
				{i !== 0 ? ',' : ''}
				<Link
					href="#{other}"
					on:click={() => {
						dispatch('refer', other);
					}}>{other}</Link
				>
			{/each}
		</p>
	{/if}

	{#if lipamanka}
		<div class="mt-2">
			<LipamankaData {word} content={lipamanka} />
		</div>
	{/if}

	{#if word.ku_data}
		<h3 class="mt-2 text-lg flex items-center">
			ku translations

			<a
				class="icon-interactable"
				href="https://tokipona.org/nimi_pu.txt"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="source"
			>
				<ExternalLink />
			</a>
		</h3>

		<p>
			<KuData data={word.ku_data} />
		</p>
	{/if}

	<h3 class="mt-2 text-lg">origin</h3>

	<WordEtymology {word} {translation} />

	{#if word.representations?.ligatures?.length}
		<h3 class="mt-2 text-lg">sitelen pona</h3>

		<span class="font-pona text-4xl">
			{word.representations.ligatures.join(' ')}
		</span>

		{#if translation.sp_etymology}
			<p class="faded">
				{translation.sp_etymology}
			</p>
		{/if}
	{/if}

	{#if word.representations?.sitelen_sitelen}
		<h3 class="mt-2 text-lg">sitelen sitelen</h3>

		<img
			src={word.representations.sitelen_sitelen}
			alt="{word.word} sitelen sitelen"
			class="w-10 h-10 dark:invert"
		/>
	{/if}

	{#if word.representations?.sitelen_jelo}
		<h3 class="mt-2 text-lg">sitelen jelo</h3>

		<p class="text-3xl">
			{word.representations.sitelen_jelo.join('')}
		</p>
	{/if}

	{#if word.representations?.ucsur}
		<h3 class="mt-2 text-lg">ucsur</h3>

		<p class="flex items-center gap-2">
			{word.representations.ucsur}

			<Copy
				value={String.fromCodePoint(
					parseInt(word.representations.ucsur?.slice(2) ?? '', 16)
				)}
			/>
		</p>
	{/if}

	{#if translation.commentary}
		<p class="mt-2 faded">
			{translation.commentary}
		</p>
	{/if}

	<span
		class="absolute -top-4 -left-4 p-4 rounded-full {categoryColors[
			word.usage_category
		]}"
	/>
</Details>
