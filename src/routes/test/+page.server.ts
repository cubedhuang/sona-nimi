import type { CompoundData, Linku } from '$lib/types';

import type { PageServerLoad } from './$types';

export const load = (({ fetch }) => {
	return {
		linku: fetch('/data/linku').then(res => res.json()) as Promise<Linku>,
		compounds: fetch('/data/ku').then(res =>
			res.json()
		) as Promise<CompoundData>
	};
}) satisfies PageServerLoad;
