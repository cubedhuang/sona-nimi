import type { Linku } from '$lib/types';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	return (await fetch('/data/linku').then(res => res.json())) as Linku;
};
