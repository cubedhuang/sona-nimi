import type { CompoundData } from '$lib/types';

import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	return (await fetch('/data/compounds').then(res =>
		res.json()
	)) as CompoundData;
}) satisfies PageServerLoad;
