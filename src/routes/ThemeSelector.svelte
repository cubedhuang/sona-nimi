<script lang="ts">
	import { fly } from 'svelte/transition';

	import { theme } from '$lib/stores';

	const options = [
		{ value: 'system' },
		{ value: 'light' },
		{ value: 'dark' }
	] as const;

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

<div class="relative">
	<button
		on:click|stopPropagation={() => {
			opened = !opened;
		}}
		on:touchstart|passive|stopPropagation
		class="nav-item-interactive cursor-pointer"
		role="listbox"
		aria-label="set theme"
	>
		{#if $theme === 'light'}
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
		{:else if $theme === 'dark'}
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
					d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
				/>
			</svg>
		{/if}
	</button>

	{#if opened}
		<div
			transition:fly={{ y: 4, duration: 300 }}
			class="z-10 absolute top-full right-0 mt-2 flex flex-col bg-white border border-gray-200 divide-y divide-gray-200 rounded-lg shadow-lg
				dark:bg-black dark:border-gray-800 dark:divide-gray-800"
		>
			{#each options as option}
				{#if $theme === option.value}
					<span
						class="p-2 faded cursor-default"
						role="option"
						aria-selected="true"
						aria-disabled="true"
					>
						{option.value}
					</span>
				{:else}
					<button
						class="p-2 text-left"
						on:click|stopPropagation
						on:touchstart|passive|stopPropagation
						on:click={() => {
							$theme = option.value;
						}}
						role="option"
						aria-selected="false"
					>
						{option.value}
					</button>
				{/if}
			{/each}
		</div>
	{/if}
</div>
