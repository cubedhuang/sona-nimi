<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	import type { Word } from '$lib/types';
	import { autoplay } from '$lib/stores';

	export let word: Word;

	let container: HTMLButtonElement;
	let img: HTMLImageElement;
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null = null;

	if (browser) {
		autoplay.subscribe(value => {
			if (img && value) {
				img.setAttribute('src', img.src);
			}
		});
	}

	function onload(e: Event | HTMLElement) {
		if (!ctx) {
			ctx = canvas.getContext('2d');
		}

		canvas.width = img.width;
		canvas.height = img.height;
		ctx?.drawImage(img, 0, 0, img.width, img.height);

		const element = 'target' in e ? e.target : e;

		element?.removeEventListener('load', onload);
	}

	function handleEnter() {
		if ($autoplay) {
			return;
		}

		// reset animation
		img.setAttribute('src', img.src);
		img.classList.remove('opacity-0');
	}

	function handleLeave() {
		if ($autoplay) {
			return;
		}

		img.classList.add('opacity-0');
	}

	onMount(() => {
		if (img.complete) {
			onload(img);
		}

		container.addEventListener('mouseenter', handleEnter);
		container.addEventListener('mouseleave', handleLeave);
		container.addEventListener('focus', handleEnter);
		container.addEventListener('blur', handleLeave);
		container.addEventListener('touchstart', handleEnter, {
			passive: true
		});
		container.addEventListener('touchend', handleLeave, {
			passive: true
		});
	});
</script>

<button
	class="text-left group outline-none focus-visible:outline-gray-500"
	on:click
	id={word.id}
	bind:this={container}
>
	{#if word.luka_pona?.gif}
		<div class="relative">
			<canvas
				aria-hidden="true"
				bind:this={canvas}
				class="rounded-lg w-full aspect-video bg-gray-100 dark:bg-gray-900"
			/>

			<img
				src={word.luka_pona?.gif}
				alt="{word.word} luka pona"
				class="absolute top-0 left-0 z-10 rounded-lg w-full aspect-video bg-gray-100 dark:bg-gray-900"
				class:opacity-0={!$autoplay}
				loading="lazy"
				bind:this={img}
				on:load={onload}
			/>
		</div>
	{/if}

	<b class="block mt-2 group-hover:text-blue-500 transition">
		{word.word}
	</b>
</button>
