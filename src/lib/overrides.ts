import type { Word } from './types';

export const musi = [
	'kijetesantakalu',
	'epiku',
	'kokosila',
	'omekapo',
	'yupekosi',
	'wuwojiti',
	'sutopatikuna',
	'kulijo',
	'omekalike',
	'owe',
	'Pingo',
	'kalamARR',
	'polinpin',
	'jonke',
	'okepuma',
	'pa',
	'samu',
	'wasoweli',
	'yutu',
	'alente',
	'loka',
	'ojuta',
	'umesu',
	'itomi',
	'jans',
	'kalijopilale',
	'poni',
	'sikomo',
	'slape',
	'suke',
	'kutopoma',
	'toma',
	'konsuno',
	'nimisin',
	'nja',
	'kamalawala',
	'wawajete',
	'kisa',
	'lokon',
	'mulapisu'
];

export const overrides: Record<string, Partial<Word>> = {};

export const newWords: Word[] = [
	{
		word: 'konsuno',
		def: {
			en: 'to gaslight, to deceive into believing a lie; the act of gaslighting',
			tok: 'jan li konsuno e jan ante la, jan ante li sona e lon. taso, jan nanpa wan li toki e ni tawa ona: ona li sona ala e lon. ni la jan ante li pilin nasa.'
		},
		book: 'none',
		coined_year: '2022',
		coined_era: 'post-ku',
		recognition: null,
		usage_category: 'obscure',
		creator: 'waso Wen',
		commentary:
			'mi konsuno e sina? ni li lon ala. jan pona sina li toki e nimi tawa sina anu seme?',
		etymology: 'kon + suno, calque of English gaslight',
		source_language: 'toki pona'
	},
	{
		word: 'inta',
		def: {
			en: 'at least, definitely; yet'
		},
		book: 'none',
		coined_year: '2022',
		coined_era: 'post-ku',
		recognition: null,
		usage_category: 'obscure',
		creator: 'pilin Powa',
		commentary:
			'Predominately present within the community ma lili. "Yet" is in the sense of "even so". "At least" denotes that the speaker knows for a fact one thing, but is unaware otherwise. It functions similarly grammatically to "taso" and "kin".',
		etymology: "ainda 'still, yet, even'",
		source_language: 'Portuguese',
		see_also: 'kin, taso'
	},
	{
		word: 'kana',
		def: {
			en: 'dream; trance, hypnosis, hallucination; illusion, fantasy, imaginary; narrative, story, myth'
		},
		book: 'none',
		coined_year: '2022',
		coined_era: 'post-ku',
		recognition: null,
		usage_category: 'obscure',
		creator: 'pilin Powa',
		commentary:
			'Predominately present within the community ma lili. Serves as a non-deprecated, neutral-connotation, and polysemous variant of words like oni, powe, or jume.',
		etymology: "?????? kana 'dream'",
		source_language: 'Tulu',
		see_also: 'oni, powe, jume'
	},
	{
		word: 'sole',
		def: {
			en: 'present state, unchanged, unaltered, unaffected, instinct, habit'
		},
		book: 'none',
		coined_year: '2022',
		coined_era: 'post-ku',
		recognition: null,
		usage_category: 'obscure',
		creator: 'waso Netun',
		commentary:
			'Predominately present within the community ma lili. May refer to a state prior to a kama.',
		etymology: "soler 'to use to, to tend to'",
		source_language: 'Spanish'
	},
	{
		word: 'ta',
		def: {
			en: '(between subject phrase and predicate phrase; introduces pre-predicate phrase)'
		},
		book: 'none',
		coined_year: '2022',
		coined_era: 'post-ku',
		recognition: null,
		usage_category: 'obscure',
		creator: 'pilin Powa',
		commentary:
			'Predominately present within the community ma lili. Follows a semantically consistent pattern of "SUBJ is PV in being/doing [SUBJ is/does PRED to OBJ]" or "SUBJ does PV to [SUBJ is/does PRED to OBJ]".',
		etymology: 'a priori',
		source_language: '???'
	}
];
