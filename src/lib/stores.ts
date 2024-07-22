import { writable, type Writable } from 'svelte/store';

import { browser } from '$app/environment';

import { usageCategories } from './util';
import type { UsageCategory } from '@kulupu-linku/sona/utils';

function persisted<T>(
	key: string,
	initialValue: T,
	validator?: (value: T) => boolean
): Writable<T> {
	const { subscribe, set, update } = writable(initialValue);

	if (browser) {
		const json = localStorage.getItem(key);

		if (json !== null) {
			let parsed: T | null;

			try {
				parsed = JSON.parse(json);
			} catch {
				parsed = null;
			}

			if (parsed !== null && (!validator || validator(parsed))) {
				set(parsed);
			}
		}
	}

	return {
		subscribe,
		set(value: T) {
			if (browser) {
				localStorage.setItem(key, JSON.stringify(value));
			}
			set(value);
		},
		update
	};
}

export const theme = persisted<'system' | 'dark' | 'light'>(
	'theme',
	'system',
	value => ['system', 'dark', 'light'].includes(value)
);

if (browser) {
	theme.subscribe(value => {
		const isDark =
			value === 'dark' ||
			(value === 'system' &&
				window.matchMedia('(prefers-color-scheme: dark)').matches);

		const isCurrentlyDark =
			document.documentElement.classList.contains('dark');

		if (isDark === isCurrentlyDark) {
			return;
		}

		document.documentElement.classList.add('no-transition');
		document.documentElement.classList.toggle('dark', isDark);

		// Force a reflow to make sure the transition is triggered
		document.documentElement.offsetWidth;

		document.documentElement.classList.remove('no-transition');
	});
}

export const categories = persisted(
	'categories',
	usageCategories
		.filter(u => u !== 'sandbox')
		.map(category => ({
			name: category as UsageCategory,
			shown: ['core', 'common'].includes(category)
		})),
	value =>
		value.some(({ shown }) => shown) &&
		value.length === usageCategories.length - 1
);

export const sortingMethod = persisted<
	'alphabetical' | 'recognition' | 'combined'
>('sortingMethod', 'combined');

export const language = persisted(
	'language',
	'en',
	lang => lang !== 'eng' // removes Definition Rework language
);

export const sitelenMode = persisted<'pona' | 'sitelen' | 'jelo' | 'emosi'>(
	'sitelenMode',
	'pona'
);

export const viewMode = persisted<'normal' | 'detailed' | 'compact' | 'glyphs'>(
	'viewMode',
	'normal'
);

export const screenWidth = persisted<'full' | 'large'>('screenWidth', 'large');

export const autoplay = persisted('autoplay', false);
