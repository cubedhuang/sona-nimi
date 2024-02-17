import type { CompoundData } from '$lib/types';

export async function load({ fetch }) {
	return (await fetch('/data/ku').then(res => res.json())) as CompoundData;
}
