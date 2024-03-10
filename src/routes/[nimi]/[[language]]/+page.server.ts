import { client } from '@kulupu-linku/sona/client';
import { error, redirect } from '@sveltejs/kit';
import { combinedWordSort } from '$lib/util';
import { distance } from 'fastest-levenshtein';

export async function load({ fetch, params }) {
	if (params.language === 'en') {
		throw redirect(301, `/${params.nimi}`);
	}

	const [data, lukaPona, lipamanka] = await Promise.all([
		client({ fetch }).v1.words.$get({
			query: { lang: params.language ?? 'en' }
		}),
		client({ fetch })
			.v1.luka_pona.signs.$get({
				query: { lang: params.language ?? 'en' }
			})
			.then(res => res.json()),
		fetch('/data/lipamanka').then(res => res.json()) as Promise<
			Record<string, string>
		>
	]);

	if (!data.ok) {
		throw error(404, { message: 'Language not found' });
	}

	const wordData = await data.json();

	const word = wordData[params.nimi];
	const words = Object.values(wordData);

	if (!word) {
		const sandbox = await client({ fetch })
			.v1.sandbox.$get({
				query: { lang: 'en' }
			})
			.then(res => res.json());

		const sandboxWords = Object.values(sandbox);
		const sandboxWord = sandbox[params.nimi];
		const index = sandboxWords.indexOf(sandboxWord);

		if (sandboxWord) {
			if (params.language) {
				throw redirect(301, `/${params.nimi}`);
			}

			return {
				word: sandboxWord,
				next:
					index === sandboxWords.length - 1
						? undefined
						: sandboxWords[index + 1].id,
				previous: index === 0 ? undefined : sandboxWords[index - 1].id
			};
		}

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

	const sortedWords = words.sort(combinedWordSort);
	const index = sortedWords.indexOf(word);

	return {
		word,
		lukaPona: Object.values(lukaPona).find(
			word => params.nimi === word.definition
		),
		lipamanka: lipamanka[params.nimi],
		next:
			index === words.length - 1 ? undefined : sortedWords[index + 1].id,
		previous: index === 0 ? undefined : sortedWords[index - 1].id
	};
}
