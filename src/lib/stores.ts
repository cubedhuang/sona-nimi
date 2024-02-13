import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

import type { UsageCategory } from './types';
import { usageCategories } from './util';

function savedWritable<T>(
	key: string,
	initialValue: T,
	validator?: (value: T) => boolean
): Writable<T> {
	const { subscribe, set, update } = writable(initialValue);

	if (browser) {
		const json = localStorage.getItem(key);
		if (json !== null && (!validator || validator(JSON.parse(json)))) {
			set(JSON.parse(json));
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

export const darkMode = savedWritable(
	'darkMode',
	browser ? window.matchMedia('(prefers-color-scheme: dark)').matches : true
);

if (browser) {
	darkMode.subscribe(value => {
		localStorage.setItem('darkMode', value.toString());

		if (document.documentElement.classList.contains('dark') === value) {
			return;
		}

		document.documentElement.classList.add('no-transition');
		document.documentElement.classList.toggle('dark', value);

		// Force a reflow to make sure the transition is triggered
		document.documentElement.offsetWidth;

		document.documentElement.classList.remove('no-transition');
	});
}

export const categories = savedWritable(
	'categories',
	usageCategories.map(category => ({
		name: category as UsageCategory,
		shown: ['core', 'widespread'].includes(category)
	})),
	value => value.some(({ shown }) => shown)
);

categories.subscribe($categories => {
	if ($categories.length !== usageCategories.length) {
		for (const category of usageCategories) {
			if (!$categories.some(({ name }) => name === category)) {
				$categories.push({
					name: category as UsageCategory,
					shown: false
				});
			}
		}
	}
});

export const sortingMethod = savedWritable<
	'alphabetical' | 'recognition' | 'combined'
>('sortingMethod', 'combined');

export const language = savedWritable('language', 'en');

export const sitelenMode = savedWritable<'pona' | 'sitelen' | 'emosi'>(
	'sitelenMode',
	'pona'
);

export const viewMode = savedWritable<
	'normal' | 'detailed' | 'compact' | 'glyphs'
>('viewMode', 'normal');

export const screenWidth = savedWritable<'full' | 'large'>(
	'screenWidth',
	'large'
);

export const autoplay = savedWritable('autoplay', false);
