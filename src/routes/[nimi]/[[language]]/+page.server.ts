import { client } from '@kulupu-linku/sona/client';
import { error } from '@sveltejs/kit';
import { combinedWordSort } from '$lib/util';
import { distance } from 'fastest-levenshtein';

export async function load({ fetch, params }) {
	const [data, lukaPona, lipamanka] = await Promise.all([
		client.v1.words
			.$get({ query: { lang: params.language ?? 'en' } }, { fetch })
			.then(res => res.json()),
		client.v1.luka_pona.signs
			.$get({ query: { lang: params.language ?? 'en' } }, { fetch })
			.then(res => res.json()),
		fetch('/data/lipamanka').then(res => res.json()) as Promise<
			Record<string, string>
		>
	]);

	const word = data[params.nimi];
	const words = Object.values(data).sort(combinedWordSort);
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
		lukaPona: Object.values(lukaPona).find(
			word => params.nimi === word.definition
		),
		lipamanka: lipamanka[params.nimi],
		next: words[(index + 1) % words.length].id,
		previous: words[(index - 1 + words.length) % words.length].id
	};
}
