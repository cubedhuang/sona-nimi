<script lang="ts">
	export let id: string | undefined;
</script>

<button
	on:click
	{id}
	class="relative w-full overflow-hidden grid p-4 border border-gray-200 rounded-lg text-left hover:scale-[1.02] hocus:border-gray-400 focus:outline-none transition
		dark:border-gray-800 dark:hocus:border-gray-700"
>
	<slot />
</button>
