<script lang="ts">
	import { onMount } from 'svelte';
	import type { SignVideo } from '@kulupu-linku/sona';

	import { browser } from '$app/environment';

	import { autoplay } from '$lib/stores';

	export let word: string;
	export let video: SignVideo;

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

	function handleLoaded() {
		if (!ctx) {
			ctx = canvas.getContext('2d');
		}

		canvas.width = img.width;
		canvas.height = img.height;
		ctx?.drawImage(img, 0, 0, img.width, img.height);
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
			handleLoaded();
		}
	});
</script>

<button
	class="text-left group outline-none focus-visible:outline-gray-500"
	id={word}
	on:click
	on:mouseenter={handleEnter}
	on:mouseleave={handleLeave}
	on:focus={handleEnter}
	on:blur={handleLeave}
	on:touchstart={handleEnter}
	on:touchend={handleLeave}
>
	<div class="relative">
		<canvas
			aria-hidden="true"
			bind:this={canvas}
			class="rounded-lg w-full aspect-video bg-gray-100 dark:bg-gray-900"
		/>

		<img
			src={video.gif}
			alt="{word} luka pona"
			class="absolute top-0 left-0 z-10 rounded-lg w-full aspect-video bg-gray-100 dark:bg-gray-900"
			class:opacity-0={!$autoplay}
			loading="lazy"
			bind:this={img}
			on:load|once={handleLoaded}
		/>
	</div>

	<b class="block mt-2 group-hover:text-blue-500 transition">
		{word}
	</b>
</button>
