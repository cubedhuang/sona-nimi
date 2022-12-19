import { json } from '@sveltejs/kit';
import { overrides } from '$lib/overrides';
import type { JasimaData } from '$lib/types';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const data = (await fetch(
		'https://lipu-linku.github.io/jasima/data.json'
	).then(res => res.json())) as JasimaData;

	for (const [key, override] of Object.entries(overrides)) {
		const word = data.data[key];

		if (word) {
			data.data[key] = {
				...word,
				...override,
				def: {
					...word.def,
					...override.def
				}
			};
		}
	}

	return json(data);
};
