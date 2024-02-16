import type { CompoundData } from '$lib/types';

export function load({ fetch }) {
	return fetch('/data/ku').then(res => res.json()) as Promise<CompoundData>;
}
