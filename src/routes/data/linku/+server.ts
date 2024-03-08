import { client } from '@kulupu-linku/sona/client';
import { json } from '@sveltejs/kit';

export async function GET({ fetch, url }) {
	const lang = url.searchParams.get('lang') ?? 'en';

	return json(
		await client({ fetch })
			.v1.words.$get({ query: { lang } })
			.then(res => res.json())
	);
}
