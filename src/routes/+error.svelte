<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>pakala &ndash; {$page.status}</title>
</svelte:head>

<div
	class="flex flex-col py-8 sm:py-16 md:py-24 items-center justify-center text-center"
>
	<h1 class="text-6xl text-orange-400">pakala nanpa {$page.status}!</h1>

	<p class="mt-4 text-lg">
		{#if $page.status === 404}
			lipu ni li lon ala.
		{:else}
			ijo mi li pakala!
		{/if}
	</p>

	<p>
		<a
			href="/"
			class="inline-block mt-4 px-4 py-2 text-lg border border-gray-200 hocus:border-gray-400 rounded-lg transition-colors
				dark:border-gray-800 dark:hocus:border-gray-600"
		>
			o tawa e lipu suli
		</a>
	</p>
</div>
