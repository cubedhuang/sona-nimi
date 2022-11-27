<script lang="ts">
	import { page } from '$app/stores';

	const routes = [
		{ name: 'vocabulary', href: '/' },
		{ name: 'compounds', href: '/compounds' },
		{ name: 'about', href: '/about' }
	];

	const commonClasses =
		'p-2 rounded-b-lg border border-t-0 border-gray-200 dark:border-gray-800 transition-colors';
</script>

<nav class="absolute top-0 flex gap-2">
	{#each routes as route}
		{#if $page.url.pathname === route.href}
			<span
				class="{commonClasses} text-gray-500 dark:text-gray-400 cursor-default"
			>
				{route.name}
			</span>
		{:else}
			<a
				href={route.href}
				class="{commonClasses} focus:outline-none hocus:border-gray-400 dark:hocus:border-gray-700"
			>
				{route.name}
			</a>
		{/if}
	{/each}
</nav>
