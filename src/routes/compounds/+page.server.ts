import type { CompoundData } from '$lib/types';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const regex = /^(.+?): \["?(.+?)"?\]/gm;

	const rawData = await fetch('https://tokipona.org/compounds.txt').then(res =>
		res.text()
	);

	return Object.fromEntries(
		[...rawData.matchAll(regex)].map(match => {
			const [, compound, rawUses] = match;

			const uses = Object.fromEntries(
				rawUses.split(', ').map(rawUse => {
					const parts = rawUse.split(' ');
					const count = Number(parts.pop());
					const use = parts.join(' ');

					return [use, count];
				})
			);

			return [compound, { compound, uses }];
		})
	) as CompoundData;
};
