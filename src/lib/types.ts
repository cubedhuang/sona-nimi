export type UsageCategory =
	| 'obscure'
	| 'rare'
	| 'uncommon'
	| 'common'
	| 'widespread'
	| 'core';
export type BookName = 'pu' | 'ku suli' | 'ku lili' | 'none';
export type CoinedEra = 'pre-pu' | 'post-pu' | 'post-ku';

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
	word: string;
	/**
	 * Maps from language code to definition
	 */
	def: Record<string, string>;
	book: BookName;
	commentary?: string;
	sitelen_pona?: string;
	sitelen_pona_etymology?: string;

	/**
	 * Maps from date to string of percentage used
	 * @example { '2022-08': '99' }
	 *
	 * Linku never gives a null value here, but it's in the type so overrides
	 * can be added without recognition being required.
	 */
	recognition: Record<string, string> | null;

	/**
	 * Unicode
	 */
	ucsur?: string;
	/**
	 * Image URL
	 */
	sitelen_sitelen?: string;
	/**
	 * Emoji character
	 */
	sitelen_emosi?: string;
	luka_pona?: {
		mp4: string;
		gif: string;
	};
	/**
	 * URLs to audio files from different speakers
	 */
	audio?: Record<string, string>;
	coined_year?: string;
	coined_era?: CoinedEra;
	usage_category: UsageCategory;
	source_language?: string;
	etymology?: string;
	creator?: string;
	ku_data?: string;

	/**
	 * Other words, separated by commas
	 */
	see_also?: string;
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
