import type { BookName, Language, UsageCategory, Word } from './types';

export const normalize = (str: string) =>
	str
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim();

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

const priorities = [
	'core',
	'widespread',
	'common',
	'uncommon',
	'rare',
	'obscure'
] as const;

export function sortLanguages(languages: Record<string, Language>) {
	return Object.entries(languages)
		.sort((a, b) => a[1].name_endonym.localeCompare(b[1].name_endonym))
		.sort((a, b) => {
			for (const priority of priorities) {
				const diff =
					Number(b[1].completeness_percent[priority]) -
					Number(a[1].completeness_percent[priority]);
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
