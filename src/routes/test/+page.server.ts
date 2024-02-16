import type { CompoundData, Linku } from '$lib/types';

export async function load({ fetch }) {
	const [linku, compounds] = await Promise.all([
		fetch('/data/linku').then(res => res.json()) as Promise<Linku>,
		fetch('/data/ku').then(res => res.json()) as Promise<CompoundData>
	]);

	return { linku, compounds };
}
