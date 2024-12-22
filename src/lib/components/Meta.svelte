<script lang="ts">
	interface Props {
		title: string;
		description: string;
		url: string;
		image?: string;
		imageSize?: string;
		keywords?: string[];
	}

	const {
		title,
		description,
		url,
		image = 'https://nimi.li/favicon.png',
		imageSize = '1024',
		keywords = []
	}: Props = $props();

	const baseKeywords = [
		'toki pona, dictionary, nimi, toki pona dictionary, toki pona words, toki pona definitions, toki pona vocabulary, toki pona language, toki pona lessons, toki pona course, toki pona grammar, toki pona phrases, toki pona sentences, toki pona resources, toki pona tools, toki pona website, toki pona wiki'
	];
	const kw = $derived(baseKeywords.concat(keywords).join(', '));
</script>

<svelte:head>
	<title>{title}</title>
	<link rel="canonical" href={url} />
	<link rel="icon" type="image/png" href={image} />

	<meta name="description" content={description} />
	<meta name="keywords" content={kw} />
	<meta name="author" content="ilo Tani" />

	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />

	<meta property="og:url" content={url} />
	{#if image}
		<meta property="og:image" content={image} />
		<meta property="og:image:width" content={imageSize} />
		<meta property="og:image:height" content={imageSize} />
	{/if}
	<meta property="og:site_name" content="nimi.li | Toki Pona Dictionary" />
	<meta property="og:type" content="website" />

	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	{#if image}
		<meta name="twitter:image" content={image} />
	{/if}
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="@cubedhuang" />
</svelte:head>
