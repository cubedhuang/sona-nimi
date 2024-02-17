import type { LocalizedSign, SignVideo } from '@kulupu-linku/sona';
import { client } from '@kulupu-linku/sona/client';

export async function load({ fetch }) {
	const [words, lukaPona] = await Promise.all([
		client.v1.words
			.$get({ query: { lang: 'en' } }, { fetch })
			.then(res => res.json()),
		client.v1.luka_pona.signs
			.$get({ query: { lang: 'en' } }, { fetch })
			.then(res => res.json())
	]);

	const lukaPonaData = Object.values(lukaPona);

	const signs = Object.keys(words)
		.map(word => lukaPonaData.find(sign => sign.definition === word))
		.filter(sign => sign)
		.map(sign => {
			sign = sign as LocalizedSign;

			return [sign.definition, sign.video] as [string, SignVideo];
		});

	return { words, signs: Object.fromEntries(signs) };
}
