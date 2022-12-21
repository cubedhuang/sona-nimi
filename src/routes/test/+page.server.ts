import type { CompoundData, Linku } from '$lib/types';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	return {
		linku: (await fetch('/data/linku').then(res => res.json())) as Linku,
		compounds: (await fetch('/data/compounds').then(res =>
			res.json()
		)) as CompoundData
	};
};
