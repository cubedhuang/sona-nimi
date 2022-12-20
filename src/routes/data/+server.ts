import { json } from '@sveltejs/kit';
import { newWords, overrides } from '$lib/overrides';
import type { Linku } from '$lib/types';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const data = (await fetch(
		'https://lipu-linku.github.io/jasima/data.json'
	).then(res => res.json())) as Linku;

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

	for (const word of newWords) {
		data.data[word.word] = word;
	}

	return json(data);
};
