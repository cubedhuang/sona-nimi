/// <reference lib="webworker" />

import { build, files, version } from '$service-worker';

const worker = self as unknown as ServiceWorkerGlobalScope;

const CACHE = `cache-${version}`;
const ASSETS = [...build, ...files];

worker.addEventListener('install', event => {
	async function cacheFiles() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);

		return worker.skipWaiting();
	}

	event.waitUntil(cacheFiles());
});

worker.addEventListener('activate', event => {
	async function cacheFiles() {
		// Delete old caches
		const keys = await caches.keys();
		await Promise.all(
			keys.filter(key => key !== CACHE).map(key => caches.delete(key))
		);

		// If files are not cached, add them to the cache
		const cache = await caches.open(CACHE);
		const cached = await cache.keys();
		const cachedUrls = cached.map(request => request.url);
		const expectedUrls = ASSETS.map(
			url => new URL(url, worker.location.href).href
		);
		const expected = expectedUrls.filter(url => !cachedUrls.includes(url));

		await cache.addAll(expected);
	}

	event.waitUntil(cacheFiles());
});

worker.addEventListener('fetch', event => {
	if (event.request.method !== 'GET') return;

	async function respond() {
		const url = new URL(event.request.url);
		const cache = await caches.open(CACHE);

		if (ASSETS.includes(url.pathname)) {
			return cache.match(event.request);
		}

		try {
			const response = await fetch(event.request);

			if (response.status === 200) {
				cache.put(event.request, response.clone());
			}

			return response;
		} catch {
			return cache.match(event.request);
		}
	}

	event.respondWith(respond() as Promise<Response>);
});
