import type { JasimaData } from '$lib/types';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch }) => {
	const data: JasimaData = await fetch('/data').then(res => res.json());
	const words = Object.keys(data.data);

	return new Response(render(words), {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};

const render = (words: string[]) =>
	`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>https://nimi.li/</loc></url>
<url><loc>https://nimi.li/about</loc></url>
<url><loc>https://nimi.li/compounds</loc></url>
${words.map(word => `<url><loc>https://nimi.li/${word}</loc></url>`).join('')}
</urlset>`;
