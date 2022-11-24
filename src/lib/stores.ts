import { browser } from '$app/environment';
import { writable } from 'svelte/store';

function savedWritable<T>(key: string, initialValue: T) {
	const { subscribe, set, update } = writable(initialValue);

	if (browser) {
		const json = localStorage.getItem(key);
		if (json) {
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

export const darkMode = savedWritable('darkMode', true);

if (browser) {
	darkMode.subscribe(value => {
		localStorage.setItem('darkMode', value.toString());

		document.documentElement.classList.toggle('dark', value);
	});
}

export const sitelenMode = savedWritable<'pona' | 'sitelen' | 'emosi'>(
	'sitelenMode',
	'pona'
);
