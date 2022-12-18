import { error } from '@sveltejs/kit';
import { overrides } from '$lib/overrides';
import type { JasimaData } from '$lib/types';
import { applyOverrides } from '$lib/util';

import type { PageServerLoad } from './$types';

export const prerender = 'auto';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const data = (await fetch(
		'https://lipu-linku.github.io/jasima/data.json'
	).then(res => res.json())) as JasimaData;

	const word = data.data[params.nimi];

	if (!word) throw error(404, 'Not Found');

	applyOverrides(word, overrides);

	return word;
};
