import { distance } from 'fastest-levenshtein';

import type { Word } from './types';
import { getWordDefinition, normalize } from './util';

export function filter(words: Word[], search: string, $language: string) {
	search = normalize(search);

	if (!search) {
		return words;
	}

	function scoreMatch(content: string | undefined) {
		if (!content) return 0;

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

	function searchFilter(word: Word) {
		if (!search) return true;

		return (
			scoreMatch(word.word) ||
			scoreMatch(getWordDefinition(word, $language)) ||
			scoreMatch(word.ku_data) ||
			scoreMatch(word.etymology) ||
			scoreMatch(word.source_language) ||
			scoreMatch(word.creator) ||
			scoreMatch(word.commentary)
		);
	}

	function scoreSearch(word: Word) {
		let score = 0;

		score += scoreMatch(word.word) * 100;
		score += scoreMatch(getWordDefinition(word, $language)) * 50;
		score += scoreMatch(word.ku_data) * 40;
		score += scoreMatch(word.etymology) * 30;
		score += scoreMatch(word.source_language) * 20;
		score += scoreMatch(word.creator) * 10;
		score += scoreMatch(word.commentary) * 5;

		return score;
	}

	return words
		.filter(searchFilter)
		.sort((a, b) => scoreSearch(b) - scoreSearch(a));
}
