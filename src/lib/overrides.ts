import type { Word } from './types';

export const overrides: Record<string, Partial<Word>> = {
	jule: {
		creator: 'pilin Powa',
		def: {
			en: 'indeterminate, inconclusive, tentative; unpredictable, unstable, volatile; to waver; to vibrate, to tremble, to wobble, to shake'
		},
		commentary:
			"This definition of the word is quite different from the ones present in lipu Linku. This is because certain ideas I had at the time did not pan out in the way that I'd expect. The new version deprecates the 'oscillate, swing' definition to address major overlap with sike, removes the 'wave, tide' definition as it was never used in practice, and adds definitions to characterize the word's actual use better. The actual usage of the word more or less remains the exact same as prior to this quote, but hopefully this clears up the intention behind the word more. — pilin Powa"
	}
};

export const newWords: Word[] = [
	{
		word: 'konsuno',
		def: {
			en: 'to gaslight, to deceive into believing a lie; the act of gaslighting',
			tok: 'toki li lon ala; jan li toki pi lon ala'
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
			'Predominately present within the community ma lili. "Yet" is in the sense of "even so". "At least" denotes that the speaker knows for a fact one thing, but is unaware otherwise.',
		etymology: "ainda 'still, yet, even'",
		source_language: 'Portuguese'
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
		etymology: "ಕನ kana 'dream'",
		source_language: 'Tulu'
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
		source_language: '∅'
	}
];
