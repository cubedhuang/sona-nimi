import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const darkMode = writable(true);

if (browser) {
	const stored = localStorage.getItem('darkMode');
	if (stored) darkMode.set(stored === 'true');

	darkMode.subscribe(value => {
		localStorage.setItem('darkMode', value.toString());

		document.documentElement.classList.toggle('dark', value);
	});
}
