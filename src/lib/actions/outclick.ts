import type { Action } from 'svelte/action';

export const outclick: Action<
	HTMLElement,
	undefined,
	{ onoutclick: () => void }
> = node => {
	const handleClick = (event: MouseEvent) => {
		if (!node.contains(event.target as Node)) {
			node.dispatchEvent(new CustomEvent('outclick'));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};
