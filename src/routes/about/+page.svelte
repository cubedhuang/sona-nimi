<script>
	import DarkModeToggle from '$lib/components/DarkModeToggle.svelte';
</script>

<svelte:head>
	<title>about &ndash; sona nimi</title>

	<meta name="author" content="jan Tani" />
	<meta name="description" content="interactive toki pona dictionary" />
	<meta
		name="keywords"
		content="toki pona, toki pona dictionary, dictionary, nimi, about page, about"
	/>

	<meta property="og:title" content="about – sona nimi" />
	<meta property="og:author" content="jan Tani" />
	<meta property="og:description" content="interactive toki pona dictionary" />
	<meta property="og:url" content="https://nimi.li/about" />
	<meta property="og:site_name" content="sona nimi" />
	<meta property="og:type" content="website" />
</svelte:head>

<div class="flex justify-between items-start">
	<h1 class="text-4xl font-bold">about &ndash; sona nimi</h1>

	<DarkModeToggle />
</div>

<p class="mt-4">
	This project is
	<a
		href="https://github.com/cubedhuang/sona-nimi"
		target="_blank"
		rel="noopener noreferrer"
		class="text-blue-500">open source</a
	>!
</p>

<p class="mt-2">
	<span class="font-bold">sona nimi</span> was built with data from many amazing
	projects. Thanks to all of the following projects for their work:
</p>

<ul class="mt-4 list-disc list-inside">
	<li>
		The <a
			href="https://lipu-linku.github.io/about/jasima/"
			target="_blank"
			rel="noopener noreferrer"
			class="text-blue-500">jasima Linku</a
		> public API is used for all of data with the vocabulary.
	</li>

	<li>
		Sonja Lang's <a
			href="https://tokipona.org/compounds.txt"
			target="_blank"
			rel="noopener noreferrer"
			class="text-blue-500">list of compounds the community uses</a
		> was used for all of the compounds.
	</li>

	<li>
		The <a
			href="https://www.kreativekorp.com/software/fonts/fairfaxponahd/"
			target="_blank"
			rel="noopener noreferrer"
			class="text-blue-500">Fairfax Pona HD</a
		> font is used for sitelen pona displayed on the site.
	</li>
</ul>
