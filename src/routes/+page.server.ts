import { overrides } from '$lib/overrides';
import type { JasimaData } from '$lib/types';
import { applyOverrides } from '$lib/util';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const data = (await fetch(
		'https://lipu-linku.github.io/jasima/data.json'
	).then(res => res.json())) as JasimaData;

	applyOverrides(data.data, overrides);

	return data as JasimaData;
};
