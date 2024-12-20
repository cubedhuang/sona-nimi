import type { LocalizedSign } from '@kulupu-linku/sona';
import { client } from '@kulupu-linku/sona/client';

export async function load({ fetch, setHeaders }) {
	const [words, lukaPona] = await Promise.all([
		client({ fetch })
			.v1.words.$get({ query: { lang: 'en' } })
			.then(res => res.json()),
		client({ fetch })
			.v1.luka_pona.signs.$get({ query: { lang: 'en' } })
			.then(res => res.json())
	]);

	const lukaPonaData = Object.values(lukaPona);
	const signs: Record<string, LocalizedSign[]> = {};

	for (const word of Object.keys(words)) {
		const results = lukaPonaData.filter(sign => sign.definition === word);
		if (results.length) {
			signs[word] = results;
		}
	}

	setHeaders({ 'Cache-Control': 's-maxage=3600' });

	return {
		words: Object.values(words).filter(word => signs[word.word]),
		signs
	};
}
