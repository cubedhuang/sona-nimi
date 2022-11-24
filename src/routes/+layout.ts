import type { JasimaData } from 'src/lib/types';

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
	const data = await fetch(
		'https://lipu-linku.github.io/jasima/data.json'
	).then(res => res.json());

	return data as JasimaData;
};
