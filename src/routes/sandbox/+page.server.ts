import { client } from '@kulupu-linku/sona/client';

export async function load({ fetch }) {
	const [words, languages] = await Promise.all([
		client({ fetch })
			.v1.sandbox.$get({ query: { lang: 'en' } })
			.then(res => res.json()),
		client({ fetch })
			.v1.languages.$get()
			.then(res => res.json())
	]);

	return { words, languages };
}
