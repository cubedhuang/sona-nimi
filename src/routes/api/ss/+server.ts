import { error } from '@sveltejs/kit';
import jpeg from 'jpeg-js';
import { PNG } from 'pngjs/browser';

export async function GET({ fetch, setHeaders, url }) {
	const word = url.searchParams.get('word');

	if (!word) {
		throw error(400, 'Missing word');
	}

	const imageUrl = `https://raw.githubusercontent.com/lipu-linku/ijo/main/sitelensitelen/jonathangabel/${word}.jpg`;
	const response = await fetch(imageUrl).catch(() => null);

	if (!response || !response.ok) {
		throw error(404, 'Image not found');
	}

	const arrayBuffer = await response.arrayBuffer();

	try {
		const uint8Array = new Uint8Array(arrayBuffer);
		const pngBuffer = await removeWhiteBackground(uint8Array);

		setHeaders({
			'Cache-Control': 's-maxage=31536000',
			'Content-Type': 'image/png'
		});

		return new Response(pngBuffer);
	} catch (err) {
		console.error('Error processing image:', err);
		throw error(500, 'Error processing image');
	}
}

async function removeWhiteBackground(jpegData: jpeg.BufferLike) {
	// Decode JPEG
	const rawImageData = jpeg.decode(jpegData, { useTArray: true });

	// Create a new PNG with the same dimensions
	const png = new PNG({
		width: rawImageData.width,
		height: rawImageData.height,
		filterType: -1
	});

	// Process pixels
	for (let y = 0; y < png.height; y++) {
		for (let x = 0; x < png.width; x++) {
			const idx = (png.width * y + x) << 2;
			const r = rawImageData.data[idx];
			const g = rawImageData.data[idx + 1];
			const b = rawImageData.data[idx + 2];

			// If the pixel is white (or close to white), make it transparent
			if (r > 220 && g > 220 && b > 220) {
				png.data[idx] = 0;
				png.data[idx + 1] = 0;
				png.data[idx + 2] = 0;
				png.data[idx + 3] = 0; // Fully transparent
			} else {
				const min = Math.min(r, g, b);

				png.data[idx] = min;
				png.data[idx + 1] = min;
				png.data[idx + 2] = min;
				png.data[idx + 3] = 255; // Fully opaque
			}
		}
	}

	// Convert PNG to buffer
	return PNG.sync.write(png);
}
