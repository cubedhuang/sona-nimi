import type { BookName, Language, UsageCategory, Word } from './types';

export const categoryColors: Record<UsageCategory, string> = {
	core: 'bg-emerald-400 dark:bg-emerald-600',
	widespread: 'bg-sky-400 dark:bg-sky-600',
	common: 'bg-violet-400 dark:bg-violet-600',
	uncommon: 'bg-yellow-500 dark:bg-yellow-600',
	rare: 'bg-red-500 dark:bg-red-600',
	obscure: 'bg-zinc-500 dark:bg-zinc-600'
};

export const bookColors: Record<BookName, string> = {
	pu: categoryColors.core,
	'ku suli': categoryColors.widespread,
	'ku lili': categoryColors.common,
	none: categoryColors.obscure
};

export function sortLanguages(languages: Record<string, Language>) {
	// Sort by completeness percent for each usage category
	return Object.entries(languages)
		.sort((a, b) => a[1].name_endonym.localeCompare(b[1].name_endonym))
		.sort(
			(a, b) =>
				Number(b[1].completeness_percent.obscure) -
				Number(a[1].completeness_percent.obscure)
		)
		.sort(
			(a, b) =>
				Number(b[1].completeness_percent.rare) -
				Number(a[1].completeness_percent.rare)
		)
		.sort(
			(a, b) =>
				Number(b[1].completeness_percent.uncommon) -
				Number(a[1].completeness_percent.uncommon)
		)
		.sort(
			(a, b) =>
				Number(b[1].completeness_percent.common) -
				Number(a[1].completeness_percent.common)
		)
		.sort(
			(a, b) =>
				Number(b[1].completeness_percent.widespread) -
				Number(a[1].completeness_percent.widespread)
		)
		.sort(
			(a, b) =>
				Number(b[1].completeness_percent.core) -
				Number(a[1].completeness_percent.core)
		);
}

export function getWordDefinition(word: Word, language: string): string {
	return word.def[language] ?? word.def.en;
}

export function getWordRecognition(word: Word) {
	const dates = Object.keys(word.recognition).sort();
	const latest = dates[dates.length - 1];

	return Number(word.recognition[latest]);
}

export function applyOverrides(
	words: Record<string, Word>,
	overrides: Record<string, Partial<Word>>
): void;
export function applyOverrides(
	word: Word,
	overrides: Record<string, Partial<Word>>
): void;
export function applyOverrides(
	value: Word | Record<string, Word>,
	overrides: Record<string, Partial<Word>>
) {
	if ('def' in value) {
		const word = value as Word;

		if (overrides[word.word]) {
			const def = word.def;

			Object.assign(word, overrides[word.word]);

			word.def = {
				...def,
				...overrides[word.word].def
			};
		}
	} else {
		const words = value;

		for (const [key, value] of Object.entries(overrides)) {
			if (words[key]) {
				const def = words[key].def;

				Object.assign(words[key], value);

				words[key].def = {
					...def,
					...value.def
				};
			}
		}
	}
}
