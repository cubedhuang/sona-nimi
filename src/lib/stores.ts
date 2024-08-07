import { writable, type Writable } from 'svelte/store';

import { browser } from '$app/environment';

import { usageCategories } from './util';
import type { UsageCategory } from '@kulupu-linku/sona/utils';

function persisted<T>(
	key: string,
	initialValue: T,
	validator?: (value: T) => boolean
): Writable<T> {
	key = `nimi.li:${key}`;

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

export const themes = [
	'system',
	'dark',
	'light',
	'orange',
	'pink',
	'purple',
	'blue',
	'green',
	'red',
	'stone',
	'dim',
	'indigo'
] as const;
export type Theme = (typeof themes)[number];
export const theme = persisted<Theme>('theme', 'system', value =>
	themes.includes(value)
);

export const fonts = [
	'font-sans',
	'font-serif',
	'font-mono',
	'font-dyslexic',
	'font-atkinson'
] as const;
export type Font = (typeof fonts)[number];
export const font = persisted<Font>('font', 'font-sans', value =>
	fonts.includes(value)
);

if (browser) {
	theme.subscribe(value => {
		if (document.documentElement.classList.contains('value')) {
			return;
		}

		document.documentElement.classList.add('no-transition');

		if (value === 'system') {
			const isDark = window.matchMedia(
				'(prefers-color-scheme: dark)'
			).matches;
			value = isDark ? 'dark' : 'light';
		}

		for (const theme of themes) {
			document.documentElement.classList.toggle(theme, value === theme);
		}

		// Force a reflow to make sure the transition is triggered
		document.documentElement.offsetWidth;

		document.documentElement.classList.remove('no-transition');
	});

	font.subscribe(value => {
		if (document.documentElement.classList.contains('value')) {
			return;
		}

		for (const font of fonts) {
			document.documentElement.classList.toggle(font, value === font);
		}
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
