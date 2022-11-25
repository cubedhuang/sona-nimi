import { redirect } from '@sveltejs/kit';
import type { JasimaData } from '$lib/types';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const data = (await fetch(
		'https://lipu-linku.github.io/jasima/data.json'
	).then(res => res.json())) as JasimaData;

	const word = data.data[params.nimi];

	if (!word) throw redirect(308, '/');

	return word;
};
