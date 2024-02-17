import type {
	Book,
	Language,
	LocalizedWord,
	UsageCategory
} from '@kulupu-linku/sona';

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
	'obscure'
] as const;

export const categoryColors: Record<UsageCategory, string> = {
	core: 'bg-emerald-400 dark:bg-emerald-600',
	widespread: 'bg-sky-400 dark:bg-sky-600',
	common: 'bg-yellow-400 dark:bg-yellow-600',
	uncommon: 'bg-orange-400 dark:bg-orange-600',
	rare: 'bg-rose-500 dark:bg-rose-600',
	obscure: 'bg-gray-400 dark:bg-gray-600'
};

export const categoryTextColors: Record<UsageCategory, string> = {
	core: 'text-emerald-600 dark:text-emerald-400',
	widespread: 'text-sky-600 dark:text-sky-400',
	common: 'text-yellow-600 dark:text-yellow-400',
	uncommon: 'text-orange-600 dark:text-orange-400',
	rare: 'text-rose-600 dark:text-rose-400',
	obscure: 'text-gray-600 dark:text-gray-400'
};

export const bookColors: Record<Book, string> = {
	pu: categoryColors.core,
	'ku suli': categoryColors.widespread,
	'ku lili': categoryColors.common,
	none: categoryColors.obscure
};

export const categoryIndex = Object.fromEntries(
	usageCategories.map((category, index) => [category, index] as const)
) as Record<UsageCategory, number>;

export function azWordSort(a: LocalizedWord, b: LocalizedWord) {
	return a.word.localeCompare(b.word);
}

export function recognitionWordSort(a: LocalizedWord, b: LocalizedWord) {
	return getWordRecognition(b) - getWordRecognition(a);
}

export function combinedWordSort(a: LocalizedWord, b: LocalizedWord) {
	if (a.usage_category === b.usage_category) return azWordSort(a, b);
	return categoryIndex[a.usage_category] - categoryIndex[b.usage_category];
}

export function sortLanguages(languages: Record<string, Language>) {
	return Object.entries(languages).map(([id, language]) => ({
		...language,
		id
	}));
}

export function getWordTranslation(word: LocalizedWord, $language: string) {
	return word.translations[$language] ?? word.translations.en;
}

export function getWordEtymologies(word: LocalizedWord, $language: string) {
	const translation = getWordTranslation(word, $language);

	return word.etymology
		.map(({ word: sourceWord, alt }, index) => {
			const { definition, language } = translation.etymology[index];

			let output = '';

			if (index !== 0 || word.source_language.startsWith('multiple')) {
				output += language + ' ';
			}

			if (sourceWord) {
				output += sourceWord + ' ';
			}

			if (alt) {
				output += alt + ' ';
			}

			if (definition) {
				output += `‘${definition}’`;
			}

			return output.trim();
		})
		.join(', ');
}

export function getWordRecognition(word: LocalizedWord) {
	const dates = Object.keys(word.usage).sort();
	const latest = dates[dates.length - 1];

	return Number(word.usage[latest]);
}

export function getWordDisplayRecognition(word: LocalizedWord) {
	const recognition = getWordRecognition(word);
	if (recognition === -1) return 'unknown';
	return `${recognition}%`;
}

export function getUsageCategoryFromPercent(percent: number): UsageCategory {
	if (percent >= 90) return 'core';
	if (percent >= 70) return 'widespread';
	if (percent >= 50) return 'common';
	if (percent >= 20) return 'uncommon';
	if (percent >= 10) return 'rare';
	return 'obscure';
}

export function getWordLink(id: string, $language: string) {
	if ($language === 'en') return `/${id}`;

	return `/${id}/${$language}`;
}
