import type { LocalizedWord } from '@kulupu-linku/sona';
import { distance } from 'fastest-levenshtein';

import { getWordTranslation, normalize } from './util';

export function filter(
	words: LocalizedWord[],
	search: string,
	$language: string
) {
	search = normalize(search);

	if (!search) {
		return words;
	}

	function scoreMatch(content: string | string[] | undefined) {
		if (!content) return 0;

		if (Array.isArray(content)) {
			let score = 0;

			for (const item of content) {
				score += scoreMatch(item);
			}

			return score;
		}

		const includes = content.includes(search);
		const dist = distance(search, content);
		const maxDist = content.length / 3;

		if (!includes && dist > maxDist) return 0;

		let score = 1;

		if (dist <= maxDist) {
			score += ((maxDist - dist) / maxDist) * 2;
		}

		if (includes) {
			score += 1;
		}

		return score;
	}

	function searchFilter(word: LocalizedWord) {
		if (!search) return true;

		const translation = getWordTranslation(word, $language);

		if (word.ku_data) {
			if (scoreMatch(Object.keys(word.ku_data)) > 0) {
				return true;
			}
		}

		if (translation.etymology) {
			for (const etymology of translation.etymology) {
				if (scoreMatch(etymology.language) > 0) {
					return true;
				}

				if (scoreMatch(etymology.definition) > 0) {
					return true;
				}
			}
		}

		return (
			scoreMatch(word.word) ||
			scoreMatch(translation.definition) ||
			scoreMatch(word.source_language) ||
			scoreMatch(word.creator) ||
			scoreMatch(translation.commentary)
		);
	}

	function scoreSearch(word: LocalizedWord) {
		let score = 0;

		const translation = getWordTranslation(word, $language);

		score += scoreMatch(word.word) * 100;
		score += scoreMatch(translation.definition) * 50;
		score += scoreMatch(word.source_language) * 20;
		score += scoreMatch(word.creator) * 10;
		score += scoreMatch(translation.commentary) * 5;

		if (word.ku_data) {
			score += scoreMatch(Object.keys(word.ku_data)) * 20;
		}

		if (translation.etymology) {
			for (const etymology of translation.etymology) {
				score += scoreMatch(etymology.language) * 10;
				score += scoreMatch(etymology.definition) * 5;
			}
		}

		return score;
	}

	return words
		.filter(searchFilter)
		.sort((a, b) => scoreSearch(b) - scoreSearch(a));
}
