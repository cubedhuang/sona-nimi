import { json } from '@sveltejs/kit';
import type { Linku, Word } from '$lib/types';
import { getWordRecognition } from '$lib/util';
import { dev } from '$app/environment';

import type { RequestHandler } from './$types';

const additions: Word[] = [
	{
		id: 'inta',
		word: 'inta',
		def: {
			en: 'at least, definitely; still, yet, even'
		},
		book: 'none',
		coined_year: '2022',
		coined_era: 'post-ku',
		recognition: null,
		usage_category: 'obscure',
		creator: 'ilo Powa',
		commentary:
			'A particle that allows the speaker to specify the level of information they have about a situation. As a modifier, it means "at least" or "definitely", indicating knowledge of one thing but not necessarily other things.',
		etymology: "ainda 'still, yet, even'",
		source_language: 'Portuguese',
		etymology_data: {
			langs: 'Portuguese',
			words: 'ainda',
			defs: 'still, yet, even'
		},
		see_also: 'kin, taso'
	},
	{
		id: 'kana',
		word: 'kana',
		sitelen_pona: 'kana',
		def: {
			en: 'dream; trance, hypnosis, hallucination; illusion, fantasy, imaginary; narrative, story, myth'
		},
		book: 'none',
		coined_year: '2022',
		coined_era: 'post-ku',
		recognition: null,
		usage_category: 'obscure',
		creator: 'ilo Powa',
		commentary:
			'Serves as a non-deprecated, neutral-connotation, and polysemous variant of words like oni, powe, or jume.',
		etymology: "ಕನ kana 'dream'",
		source_language: 'Tulu',
		etymology_data: {
			langs: 'Tulu',
			words: 'ಕನ',
			alts: 'kana',
			defs: 'dream'
		},
		see_also: 'oni, powe, jume'
	},
	{
		id: 'sole',
		word: 'sole',
		def: {
			en: 'pattern, constant, unchanged, unaltered, unaffected; instinct, habit, to use to, to tend to'
		},
		book: 'none',
		coined_year: '2022',
		coined_era: 'post-ku',
		recognition: null,
		usage_category: 'obscure',
		creator: 'waso Netun',
		commentary: 'May refer to a state prior to a kama.',
		etymology: "soler 'to use to, to tend to'",
		source_language: 'Spanish',
		etymology_data: {
			langs: 'Spanish',
			words: 'soler',
			defs: 'to use to, to tend to'
		}
	},
	{
		id: 'ta',
		word: 'ta',
		sitelen_pona: 'ta',
		def: {
			en: '(pre-predicate marker)'
		},
		book: 'none',
		coined_year: '2022',
		coined_era: 'post-ku',
		recognition: null,
		usage_category: 'obscure',
		creator: 'ilo Powa',
		commentary:
			'Follows a semantically consistent pattern of "SUBJ li PV ta PRED" = "SUBJ li PV e [SUBJ li PRED]" or "[SUBJ li PRED] li PV". The top and bottom lines of the sitelen pona may be extended to the left around the pre-predicate word(s).',
		etymology: 'a priori',
		source_language: '∅',
		etymology_data: {
			langs: 'a priori'
		}
	},
	{
		id: 'iseki',
		word: 'iseki',
		sitelen_pona: 'iseki',
		def: {
			en: 'flower; adornment, accessory, garnish, spice; ornamental, aesthetic, beauty, flourish'
		},
		book: 'none',
		coined_year: '2023',
		coined_era: 'post-ku',
		recognition: null,
		usage_category: 'obscure',
		creator: 'kulupu Solali',
		commentary:
			'Intended as an alt for namako that removes the "additional, extra" definition. used to emphasize that these details are core to something, and not superfluous.',
		etymology: "çiçek and çiçeği 'flower, blossom'",
		source_language: 'Turkish',
		etymology_data: {
			langs: 'Turkish',
			words: 'çiçek, çiçeği',
			defs: 'flower, blossom'
		},
		see_also: 'namako'
	},
	{
		id: 'nowi',
		word: 'nowi',
		sitelen_pona: 'nowi',
		def: {
			en: 'connected, related, joined; complementary, mutual; exchange'
		},
		book: 'none',
		coined_year: '2023',
		coined_era: 'post-ku',
		recognition: null,
		usage_category: 'obscure',
		creator: 'ilo Powa, kulupu Solali',
		commentary:
			'Intended as an alt to esun which implies that non-mutually-beneficial relationships are not real relationships.',
		etymology:
			"nối 'to join, to add, to unite, to connect; to continue, to carry on, to perpetuate'",
		source_language: 'Vietnamese',
		etymology_data: {
			langs: 'Vietnamese',
			words: 'nối',
			defs: 'to join, to add, to unite, to connect; to continue, to carry on, to perpetuate'
		},
		see_also: 'esun'
	},
	{
		id: 'aku',
		word: 'aku',
		sitelen_pona: 'aku',
		def: {
			en: 'shocking, surprising, unexpected; sour, bitter, acidic'
		},
		book: 'none',
		coined_year: '2023',
		coined_era: 'post-ku',
		recognition: null,
		usage_category: 'obscure',
		creator: 'kulupu Solali',
		etymology: "acru 'sour'",
		source_language: 'Romanian',
		etymology_data: {
			langs: 'Romanian',
			words: 'acru',
			defs: 'sour'
		}
	},
	{
		id: 'anta',
		word: 'anta',
		sitelen_pona: 'anta',
		def: {
			en: 'oil, fat, grease; slippery; salty, savory'
		},
		book: 'none',
		coined_year: '2022',
		coined_era: 'post-ku',
		recognition: null,
		usage_category: 'obscure',
		creator: 'ilo Powa',
		etymology: "油 anda 'oil'",
		source_language: 'Okinawan',
		etymology_data: {
			langs: 'Okinawan',
			words: '油',
			alts: 'anda',
			defs: 'oil'
		}
	}
];

export const GET = (async ({ fetch }) => {
	if (dev) {
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
	}

	const data = (await fetch(
		'https://raw.githubusercontent.com/lipu-linku/jasima/main/data.json'
	).then(res => res.json())) as Linku;

	for (const key of Object.keys(data.data)) {
		data.data[key].id = key;
	}

	for (const word of additions) {
		data.data[word.id] = word;
	}

	for (const word of Object.values(data.data)) {
		if (getWordRecognition(word) < 2) {
			word.usage_category = 'marginal';
		}
	}

	data.data['su'].def.en =
		'interacting with the official Toki Pona story book series by Sonja Lang';
	data.data['su'].commentary =
		'Only one book, The Wonderful Wizard of Oz, has been released so far. The name may be a pun on the transliteration of the land of Oz as "ma Osu." For ways to buy a copy of the book, visit the official Toki Pona website.';

	return json(data);
}) satisfies RequestHandler;
