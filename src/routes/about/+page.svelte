<script lang="ts">
	import Link from '$lib/components/Link.svelte';

	let tokiPona = true;

	const additions = [
		'inta',
		'kana',
		'sole',
		'ta',
		'iseki',
		'nowi',
		'aku',
		'anta'
	];
</script>

<svelte:head>
	<title>about &ndash; nimi.li</title>

	<meta name="author" content="jan Tani" />
	<meta name="description" content="interactive toki pona dictionary" />
	<meta
		name="keywords"
		content="toki pona, toki pona dictionary, dictionary, nimi, about page, about"
	/>

	<meta property="og:title" content="about – nimi.li" />
	<meta property="og:author" content="jan Tani and woflydev" />
	<meta property="og:description" content="interactive toki pona dictionary" />
	<meta property="og:url" content="https://nimi.li/about" />
	<meta property="og:site_name" content="nimi.li" />
	<meta property="og:type" content="website" />
</svelte:head>

<p>
	<button
		class="px-2 py-1 interactable"
		on:click={() => (tokiPona = !tokiPona)}
	>
		{tokiPona ? 'use English' : 'o toki pona'}
	</button>
</p>

{#if tokiPona}
	<h1>sona &ndash; nimi.li</h1>

	<p>
		toki a! mi
		<Link href="https://github.com/cubedhuang/">jan Tani</Link> li pali e ni. jan
		<Link href="https://github.com/woflydev/">woflydev</Link> li pona e ni kepeken
		ilo Progressive Web Application. sina wile pona e lipu ni la,
		<Link href="https://github.com/cubedhuang/sona-nimi">o ni</Link> lon ilo GitHub!
	</p>

	<p>
		pali <b>nimi.li</b> li kepeken pali pona mute tan jan ante:
	</p>

	<ul>
		<li>
			ni li kepeken sona pi
			<Link href="https://linku.la/about/jasima/">jasima Linku</Link> tawa nimi wan.
		</li>

		<li>
			ni li kepeken
			<Link href="https://tokipona.org/compounds.txt">kulupu nimi ni</Link>
			tan jan Sonja tawa kulupu nimi.
		</li>

		<li>
			ni li kepeken sitelen
			<Link href="https://www.kreativekorp.com/software/fonts/fairfaxponahd/">
				Fairfax Pona HD
			</Link> tawa sitelen pona lon lipu.
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
		lipu Linku la, lipu ni li ante. mi tu e kulupu nimi Obscure tawa ni: nimi
		suli ni li awen lon kulupu Obscure. nimi lili ni li kama lon kulupu
		Marginal. mi la, ante ni li pona tan ni: kulupu Linku li sin taso e nimi sin
		suli. taso, nimi mute li kama lili, li awen lon lipu. nimi ni li suli ala, o
		ante tan nimi ante.
	</p>

	<p>
		nimi lili li lon ala lipu Linku. kulupu sin ni la, nimi ni li sin:
		{#each additions as addition, i}
			{#if i !== 0}, {/if}
			<Link href="/{addition}">{addition}</Link>{/each}.
	</p>
{:else}
	<h1>about &ndash; nimi.li</h1>

	<p>
		Hi! I'm <Link href="https://github.com/cubedhuang/">jan Tani</Link>, and I
		made this project. Thanks to
		<Link href="https://github.com/woflydev/">woflydev</Link>
		for making this a Progressive Web Application. This is an
		<Link href="https://github.com/cubedhuang/sona-nimi">
			open source project on GitHub</Link
		>!
	</p>

	<p>
		<b>nimi.li</b> was built with data from many amazing projects. Thanks to all
		of the following projects for their work:
	</p>

	<ul>
		<li>
			The
			<Link href="https://linku.la/about/jasima/">jasima Linku</Link>
			public API is used for all of data with the vocabulary.
		</li>

		<li>
			Sonja Lang's
			<Link href="https://tokipona.org/compounds.txt">
				list of compounds the community uses
			</Link>
			was used for all of the compounds.
		</li>

		<li>
			The
			<Link href="https://www.kreativekorp.com/software/fonts/fairfaxponahd/">
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
		This website has a few differences from Linku. I've split the Obscure
		category into the Obscure and Marginal categories, with the obscure usage
		category containing words with 2-9% usage and the marginal usage category
		containing words with 0-1% usage. I made this change because Linku only adds
		words when they reach the 2% usage threshold, but older words that have
		declined in usage remain, and I wanted to separate those words from the rest
		of the obscure words.
	</p>

	<p>
		I've also added a few words to the marginal category that aren't on Linku:
		{#each additions as addition, i}
			{#if i !== 0}, {/if}
			<Link href="/{addition}">{addition}</Link>{/each}.
	</p>
{/if}

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
