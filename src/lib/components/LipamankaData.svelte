<script lang="ts">
	import type { Word } from '$lib/types';
	import type { Action } from 'svelte/action';

	export let word: Word;

	let expanded = false;

	$: href =
		word.word === 'mije' || word.word === 'meli'
			? 'https://lipamanka.gay/essays/dictionary#mije and meli'
			: `https://lipamanka.gay/essays/dictionary#${word.word}`;

	const fixLinks: Action<HTMLDivElement> = node => {
		const update = () => {
			for (const a of [...node.getElementsByTagName('a')]) {
				const href = a.getAttribute('href')!;

				if (href.startsWith('/')) {
					a.href = 'https://lipamanka.gay' + href;
				}

				a.target = '_blank';
				a.rel = 'noopener noreferrer';
			}
		};

		update();

		return { update };
	};
</script>

<h3 class="text-lg flex items-center">
	semantic space &middot; lipamanka

	<a
		class="p-1 ml-1 -m-1 faded hocus-visible:text-gray-800 dark:hocus-visible:text-white transition"
		{href}
		target="_blank"
		rel="noopener noreferrer"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			fill="currentColor"
			class="w-5 h-5"
		>
			<path
				fill-rule="evenodd"
				d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z"
				clip-rule="evenodd"
			/>
			<path
				fill-rule="evenodd"
				d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z"
				clip-rule="evenodd"
			/>
		</svg>
	</a>
</h3>

<div class="lipamanka text-sm grid gap-2" use:fixLinks>
	{@html word.lipamanka}
</div>

<style lang="postcss">
	:global(.lipamanka a) {
		@apply text-blue-500 hocus-visible:text-blue-600 transition-colors outline-none outline-offset-4 focus-visible:outline-current rounded;
	}
</style>
