<script lang="ts">
	import { flyAndScale } from '$lib/transitions';
	import ThemeOption from './ThemeOption.svelte';

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
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="size-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z"
			/>
		</svg>
	</button>

	{#if opened}
		<div
			transition:flyAndScale={{ x: 2, y: -4 }}
			class="absolute right-0 top-full z-10 mt-2 grid w-max grid-cols-3 gap-3 rounded-lg border bg-card p-4 shadow-lg"
		>
			<ThemeOption
				value="system"
				class="bg-white text-gray-950 dark:bg-black dark:text-gray-50"
			/>
			<ThemeOption value="light" class="bg-white text-gray-950" />
			<ThemeOption value="orange" class="bg-orange-100 text-zinc-950" />
			<ThemeOption value="dark" class="bg-black text-gray-50" />
			<ThemeOption value="dim" class="bg-gray-800 text-gray-50" />
			<ThemeOption value="warm" class="bg-stone-800 text-stone-50" />
		</div>
	{/if}
</div>
