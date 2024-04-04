<script lang="ts">
	import '../app.postcss';

	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	import NProgress from 'nprogress';

	import { page } from '$app/stores';
	import { dev } from '$app/environment';
	import { afterNavigate, beforeNavigate } from '$app/navigation';

	import { darkMode, screenWidth } from '$lib/stores';

	const routes = [
		{ name: 'dictionary', href: '/' },
		{ name: 'luka pona', href: '/luka-pona' },
		{ name: 'ilo ku', href: '/ilo-ku' },
		{ name: 'sandbox', href: '/sandbox' },
		{ name: 'about', href: '/about' }
	];

	const commonClasses =
		'p-2 rounded-lg sm:rounded-t-none border sm:border-t-0 border-gray-200 dark:border-gray-800 transition-colors';
	const hoverableClasses =
		'outline-none focus-visible:outline-gray-500 hv:border-gray-400 dark:hv:border-gray-700';

	let opened = false;

	// ESLint doesn't recognize NodeJS.Timeout
	// eslint-disable-next-line no-undef
	let nProgressTimeout: NodeJS.Timeout;

	// disable smooth scroll on navigation
	beforeNavigate(() => {
		document.documentElement.style.scrollBehavior = 'auto';

		clearTimeout(nProgressTimeout);

		nProgressTimeout = setTimeout(() => {
			NProgress.start();
		}, 150);
	});
	afterNavigate(() => {
		document.documentElement.style.scrollBehavior = 'smooth';

		clearTimeout(nProgressTimeout);
		NProgress.done();
	});

	// BeforeInstallPromptEvent doesn't have a type definition :(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let deferredPrompt: Event & any;

	onMount(() => {
		window.addEventListener('beforeinstallprompt', e => {
			e.preventDefault();
			deferredPrompt = e;
		});

		if (dev) {
			// simulate deferred prompt
			setTimeout(() => {
				deferredPrompt = true;
			}, 500);
		}

		NProgress.configure({
			showSpinner: false
		});
	});
</script>

<svelte:window
	on:click={() => {
		opened = false;
	}}
	on:touchstart|passive={() => {
		opened = false;
	}}
/>

<div
	class="px-4 sm:px-8 lg:px-16 m-auto"
	class:max-w-screen-xl={$screenWidth === 'large'}
>
	<nav class="pt-4 sm:pt-0 flex justify-between">
		<div class="hidden sm:flex gap-2">
			{#each routes as route}
				{#if $page.url.pathname === route.href}
					<span class="{commonClasses} faded cursor-default">
						{route.name}
					</span>
				{:else}
					<a
						href={route.href}
						class="{commonClasses} {hoverableClasses}"
					>
						{route.name}
					</a>
				{/if}
			{/each}
		</div>

		<div class="relative sm:hidden">
			<button
				on:click|stopPropagation={() => {
					opened = !opened;
				}}
				on:touchstart|passive|stopPropagation
				class="{commonClasses} {hoverableClasses} cursor-pointer"
				aria-label="open navigation"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-6 h-6"
				>
					<path
						fill-rule="evenodd"
						d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>

			{#if opened}
				<div
					transition:fly={{ y: 4, duration: 300 }}
					class="z-10 absolute top-full mt-2 flex flex-col bg-white border border-gray-200 divide-y divide-gray-200 rounded-lg shadow-lg
						dark:bg-black dark:border-gray-800 dark:divide-gray-800"
				>
					{#each routes as route}
						{#if $page.url.pathname === route.href}
							<span class="p-2 faded cursor-default">
								{route.name}
							</span>
						{:else}
							<a
								href={route.href}
								class="p-2"
								on:click|stopPropagation
								on:touchstart|passive|stopPropagation
							>
								{route.name}
							</a>
						{/if}
					{/each}
				</div>
			{/if}
		</div>

		<div class="flex gap-2">
			{#if deferredPrompt}
				<button
					on:click={() => {
						deferredPrompt.prompt();
					}}
					transition:fly={{ y: -4, duration: 300 }}
					class="{commonClasses} {hoverableClasses}"
					aria-label="install as app"
				>
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
							d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
						/>
					</svg>
				</button>
			{/if}

			<button
				class="max-xl:hidden {commonClasses} {hoverableClasses} cursor-pointer"
				on:click={() => {
					if ($screenWidth === 'full') {
						$screenWidth = 'large';
					} else {
						$screenWidth = 'full';
					}
				}}
				role="checkbox"
				aria-checked={$screenWidth === 'full'}
				aria-label="toggle full width"
			>
				{#if $screenWidth === 'large'}
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
							d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
						/>
					</svg>
				{:else}
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
							d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
						/>
					</svg>
				{/if}
			</button>

			<button
				class="{commonClasses} {hoverableClasses} cursor-pointer"
				on:click={() => ($darkMode = !$darkMode)}
				role="checkbox"
				aria-checked={$darkMode}
				aria-label="toggle dark mode"
			>
				{#if $darkMode}
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
							d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
						/>
					</svg>
				{:else}
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
							d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
						/>
					</svg>
				{/if}
			</button>
		</div>
	</nav>

	<main class="pt-4 sm:pt-8 pb-24">
		<slot />
	</main>
</div>

<style lang="postcss">
	:global(#nprogress) {
		pointer-events: none;
	}

	:global(#nprogress .bar) {
		@apply fixed top-0 left-0 w-full h-0.5 bg-blue-500 z-50;
	}

	:global(#nprogress .peg) {
		@apply block absolute right-0 w-24 h-full opacity-100;

		box-shadow:
			0 0 theme(width.2) theme(colors.blue.500),
			0 0 theme(width.1) theme(colors.blue.500);
		transform: rotate(3deg) translate(0px, -4px);
	}
</style>
