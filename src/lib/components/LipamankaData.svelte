<script lang="ts">
	import type { Word } from '$lib/types';
	import type { Action } from 'svelte/action';

	import ExternalLink from './icons/ExternalLink.svelte';

	export let word: Word;

	$: href =
		word.word === 'mije' || word.word === 'meli'
			? 'https://lipamanka.gay/essays/dictionary#mije and meli'
			: `https://lipamanka.gay/essays/dictionary#${word.word}`;

	const fixLinks: Action<HTMLDivElement> = node => {
		const update = () => {
			for (const a of node.getElementsByTagName('a')) {
				const href = a.getAttribute('href')!;

				if (href.startsWith('/')) {
					a.href = 'https://lipamanka.gay' + href;
				}

				a.target = '_blank';
				a.rel = 'noopener noreferrer';
			}

			for (const button of node.getElementsByTagName('button')) {
				button.classList.add('interactable');
			}
		};

		update();

		return { update };
	};
</script>

<h3 class="text-lg flex items-center">
	semantic space &middot; lipamanka

	<a
		class="icon-interactable"
		{href}
		target="_blank"
		rel="noopener noreferrer"
		aria-label="source"
	>
		<ExternalLink />
	</a>
</h3>

<div class="lipamanka text-sm grid" use:fixLinks>
	{@html word.lipamanka}
</div>

<style lang="postcss">
	:global(.lipamanka a) {
		@apply text-blue-500 hocus-visible:text-blue-600 transition-colors outline-none outline-offset-4 focus-visible:outline-current rounded;
	}

	:global(.lipamanka p:not(:last-child)) {
		@apply mb-2;
	}

	:global(.lipamanka p) {
		@apply leading-relaxed;
	}

	:global(.lipamanka button) {
		@apply my-2 py-1 px-2 w-fit;
	}
</style>
