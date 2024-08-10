<script lang="ts">
	export let href: string;
</script>

<a
	{href}
	target={href.startsWith('/') || href.startsWith('#') ? undefined : '_blank'}
	rel="noopener noreferrer"
	class="link inline-flex items-center gap-1"
	on:click
>
	<slot />
</a>
