import type { Linku } from '$lib/types';

import type { PageServerLoad } from './$types';

export const load = (({ fetch }) => {
	return fetch('/data/linku').then(res => res.json()) as Promise<Linku>;
}) satisfies PageServerLoad;
