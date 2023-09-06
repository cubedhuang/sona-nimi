import { json } from '@sveltejs/kit';
import type { Linku } from '$lib/types';

import type { RequestHandler } from './$types';

export const GET = (async ({ fetch }) => {
	const data = (await fetch('https://linku.la/jasima/data.json').then(res =>
		res.json()
	)) as Linku;

	for (const key of Object.keys(data.data)) {
		data.data[key].id = key;
	}

	return json(data);
}) satisfies RequestHandler;
