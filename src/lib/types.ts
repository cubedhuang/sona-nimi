export type UsageCategory =
	| 'core'
	| 'widespread'
	| 'common'
	| 'uncommon'
	| 'rare'
	| 'obscure'
	// not in Linku
	| 'marginal';
export type BookName = 'pu' | 'ku suli' | 'ku lili' | 'none';
export type CoinedEra = 'pre-pu' | 'post-pu' | 'post-ku';
export type Tag = 'pre-pu ALT' | 'nimi nanpa';

export interface Linku {
	languages: Record<string, Language>;
	credits: Record<string, Credit>;
	data: Record<string, Word>;
	fonts: Record<string, Font>;
}

export interface Language {
	id_long: string;
	name_endonym: string;
	name_english: string;
	name_toki_pona: string;
	credits: string;
	completeness_percent: Record<UsageCategory, string>;
}

export interface Credit {
	description: string;
}

export interface Word {
	/**
	 * A unique identifier for the word which is often the word, but may have an integer suffix if the word has been coined multiple times.
	 *
	 * Not in the jasima object, but added for keying.
	 */
	id: string;
	/**
	 * The word as it would be written in Toki Pona using sitelen Lasina.
	 */
	word: string;
	/**
	 * A list of latin character strings that convert to all alternates for a given word. Usually identical to [word]; see "akesi".
	 */
	sitelen_pona?: string;
	/**
	 * The unicode codepoint assigned to the word.
	 */
	ucsur?: string;
	/**
	 * Human-readable description of the origin of the sitelen pona.
	 */
	sitelen_pona_etymology?: string;
	/**
	 * URL to an image of the sitelen sitelen for the word.
	 */
	sitelen_sitelen?: string;
	/**
	 * The emoji corresponding to the word in sitelen Emosi.
	 */
	sitelen_emosi?: string;
	/**
	 * URLs to the luka pona sign being demonstrated.
	 */
	luka_pona?: {
		mp4: string;
		gif: string;
	};
	/**
	 * URLs to the audio of the word being spoken by authors.
	 */
	audio?: Record<string, string>;
	/**
	 * The "era" the word was created in, relative to the publishing of the Toki Pona books.
	 */
	coined_era?: CoinedEra;
	/**
	 * The year the word was coined.
	 */
	coined_year?: string;
	/**
	 * What Toki Pona book the word was first documented in.
	 */
	book: BookName;
	/**
	 * The word's popularity. `marginal` is added by nimi.li.
	 */
	usage_category: UsageCategory;
	/**
	 * The language(s) the word derives from.
	 */
	source_language?: string;
	/**
	 * A human-readable description of the word's etymology(ies), including the original word(s), definition(s), and other metadata.
	 */
	etymology?: string;
	etymology_data: {
		/**
		 * List of languages the word derives from, split on `;`.
		 */
		langs: string;
		/**
		 * List of words the word derives from, split on `;`.
		 */
		words?: string;
		/**
		 * List of alternate writings or indicated pronunciations for the words in `words`, split on `;`.
		 */
		alts?: string;
		/**
		 * List of definitions for the words in `words`, split on `;`.
		 */
		defs?: string;
	};
	/**
	 * The name of the word's creator.
	 */
	creator?: string;
	/**
	 * Usage data from Toki Pona Dictionary (ku), indicated with a superscript number, split on `,`.
	 */
	ku_data?: string;
	/**
	 * Maps from YYYY-MM date to a string containing the Integer percentage of survey respondents who recognize and use the word as of the date.
	 *
	 * Linku never gives a null value here, but it's in the type so overrides
	 * can be added without recognition being required.
	 *
	 * @example { '2022-08': '99' }
	 */
	recognition: Record<string, string> | null;
	/**
	 * Definition of the word as written by its original author. Defer to `pu_verbatim` if that is defined.
	 */
	author_verbatim?: string;
	/**
	 * Link to the original source of the word's definition.
	 */
	author_verbatim_source?: string;
	/**
	 * Definition of the word in [language_code] as written in the corresponding translation of Toki Pona: The Language of Good.
	 *
	 * Only a few language codes are available: `en`, `fr`, `de`, `eo`
	 */
	pu_verbatim?: Record<string, string>;
	/**
	 * A list of words related to this word, split on `,`.
	 */
	see_also?: string;
	/**
	 * Human-readable extra information about the word, such as historical usage, replacement, or clarifications.
	 */
	commentary?: string;
	/**
	 * Maps from language code to definition
	 */
	def: Record<string, string>;

	/**
	 * Undocumented in jasima.
	 */
	tags?: Tag;

	/**
	 * Not in jasima, scraped from lipamanka's dictionary
	 */
	lipamanka?: string;
}

export interface Font {
	name_short: string;
	writing_system: string;
	links: {
		fontfile: string;
		webpage: string;
	};
	creator: string;
	license: string;
	version: string;
	last_updated: string;
	filename: string;
	style: string;
	features: string;
}

export type CompoundData = Record<string, Compound>;

export interface Compound {
	compound: string;
	uses: Record<string, number>;
	glyphs?: string[];
}
