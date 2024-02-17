import { client } from '@kulupu-linku/sona/client';
import { text } from '@sveltejs/kit';

export async function GET({ fetch }) {
	const [words, languages] = [
		await client.v1.words
			.$get({ query: { lang: 'en' } }, { fetch })
			.then(res => res.json()),
		await client.v1.languages.$get({}, { fetch }).then(res => res.json())
	];

	return text(render(Object.keys(words), Object.keys(languages)), {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}

const render = (words: string[], languages: string[]) =>
	`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>https://nimi.li/</loc></url>
<url><loc>https://nimi.li/luka-pona</loc></url>
<url><loc>https://nimi.li/ilo-ku</loc></url>
<url><loc>https://nimi.li/about</loc></url>
${words.map(word => `<url><loc>https://nimi.li/${word}</loc></url>`).join('\n')}
${languages
	.map(lang =>
		lang === 'en'
			? []
			: words.map(
					word =>
						`<url><loc>https://nimi.li/${word}/${lang}</loc></url>`
				)
	)
	.flat()
	.join('\n')}
</urlset>`;
