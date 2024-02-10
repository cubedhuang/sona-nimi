import { error } from '@sveltejs/kit';
import type { Linku } from '$lib/types';
import { distance } from 'fastest-levenshtein';

import type { PageServerLoad } from './$types';

import { combinedWordSort } from '$lib/util';

export const load = (async ({ fetch, params }) => {
	const data: Linku = await fetch('/data/linku').then(res => res.json());

	const word = data.data[params.nimi];
	const words = Object.values(data.data).sort(combinedWordSort);
	const index = words.indexOf(word);

	if (!word) {
		const closest = words
			.map(({ word }) => ({
				word,
				distance: distance(word, params.nimi)
			}))
			.filter(
				({ word, distance }) =>
					distance < 3 || word.startsWith(params.nimi)
			)
			.sort((a, b) => a.distance - b.distance)
			.slice(0, 10)
			.map(({ word }) => word);

		if (params.nimi.length >= 10) {
			if (params.nimi.length >= 10) closest.pop();
			closest.push('kijetesantakalu');
		}

		throw error(404, {
			message: 'Not found',
			closest
		});
	}

	return {
		word,
		next: words[(index + 1) % words.length].id,
		previous: words[(index - 1 + words.length) % words.length].id
	};
}) satisfies PageServerLoad;
