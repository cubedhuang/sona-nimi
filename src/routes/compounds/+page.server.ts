import type { CompoundData } from '$lib/types';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const regex = /^(.+?): \["?(.+?)"?\]/gm;

	const rawData = await fetch('https://tokipona.org/compounds.txt').then(res =>
		res.text()
	);
	const glyphs = (await fetch('/glyphs.json').then(res =>
		res.json()
	)) as string[];

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

			let matches: string[];

			if (compound.includes(' ')) {
				const regex = new RegExp(
					`^${compound
						.split(' ')
						.map(w => `${w}[0-9]?`)
						.join('[-\\^\\*]')}$`,
					'g'
				);

				matches = glyphs.filter(glyph => glyph.match(regex));
			} else {
				matches = [compound];
			}

			return [compound, { compound, uses, glyphs: matches }];
		})
	) as CompoundData;
};
