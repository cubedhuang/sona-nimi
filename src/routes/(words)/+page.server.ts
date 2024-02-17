import { client } from '@kulupu-linku/sona/client';

export async function load({ fetch }) {
	const [words, languages, lipamanka] = await Promise.all([
		client.v1.words
			.$get({ query: { lang: 'en' } }, { fetch })
			.then(res => res.json()),
		client.v1.languages.$get({}, { fetch }).then(res => res.json()),
		fetch('/data/lipamanka').then(res => res.json()) as Promise<
			Record<string, string>
		>
	]);

	return { words, languages, lipamanka };
}
