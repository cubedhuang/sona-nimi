<script lang="ts">
	import { fly } from 'svelte/transition';

	import type { LocalizedWord } from '@kulupu-linku/sona';

	import { page } from '$app/stores';

	import type { PageData } from './$types';

	import { outclick } from '$lib/actions/outclick';
	import {
		categoryTextColors,
		getUsageCategoryFromPercent,
		getWordDisplayRecognition,
		getWordLink,
		getWordTranslation
	} from '$lib/util';

	import AudioPlayer from './AudioPlayer.svelte';
	import Copy from '$lib/components/Copy.svelte';
	import ExternalLink from '$lib/components/icons/ExternalLink.svelte';
	import KuData from '$lib/components/KuData.svelte';
	import Link from '$lib/components/Link.svelte';
	import LipamankaData from '$lib/components/LipamankaData.svelte';
	import Wikipedia from '$lib/components/icons/Wikipedia.svelte';
	import WordEtymology from '$lib/components/WordEtymology.svelte';

	export let data: PageData;

	$: language = $page.params.language;
	$: word = data.word;

	$: translation = getWordTranslation(word, language);

	$: puData =
		word.pu_verbatim?.[language as keyof LocalizedWord['pu_verbatim']] ||
		word.pu_verbatim?.en;

	let showHistory = false;
</script>

<svelte:head>
	<title>{word.word} &ndash; nimi.li</title>

	<meta name="author" content="ilo Tani" />
	<meta name="description" content={translation.definition} />
	<meta
		name="keywords"
		content="toki pona, toki pona dictionary, dictionary, nimi, {word.word}"
	/>

	<meta property="og:title" content={word.word} />
	<meta property="og:author" content="ilo Tani" />
	<meta property="og:description" content={translation.definition} />
	<meta
		property="og:url"
		content="https://nimi.li{getWordLink(word.id, language)}"
	/>
	<meta
		property="og:image"
		content="https://sitelen.nimi.li/img/{word.word}.png"
	/>
	<meta property="og:site_name" content="nimi.li" />
	<meta property="og:type" content="website" />
</svelte:head>

