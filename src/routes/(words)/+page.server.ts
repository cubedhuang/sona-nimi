import type { Linku } from '$lib/types';

export function load({ fetch }) {
	return fetch('/data/linku').then(res => res.json()) as Promise<Linku>;
}
