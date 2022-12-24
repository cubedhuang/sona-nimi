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
	if (word.recognition === null) return -1;

	const dates = Object.keys(word.recognition).sort();
	const latest = dates[dates.length - 1];

	return Number(word.recognition[latest]);
}

export function getWordDisplayRecognition(word: Word) {
	const recognition = getWordRecognition(word);
	if (recognition === -1) return 'unknown';
	return `${recognition}%`;
}
