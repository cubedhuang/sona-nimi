<script lang="ts">
	import { page } from '$app/stores';
	import { exclude_internal_props } from 'svelte/internal';
	import { darkMode, sitelenMode } from '$lib/stores';
</script>


<svelte:head>
	<title>Danger Zone</title>
</svelte:head>

<div class="py-8 sm:py-16 md:py-24">
	<h1 class="text-6xl text-orange-500 dark:text-orange-400">
		{#if $darkMode}
			Beware.
		{:else}
			Welcome Back.
		{/if}
	</h1>

	<p class="mt-4">
		Ahead lies the controls for changing the theme of this website.
		<br>
		{#if $darkMode}
			Switching to light mode will most certainly result in your eyes' untimely demise.
			<br>
			Proceed with extreme caution.
		{:else}
			Welcome back to the dark side, my friend.
			<br>
			Prepare to embrace darkness once more.
		{/if}
		<br><br>
	</p>

	<p class="mt-6">
		<label class="inline-block px-2 py-1 interactable">
			<input type="checkbox" class="hidden" bind:checked={$darkMode} />
			{#if $darkMode}
				I understand the risks and wish to proceed!
			{:else}
				Back to safety!
			{/if}
		</label>
	</p>
</div>
