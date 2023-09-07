import type { BookName, Language, UsageCategory, Word } from './types';

export const normalize = (str: string) =>
	str
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim();

export const usageCategories = [
	'core',
	'widespread',
	'common',
	'uncommon',
	'rare',
	'obscure',
	'marginal'
] as const;

export const categoryColors: Record<UsageCategory, string> = {
	core: 'bg-emerald-400 dark:bg-emerald-600',
	widespread: 'bg-sky-400 dark:bg-sky-600',
	common: 'bg-yellow-400 dark:bg-yellow-600',
	uncommon: 'bg-orange-400 dark:bg-orange-600',
	rare: 'bg-rose-500 dark:bg-rose-600',
	obscure: 'bg-fuchsia-400 dark:bg-fuchsia-600',
	marginal: 'bg-gray-400 dark:bg-gray-600'
};

export const bookColors: Record<BookName, string> = {
	pu: categoryColors.core,
	'ku suli': categoryColors.widespread,
	'ku lili': categoryColors.common,
	none: categoryColors.marginal
};

export function sortLanguages(languages: Record<string, Language>) {
	return Object.entries(languages)
		.sort((a, b) => a[1].name_endonym.localeCompare(b[1].name_endonym))
		.sort((a, b) => {
			for (const category of usageCategories) {
				const diff =
					Number(b[1].completeness_percent[category]) -
					Number(a[1].completeness_percent[category]);
				if (diff !== 0) return diff;
			}

			return 0;
		});
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
