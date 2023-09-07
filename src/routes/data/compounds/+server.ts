import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import type { Compound, CompoundData } from '$lib/types';
import glyphs from './glyphs.json';
import { dev } from '$app/environment';

export const prerender = true;

export const GET = (async ({ fetch }) => {
	if (dev) {
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
	}

	const regex = /^(.+?): \["?(.+?)"?\]/gm;

	const rawData = await fetch('https://tokipona.org/compounds.txt').then(res =>
		res.text()
	);

	const data: CompoundData = Object.fromEntries(
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

			const data: [string, Compound] = [compound, { compound, uses }];

			if (matches.length) data[1].glyphs = matches;

			return data;
		})
	);

	return json(data);
}) satisfies RequestHandler;
