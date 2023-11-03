<script lang="ts">
	import type { PageData } from './$types';

	import {
		categoryTextColors,
		getWordDefinition,
		getWordDisplayRecognition
	} from '$lib/util';
	import { language } from '$lib/stores';

	import AudioPlayer from './AudioPlayer.svelte';
	import Collapsible from '$lib/components/Collapsible.svelte';
	import Copy from '$lib/components/Copy.svelte';
	import Link from '$lib/components/Link.svelte';

	export let data: PageData;

	$: word = data;

	$: puData = word.pu_verbatim?.[$language] || word.pu_verbatim?.['en'];
</script>

<svelte:head>
	<title>{word.word} &ndash; nimi.li</title>

	<meta name="author" content="jan Tani" />
	<meta name="description" content={word.def.en} />
	<meta
		name="keywords"
		content="toki pona, toki pona dictionary, dictionary, nimi, {word.word}"
	/>

	<meta property="og:title" content={word.word} />
	<meta property="og:author" content="jan Tani" />
	<meta property="og:description" content={word.def.en} />
	<meta property="og:url" content="https://nimi.li/{word.word}" />
	<meta
		property="og:image"
		content="https://sitelen.nimi.li/img/{word.word}.png"
	/>
	<meta property="og:site_name" content="nimi.li" />
	<meta property="og:type" content="website" />
</svelte:head>

{#if word}
	<div class="mt-6 flex items-center gap-2 justify-between">
		<h1 class="text-4xl">{word.word}</h1>

		<a href="/" class="inline-block p-2 interactable" aria-label="home">
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
					d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
				/>
			</svg>
		</a>
	</div>

	<div class="grid sm:grid-cols-2 mt-6 gap-6">
		<div class="box">
			<h2 class="text-lg">meaning</h2>
			<p class="mt-2">
				{getWordDefinition(word, $language)}
			</p>

			{#if word.see_also}
				<h2 class="mt-4 text-lg">see also</h2>

				{@const words = word.see_also.split(', ')}

				<p class="mt-2">
					{#each words as other, i (other)}
						<!-- Formatting here is weird to prevent additional spaces between commas -->
						<Link href="/{other}">{other}</Link
						>{#if i < words.length - 1}{', '}{/if}
					{/each}
				</p>
			{/if}

			{#if word.ku_data}
				<h2 class="mt-4 text-lg">lipu ku translations</h2>
				<p class="mt-2">
					<Collapsible content={word.ku_data} length={250} />
				</p>
			{/if}

			{#if puData}
				<h2 class="mt-4 text-lg">pu verbatim</h2>

				<div class="mt-2">
					{#each puData.split('\n') as line}
						{@const partOfSpeech = line.split(' ')[0]}
						{@const definition = line.slice(partOfSpeech.length + 1)}

						<p class="mt-1">
							<span class="faded shrink-0">{partOfSpeech}</span>
							{definition}
						</p>
					{/each}
				</div>
			{/if}
		</div>

		<div class="box">
			<h2 class="text-lg">usage</h2>

			<p class="mt-2 flex flex-col gap-1">
				<span>
					<b class={categoryTextColors[word.usage_category]}>
						{word.usage_category} &middot; {getWordDisplayRecognition(word)}
					</b>
					<span class="faded">usage</span>
				</span>

				<span>
					<span class="faded">found in</span>
					<b>
						{word.book}
					</b>
				</span>

				{#if word.coined_era}
					<span>
						<span class="faded">coined</span>
						<b>
							{word.coined_era}
							{#if word.coined_year}
								({word.coined_year})
							{/if}
						</b>
					</span>
				{/if}
			</p>

			{#if word.creator || word.etymology}
				<h2 class="mt-4 text-lg">origin</h2>

				<p class="mt-2">
					{#if word.etymology}
						{word.source_language}
						<span class="faded">
							&middot;
							{word.etymology}
						</span>
					{:else}
						a priori
					{/if}
				</p>

				{#if word.creator}
					<p class="mt-1">
						<span class="faded">by</span>
						{word.creator}
					</p>
				{/if}
			{/if}

			{#if word.commentary}
				<h2 class="mt-4 text-lg">commentary</h2>
				<p class="mt-2">
					{word.commentary}
				</p>
			{/if}
		</div>

		<div class:box={word.sitelen_pona || word.ucsur}>
			{#if word.sitelen_pona}
				<h2 class="text-lg">sitelen pona</h2>

				<span class="mt-2 font-medium font-pona text-7xl">
					{word.sitelen_pona}
				</span>

				{#if word.sitelen_pona_etymology}
					<p class="mt-1 faded">
						{word.sitelen_pona_etymology}
					</p>
				{/if}
			{/if}

			{#if word.sitelen_sitelen}
				<h2 class="mt-4 text-lg">sitelen sitelen</h2>

				<img
					src={word.sitelen_sitelen}
					alt="{word.word} sitelen sitelen"
					class="mt-2 w-16 h-16 dark:invert"
				/>
			{/if}

			{#if word.sitelen_emosi}
				<h2 class="mt-4 text-lg">sitelen Emosi</h2>

				<p class="mt-2 text-6xl">
					{word.sitelen_emosi}
				</p>
			{/if}

			{#if word.ucsur}
				<h2 class="text-lg" class:mt-4={word.sitelen_pona}>ucsur</h2>

				<p class="flex items-center gap-2">
					{word.ucsur}

					<Copy
						value={String.fromCodePoint(
							parseInt(word.ucsur?.slice(2) ?? '', 16)
						)}
					/>
				</p>
			{/if}
		</div>

		<div class:box={word.audio || word.luka_pona}>
			{#if word.audio}
				{@const audios = Object.entries(word.audio)}

				<h2 class="text-lg">audio</h2>

				{#each audios as [name, src]}
					<p class="mt-2">
						<AudioPlayer {name} {src} />
					</p>
				{/each}
			{/if}

			{#if word.luka_pona}
				<h2 class="text-lg" class:mt-4={word.audio}>luka pona</h2>

				<p class="mt-2">
					<img
						src={word.luka_pona.gif}
						alt="luka pona for {word.word}"
						class="rounded-lg"
					/>
				</p>
				<p class="mt-2">
					<Link href={word.luka_pona.gif}>gif</Link>
					&middot;
					<Link href={word.luka_pona.mp4}>mp4</Link>
				</p>
			{/if}
		</div>
	</div>
{/if}

<style lang="postcss">
	.box {
		@apply p-6 border border-gray-200 dark:border-gray-800 rounded-lg;
	}
</style>
