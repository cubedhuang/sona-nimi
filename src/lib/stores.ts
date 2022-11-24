import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const darkMode = writable(
	browser ? localStorage.getItem('darkMode') === 'true' : false
);

if (browser) {
	darkMode.subscribe(value => {
		localStorage.setItem('darkMode', `${value}`);

		document.documentElement.classList.toggle('dark', value);
	});
}
