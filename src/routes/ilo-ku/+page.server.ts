import type { CompoundData } from '$lib/types';

import type { PageServerLoad } from './$types';

export const load = (({ fetch }) => {
	return fetch('/data/ku').then(res => res.json()) as Promise<CompoundData>;
}) satisfies PageServerLoad;
