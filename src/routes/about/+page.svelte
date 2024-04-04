<script lang="ts">
	import Link from '$lib/components/Link.svelte';

	let pona = true;
</script>

<svelte:head>
	<title>about &ndash; nimi.li</title>

	<meta name="author" content="ilo Tani" />
	<meta name="description" content="About nimi.li." />
	<meta
		name="keywords"
		content="toki pona, toki pona dictionary, dictionary, nimi, about page, about"
	/>

	<meta property="og:title" content="about – nimi.li" />
	<meta property="og:author" content="ilo Tani and woflydev" />
	<meta property="og:description" content="About nimi.li." />
	<meta property="og:url" content="https://nimi.li/about" />
	<meta property="og:image" content="https://nimi.li/favicon.png" />
	<meta property="og:site_name" content="nimi.li" />
	<meta property="og:type" content="website" />
</svelte:head>

<p>
	<button class="px-2 py-1 interactable" on:click={() => (pona = !pona)}>
		{pona ? 'use English' : 'o toki pona'}
	</button>
</p>

<div class="leading-relaxed">
	{#if pona}
		<h1>sona &ndash; nimi.li</h1>

		<p>
			toki a! mi
			<Link href="https://github.com/cubedhuang/">ilo Tani</Link> li pali e
			ni. jan
			<Link href="https://github.com/woflydev/">woflydev</Link> li ilo PWA
			e lipu ni. sina wile ante pona e lipu ni la, o kepeken ilo
			<Link href="https://github.com/cubedhuang/sona-nimi"
				>GitHub</Link
			>!
		</p>

		<p>
			pali <b>nimi.li</b> la,
		</p>

		<ul>
			<li>
				<Link href="https://linku.la/about/">sona Linku</Link> en
				<Link href="https://lipamanka.gay/essays/dictionary"
					>lipu lipamanka</Link
				>
				li kama e sona nimi.
			</li>

			<li>
				<Link href="https://tokipona.org/compounds.txt"
					>sona ku lili</Link
				>
				pi jan Sonja li kama e ilo ku.
			</li>

			<li>
				sitelen
				<Link
					href="https://www.kreativekorp.com/software/fonts/fairfaxponahd/"
				>
					Fairfax Pona HD
				</Link>
				li sitelen pona e nimi.
			</li>
		</ul>

		<h2>lipu ni</h2>

		<p>
			mi pali e lipu ni kepeken ilo
			<Link href="https://kit.svelte.dev">SvelteKit</Link>
			kepeken ilo
			<Link href="https://www.typescriptlang.org">TypeScript</Link>
			kepeken ilo
			<Link href="https://tailwindcss.com">TailwindCSS</Link>
			kepeken ilo
			<Link href="https://vite-pwa-org.netlify.app/">Vite PWA</Link>.
		</p>

		<h3>ante</h3>

		<p>
			poka ale la, sona pi lipu ni li sama sona Linku. taso, mi wan e sona
			Linku e sona lipamanka la jan li ken lukin sona lipamanka lon lipu
			ni.
		</p>
	{:else}
		<h1>about &ndash; nimi.li</h1>

		<p>
			Hi! I'm <Link href="https://github.com/cubedhuang/">ilo Tani</Link>,
			and I made this project. Thanks to
			<Link href="https://github.com/woflydev/">woflydev</Link>
			for making this a Progressive Web Application. This is an
			<Link href="https://github.com/cubedhuang/sona-nimi">
				open source project on GitHub</Link
			>!
		</p>

		<p>
			<b>nimi.li</b> was built with data from many amazing projects. Thanks
			to all of the following projects for their work:
		</p>

		<ul>
			<li>
				<Link href="https://linku.la/about/">Linku</Link>'s public API
				and <Link href="https://lipamanka.gay/essays/dictionary"
					>lipamanka's semantic space dictionary</Link
				> is used for all of data with the vocabulary.
			</li>

			<li>
				Sonja Lang's
				<Link href="https://tokipona.org/compounds.txt">
					public subsets of ku
				</Link>
				were used for ilo ku.
			</li>

			<li>
				The
				<Link
					href="https://www.kreativekorp.com/software/fonts/fairfaxponahd/"
				>
					Fairfax Pona HD
				</Link>
				font is used for sitelen pona displayed on the site.
			</li>
		</ul>

		<h2>this website</h2>

		<p>
			This website was built with
			<Link href="https://kit.svelte.dev">SvelteKit</Link>,
			<Link href="https://www.typescriptlang.org">TypeScript</Link>,
			<Link href="https://tailwindcss.com">TailwindCSS</Link>, and
			<Link href="https://vite-pwa-org.netlify.app/">Vite PWA</Link>.
		</p>

		<h3>differences</h3>

		<p>
			Almost all data on this website is directly from sona Linku.
			However, I'm also directly scraping lipamanka's semantic space
			dictionary to make them immediately available.
		</p>
	{/if}
</div>

<style lang="postcss">
	h1 {
		@apply mt-4 text-4xl;
	}

	h2 {
		@apply mt-4 text-3xl;
	}

	h3 {
		@apply mt-4 text-xl;
	}

	p {
		@apply mt-2;
	}

	ul {
		@apply mt-2 ml-4 list-disc;
	}
</style>
