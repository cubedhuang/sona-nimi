import { error, json } from '@sveltejs/kit';

export async function GET({ fetch, setHeaders }) {
	const rawText = await fetch('https://lipamanka.gay/essays/dictionary')
		.then(res => res.text())
		.catch(() => '');

	if (!rawText) {
		throw error(500, 'Failed to fetch data');
	}

	const rawDictionary = rawText
		.split('<h2 id="the-dictionary">The Dictionary</h2>')[1]
		.split('<br><br><br>', 1)[0]
		.trim();

	const words: Record<string, string> = {};

	for (const entry of rawDictionary.split('<h3 id="')) {
		if (!entry) {
			continue;
		}

		const [word, ...rest] = entry.split('">');

		const def = rest
			.join('">')
			.slice(word.length + '</h3>'.length)
			.trim();

		if (word === 'mije-and-meli') {
			words.mije = def;
			words.meli = def;
			continue;
		}

		words[word] = def;
	}

	setHeaders({ 'Cache-Control': 's-maxage=3600' });

	return json(words);
}
