import { client } from '@kulupu-linku/sona/client';

export async function load({ fetch }) {
	const [words, languages, lipamanka] = await Promise.all([
		client({ fetch })
			.v1.words.$get({ query: { lang: 'en' } })
			.then(res => res.json()),
		client({ fetch })
			.v1.languages.$get()
			.then(res => res.json()),
		fetch('/data/lipamanka').then(res => res.json()) as Promise<
			Record<string, string>
		>
	]);

	return { words, languages, lipamanka };
}
