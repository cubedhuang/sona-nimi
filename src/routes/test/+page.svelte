<script lang="ts">
	import { fly } from 'svelte/transition';

	import type { BookName, CoinedEra, UsageCategory, Word } from '$lib/types';

	import type { PageData } from './$types';

	import Link from '$lib/components/Link.svelte';
	import X from '$lib/components/X.svelte';
	import { categoryColors } from '$lib/util';

	export let data: PageData;

	$: linku = data.linku;
	$: words = Object.values(linku.data);

	const keys: (keyof Word)[] = [
		'word',
		'def',
		'book',
		'commentary',
		'sitelen_pona',
		'sitelen_pona_etymology',
		'recognition',
		'ucsur',
		'sitelen_sitelen',
		'sitelen_emosi',
		'luka_pona',
		'audio',
		'coined_year',
		'coined_era',
		'usage_category',
		'source_language',
		'etymology',
		'creator',
		'ku_data',
		'see_also'
	];

	$: frequencies = keys.map(key => {
		const values = words.map(word => word[key]);
		const existing = values.filter(value => value);
		const unique = new Set(existing).size;

		return { key, count: existing.length, unique };
	});

	$: usageCategoryFrequencies = words.reduce(
		(acc, word) => {
			acc[word.usage_category]++;
			return acc;
		},
		{
			core: 0,
			widespread: 0,
			common: 0,
			uncommon: 0,
			rare: 0,
			obscure: 0
		} satisfies Record<UsageCategory, number>
	);

	function getCategoryColor(category: string) {
		return category in categoryColors
			? categoryColors[category as UsageCategory]
			: '';
	}

	$: booksFrequencies = words.reduce(
		(acc, word) => {
			acc[word.book]++;
			return acc;
		},
		{
			pu: 0,
			'ku suli': 0,
			'ku lili': 0,
			none: 0
		} satisfies Record<BookName, number>
	);

	$: coinedEraFrequencies = words.reduce(
		(acc, word) => {
			acc[word.coined_era ?? 'unknown']++;
			return acc;
		},
		{
			'pre-pu': 0,
			'post-pu': 0,
			'post-ku': 0,
			unknown: 0
		} satisfies Record<CoinedEra | 'unknown', number>
	);

	$: compounds = Object.values(data.compounds);

	$: glyphFrequencies = compounds.reduce((acc, compound) => {
		acc[compound.glyphs?.length ?? 0] ??= 0;
		acc[compound.glyphs?.length ?? 0]++;
		return acc;
	}, [] as Record<number, number>);

	let detailsOpen = false;
</script>

<svelte:head>
	<title>super secret testing page &ndash; nimi.li</title>

	<meta name="author" content="jan Tani" />
	<meta name="description" content="interactive toki pona dictionary" />

	<meta property="og:title" content="super secret testing page – nimi.li" />
	<meta property="og:author" content="jan Tani" />
	<meta property="og:description" content="interactive toki pona dictionary" />
	<meta property="og:url" content="https://nimi.li/test" />
	<meta property="og:site_name" content="nimi.li" />
	<meta property="og:type" content="website" />
</svelte:head>

<h1 class="text-4xl">super secret testing page</h1>

<h2 class="mt-4 text-3xl">styles</h2>

<p class="mt-2">
	<button
		class="px-2 py-1 interactable"
		on:click={() => {
			detailsOpen = !detailsOpen;
		}}
	>
		toggle details
	</button>
</p>

