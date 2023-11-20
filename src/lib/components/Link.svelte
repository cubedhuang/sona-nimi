<script lang="ts">
	export let href: string;
</script>

<a
	{href}
	target={href.startsWith('/') || href.startsWith('#') ? undefined : '_blank'}
	rel="noopener noreferrer"
	class="text-blue-500 hocus-visible:text-blue-600 transition-colors outline-none outline-offset-4 focus-visible:outline-current rounded"
	on:click
>
	<slot />
</a>
