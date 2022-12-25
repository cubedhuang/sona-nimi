<script lang="ts">
	import '../app.css';

	import { fly } from 'svelte/transition';

	import { page } from '$app/stores';
	import { darkMode } from '$lib/stores';

	const routes = [
		{ name: 'vocabulary', href: '/' },
		{ name: 'compounds', href: '/compounds' },
		{ name: 'about', href: '/about' }
	];

	const commonClasses =
		'p-2 rounded-b-lg border border-t-0 border-gray-200 dark:border-gray-800 transition-colors';
	const hoverableClasses =
		'focus:outline-none hocus:border-gray-400 dark:hocus:border-gray-700';

	let opened = false;
</script>

<svelte:window
	on:click={() => {
		opened = false;
	}}
	on:touchstart|passive={() => {
		opened = false;
	}}
/>

<div class="px-8 lg:px-16 max-w-screen-2xl m-auto font-text">
	<nav class="flex flex-wrap gap-2 pt-0">
		<div class="hidden sm:contents">
			{#each routes as route}
				{#if $page.url.pathname === route.href}
					<span class="{commonClasses} faded cursor-default">
						{route.name}
					</span>
				{:else}
					<a href={route.href} class="{commonClasses} {hoverableClasses}">
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
					transition:fly={{ y: 12, duration: 300 }}
					class="absolute top-full mt-2 flex flex-col bg-white border border-gray-200 divide-y divide-gray-200 rounded-lg shadow-lg
						dark:bg-black dark:border-gray-800 dark:divide-gray-800"
				>
					{#each routes as route}
						{#if $page.url.pathname === route.href}
							<span class="p-2 faded cursor-default">
								{route.name}
							</span>
						{:else}
							<a href={route.href} class="p-2">
								{route.name}
							</a>
						{/if}
					{/each}
				</div>
			{/if}
		</div>

		<label class="{commonClasses} {hoverableClasses} ml-auto cursor-pointer">
			<input type="checkbox" class="hidden" bind:checked={$darkMode} />

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
		</label>
	</nav>

	<div class="pt-4 sm:pt-8 pb-24">
		<slot />
	</div>
</div>