{#if detailsOpen}
	<div
		class="details top-auto max-h-80 md:max-h-[40rem]"
		transition:fly={{ y: 24, duration: 300 }}
	>
		<div class="flex">
			<h2 class="text-2xl">title</h2>

			<button
				class="ml-auto p-1 interactable"
				on:click={() => {
					detailsOpen = false;
				}}
			>
				<X />
			</button>
		</div>

		<p class="font-pona text-4xl">ni li seme a</p>

		<p class="mt-2">
			mi sona <Link href="/ala">ala</Link>
		</p>
	</div>
{/if}

<h2 class="mt-4 text-3xl" data-sveltekit-preload-data="off">
	<Link href="/data/linku">linku data</Link>
	<span class="font-text text-sm faded">
		({words.length})
	</span>
</h2>

<p class="mt-2">
	<span class="font-bold">Note:</span> nimi.li modifies and adds a few words, so
	a few things might not match up.
</p>

<h3 class="mt-4 text-2xl">keys</h3>

<table class="mt-2">
	<thead>
		<tr class="text-left">
			<th class="px-2 py-0.5 border border-gray-200 dark:border-gray-800">
				key
			</th>
			<th class="px-2 py-0.5 border border-gray-200 dark:border-gray-800">
				# of words with value
			</th>
			<th class="px-2 py-0.5 border border-gray-200 dark:border-gray-800">
				# of non-empty unique values
			</th>
		</tr>
	</thead>
	<tbody>
		{#each frequencies as { key, count, unique }}
			<tr>
				<td class="px-2 py-0.5 border border-gray-200 dark:border-gray-800">
					{key}
				</td>
				<td class="px-2 py-0.5 border border-gray-200 dark:border-gray-800">
					{count}
				</td>
				<td class="px-2 py-0.5 border border-gray-200 dark:border-gray-800">
					{unique}
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<h3 class="mt-4 text-2xl">more stats</h3>

<table class="inline-table mt-2">
	<thead>
		<tr class="text-left">
			<th class="px-2 py-0.5 border border-gray-200 dark:border-gray-800">
				usage
			</th>
			<th class="px-2 py-0.5 border border-gray-200 dark:border-gray-800">
				count
			</th>
		</tr>
	</thead>
	<tbody>
		{#each Object.entries(usageCategoryFrequencies) as [category, count]}
			<tr>
				<td class="px-2 py-0.5 border border-gray-200 dark:border-gray-800">
					<span class="flex items-center gap-2">
						<span class="w-2 h-2 rounded-full {getCategoryColor(category)}" />

						{category}
					</span>
				</td>
				<td class="px-2 py-0.5 border border-gray-200 dark:border-gray-800">
					{count}
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<table class="inline-table mt-2">
	<thead>
		<tr class="text-left">
			<th class="px-2 py-0.5 border border-gray-200 dark:border-gray-800">
				book
			</th>
			<th class="px-2 py-0.5 border border-gray-200 dark:border-gray-800">
				count
			</th>
		</tr>
	</thead>
	<tbody>
		{#each Object.entries(booksFrequencies) as [book, count]}
			<tr>
				<td class="px-2 py-0.5 border border-gray-200 dark:border-gray-800">
					{book}
				</td>
				<td class="px-2 py-0.5 border border-gray-200 dark:border-gray-800">
					{count}
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<table class="inline-table mt-2">
	<thead>
		<tr class="text-left">
			<th class="px-2 py-0.5 border border-gray-200 dark:border-gray-800">
				coined era
			</th>
			<th class="px-2 py-0.5 border border-gray-200 dark:border-gray-800">
				count
			</th>
		</tr>
	</thead>
	<tbody>
		{#each Object.entries(coinedEraFrequencies) as [era, count]}
			<tr>
				<td class="px-2 py-0.5 border border-gray-200 dark:border-gray-800">
					{era}
				</td>
				<td class="px-2 py-0.5 border border-gray-200 dark:border-gray-800">
					{count}
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<h2 class="mt-4 text-3xl" data-sveltekit-preload-data="off">
	<Link href="/data/compounds">compounds</Link>
	<span class="font-text text-sm faded">
		({compounds.length})
	</span>
</h2>

<table class="inline-table mt-2">
	<thead>
		<tr class="text-left">
			<th class="px-2 py-0.5 border border-gray-200 dark:border-gray-800">
				unique glyphs
			</th>
			<th class="px-2 py-0.5 border border-gray-200 dark:border-gray-800">
				count
			</th>
		</tr>
	</thead>
	<tbody>
		{#each Object.entries(glyphFrequencies) as [amount, count]}
			<tr>
				<td class="px-2 py-0.5 border border-gray-200 dark:border-gray-800">
					{amount}
				</td>
				<td class="px-2 py-0.5 border border-gray-200 dark:border-gray-800">
					{count}
				</td>
			</tr>
		{/each}
	</tbody>
</table>
