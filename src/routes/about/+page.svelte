<script lang="ts">
	import Link from '$lib/components/Link.svelte';

	let tokiPona = true;
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
		{tokiPona ? 'use English' : 'o kepeken toki pona'}
	</button>
</p>

{#if tokiPona}
	<h1 class="mt-4 text-4xl">sona &ndash; nimi.li</h1>

	<p class="mt-2">
		toki a! mi
		<Link href="https://github.com/cubedhuang/">jan Tani</Link> li pali e ni. jan
		<Link href="https://github.com/woflydev/">woflydev</Link> li pona e ni kepeken
		Progressive Web Application. jan ale li ken
		<Link href="https://github.com/cubedhuang/sona-nimi">pona e pali ni</Link>!
	</p>

	<p class="mt-2">
		pali <span class="font-bold">nimi.li</span> li kepeken pali pona mute tan jan
		ante:
	</p>

	<ul class="mt-2 ml-4 list-disc">
		<li>
			ni li kepeken sona pi
			<Link href="https://lipu-linku.github.io/about/jasima/">
				jasima Linku
			</Link> tawa nimi wan.
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

	<h2 class="mt-4 text-3xl">lipu ni</h2>

	<p class="mt-2">
		mi pali e lipu ni kepeken ilo
		<Link href="https://kit.svelte.dev">SvelteKit</Link>
		kepeken ilo
		<Link href="https://www.typescriptlang.org">TypeScript</Link>
		kepeken ilo
		<Link href="https://tailwindcss.com">TailwindCSS</Link>
		kepeken ilo
		<Link href="https://vite-pwa-org.netlify.app/>">Vite PWA</Link>.
	</p>

	<p class="mt-2">
		lipu ni li ante lili tan
		<Link href="https://lipu-linku.github.io">lipu Linku</Link>. mi ante e nimi
		ni:
	</p>

	<ul class="mt-2 ml-4 list-disc">
		<li>
			nimi <Link href="/jule">jule</Link> li kepeken sona sin tan pilin Powa.
		</li>
		<li>
			jan lon ma lili li kepeken e nimi
			<Link href="/inta">inta</Link>,
			<Link href="/kana">kana</Link>,
			<Link href="/sole">sole</Link>,
			<Link href="/ta">ta</Link>. ni li sin tan pilin Powa.
		</li>
		<li>
			nimi <Link href="/konsuno">konsuno</Link> li sin tawa musi.
		</li>
	</ul>
{:else}
	<h1 class="mt-4 text-4xl">about &ndash; nimi.li</h1>

	<p class="mt-2">
		Hi! I'm <Link href="https://github.com/cubedhuang/">jan Tani</Link>, and I
		made this project. Thanks to
		<Link href="https://github.com/woflydev/">woflydev</Link>
		for making this a Progressive Web Application. This is
		<Link href="https://github.com/cubedhuang/sona-nimi">open source</Link>!
	</p>

	<p class="mt-2">
		<span class="font-bold">nimi.li</span> was built with data from many amazing
		projects. Thanks to all of the following projects for their work:
	</p>

	<ul class="mt-2 ml-4 list-disc">
		<li>
			The
			<Link href="https://lipu-linku.github.io/about/jasima/">
				jasima Linku
			</Link>
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

	<h2 class="mt-4 text-3xl">this website</h2>

	<p class="mt-2">
		This website was built with
		<Link href="https://kit.svelte.dev">SvelteKit</Link>,
		<Link href="https://www.typescriptlang.org">TypeScript</Link>,
		<Link href="https://tailwindcss.com">TailwindCSS</Link>, and
		<Link href="https://vite-pwa-org.netlify.app/>">Vite PWA</Link>.
	</p>

	<p class="mt-2">
		A few changes were made from the definitions in
		<Link href="https://lipu-linku.github.io">lipu Linku</Link>:
	</p>

	<ul class="mt-2 ml-4 list-disc">
		<li>
			The word <Link href="/jule">jule</Link> is now using an updated definition
			from pilin Powa, with added commentary.
		</li>
		<li>
			A few words predominant in the ma lili community were added:
			<Link href="/inta">inta</Link>,
			<Link href="/kana">kana</Link>,
			<Link href="/sole">sole</Link>, and
			<Link href="/ta">ta</Link>.
			<span class="italic">(Thanks pilin Powa!)</span>
		</li>
		<li>
			The word <Link href="/konsuno">konsuno</Link> was added (as a joke).
		</li>
	</ul>
{/if}