<div class="flex flex-wrap items-center gap-2">
	<h1 class="mr-auto text-4xl">{word.word}</h1>

	<div class="flex gap-2">
		{#if word.resources?.sona_pona}
			<a
				href={word.resources.sona_pona}
				target="_blank"
				rel="noreferrer noopener"
				class="interactable p-2"
			>
				<Wikipedia />
			</a>
		{/if}

		<svelte:element
			this={data.previous ? 'a' : 'button'}
			href={data.previous
				? getWordLink(data.previous, language)
				: undefined}
			class="interactable p-2"
			disabled={!data.previous}
			aria-label="previous word"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="h-6 w-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
				/>
			</svg>
		</svelte:element>

		<svelte:element
			this={data.next ? 'a' : 'button'}
			href={data.next ? getWordLink(data.next, language) : undefined}
			class="interactable p-2"
			disabled={!data.next}
			aria-label="next word"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="h-6 w-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
				/>
			</svg>
		</svelte:element>

		<a
			href={word.usage_category === 'sandbox' ? '/sandbox' : '/'}
			class="interactable p-2"
			aria-label="home"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="h-6 w-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
				/>
			</svg>
		</a>
	</div>
</div>

{#if word.usage_category === 'obscure' || word.usage_category === 'sandbox'}
	<p class="mt-4">
		{#if word.usage_category === 'sandbox'}
			This word is in the
			<strong>sandbox</strong>, so almost no speakers will understand it.
		{:else}
			This word is
			<strong class={categoryTextColors.obscure}>obscure</strong>, so most
			speakers will not understand it.
		{/if}
	</p>
{/if}

<div class="mt-6 grid gap-6 sm:grid-cols-2">
	<div class="box">
		{#if word.deprecated}
			<p class="alert mb-4 p-4">
				This word is
				<strong>deprecated by its creator</strong>, and its use is
				discouraged.
			</p>
		{/if}

		<h2 class="text-lg">meaning</h2>
		<p class="mt-2">
			{translation.definition}
		</p>

		{#if word.see_also.length}
			<h2 class="mt-4 text-lg">see also</h2>

			<p class="mt-2">
				{#each word.see_also as other, i (other)}
					{#if i > 0},{/if}
					<Link href={getWordLink(other, language)}>{other}</Link>
				{/each}
			</p>
		{/if}

		{#if data.lipamanka}
			<div class="mt-4">
				<LipamankaData {word} content={data.lipamanka} />
			</div>
		{/if}

		{#if word.ku_data}
			<h2 class="mt-4 flex items-center text-lg">
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
			</h2>

			<p class="mt-2">
				<KuData data={word.ku_data} />
			</p>
		{/if}

		{#if puData}
			<h2 class="mt-4 text-lg">pu verbatim</h2>

			<div class="mt-2">
				{#each puData.split('\n') as line}
					{@const partOfSpeech = line.split(' ')[0]}
					{@const definition = line.slice(partOfSpeech.length + 1)}

					<p class="mt-1">
						<span class="shrink-0 text-sm text-muted-foreground"
							>{partOfSpeech}</span
						>
						{definition}
					</p>
				{/each}
			</div>
		{/if}
	</div>

	<div class="box">
		<h2 class="text-lg">usage</h2>

		<p class="relative mt-2 flex items-center">
			<span>
				<b class={categoryTextColors[word.usage_category]}>
					{word.usage_category} &middot; {getWordDisplayRecognition(
						word
					)}
				</b>
				<span class="text-muted-foreground">usage</span>
			</span>

			{#if Object.keys(word.usage).length}
				<button
					class="icon-interactable"
					on:click={() => (showHistory = !showHistory)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="h-5 w-5"
					>
						<path
							fill-rule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
			{/if}

			{#if showHistory && word.usage}
				{@const dates = Object.keys(word.usage).sort()}

				<div
					class="absolute left-0 top-full mt-1 flex gap-4 rounded-lg border bg-card p-4 shadow-lg"
					transition:fly|local={{ duration: 150, y: -4 }}
					use:outclick
					on:outclick={() => {
						// delay to make clicking on the button also close
						requestAnimationFrame(() => {
							showHistory = false;
						});
					}}
				>
					{#each dates as date (date)}
						{@const usage = Number(word.usage[date])}
						{@const usageCategory =
							getUsageCategoryFromPercent(usage)}

						<span class="flex flex-col">
							<b class={categoryTextColors[usageCategory]}>
								{usage}%
							</b>
							<span class="text-xs text-muted-foreground"
								>{date}</span
							>
						</span>
					{/each}
				</div>
			{/if}
		</p>

		<p class="mt-1">
			<span class="text-muted-foreground">found in</span>
			<strong>
				{word.book === 'none' ? 'no book' : word.book}
			</strong>
		</p>

		{#if word.coined_era}
			<p class="mt-1">
				<span class="text-muted-foreground">coined</span>
				<strong>
					{word.coined_era}
					{#if word.coined_year}
						&middot; {word.coined_year}
					{/if}
				</strong>
			</p>
		{/if}

		<h2 class="mt-4 text-lg">origin</h2>

		<div class="mt-2">
			<WordEtymology {word} {translation} />
		</div>

		{#if word.author_verbatim}
			<div class="mt-4 flex items-center gap-2">
				<h2 class="text-lg">author verbatim</h2>

				{#if word.author_verbatim_source}
					<a
						href={word.author_verbatim_source}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="source"
						class="text-muted-foreground transition hv:text-foreground"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							class="h-5 w-5"
						>
							<path
								fill-rule="evenodd"
								d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
								clip-rule="evenodd"
							/>
							<path
								fill-rule="evenodd"
								d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
								clip-rule="evenodd"
							/>
						</svg>
					</a>
				{/if}
			</div>

			{#each word.author_verbatim.split('\n') as line, i}
				<p class:mt-2={i === 0}>
					{line}
				</p>
			{/each}
		{/if}

		{#if translation.commentary}
			<h2 class="mt-4 text-lg">commentary</h2>
			<p class="mt-2">
				{translation.commentary}
			</p>
		{/if}
	</div>

	<div
		class:box={word.representations?.ligatures?.length ||
			word.representations?.ucsur}
	>
		{#if word.representations?.ligatures?.length}
			<h2 class="text-lg">sitelen pona</h2>

			<span class="mt-2 font-pona text-7xl">
				{word.representations.ligatures.join(' ')}
			</span>

			{#if translation.sp_etymology}
				<p class="mt-1 text-muted-foreground">
					{translation.sp_etymology}
				</p>
			{/if}
		{/if}

		{#if word.representations?.sitelen_sitelen}
			<h2 class="mt-4 text-lg">sitelen sitelen</h2>

			<img
				src={word.representations.sitelen_sitelen}
				alt="{word.word} sitelen sitelen"
				class="invertible mt-2 h-16 w-16"
			/>
		{/if}

		{#if word.representations?.sitelen_jelo}
			<h2 class="mt-4 text-lg">sitelen jelo</h2>

			<p class="mt-2 text-6xl">
				{word.representations.sitelen_jelo.join('')}
			</p>
		{/if}

		{#if word.representations?.sitelen_emosi}
			<h2 class="mt-4 text-lg">sitelen Emosi</h2>

			<p class="mt-2 text-6xl">
				{word.representations.sitelen_emosi}
			</p>
		{/if}

		{#if word.representations?.ucsur}
			<h2
				class="text-lg"
				class:mt-4={word.representations.ligatures?.length}
			>
				ucsur
			</h2>

			<p class="flex items-center gap-2">
				{word.representations.ucsur}

				<Copy
					value={String.fromCodePoint(
						parseInt(word.representations.ucsur?.slice(2) ?? '', 16)
					)}
				/>
			</p>
		{/if}
	</div>

	<div class:box={word.audio.length || data.lukaPona}>
		{#if word.audio.length}
			<h2 class="text-lg">audio</h2>

			{#each word.audio as audio}
				<p class="mt-2">
					<AudioPlayer {audio} />
				</p>
			{/each}
		{/if}

		{#if data.lukaPona?.video.mp4}
			<h2 class="text-lg" class:mt-4={word.audio}>luka pona</h2>

			<p class="mt-2">
				<video
					src={data.lukaPona.video.mp4}
					class="w-full max-w-sm rounded-lg"
					autoplay
					loop
					muted
					playsinline
				>
					<track kind="captions" />
				</video>
			</p>
			<p class="mt-2">
				{#if data.lukaPona.video.gif}
					<Link href={data.lukaPona.video.gif}>gif</Link>
					&middot;
				{/if}
				<Link href={data.lukaPona.video.mp4}>mp4</Link>
			</p>
		{/if}
	</div>
</div>

<style lang="postcss">
	.box {
		@apply rounded-lg border bg-card p-6;
	}
</style>
