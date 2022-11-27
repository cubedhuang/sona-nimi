<script lang="ts">
	export let width = '24rem';
</script>

<div class="mt-4 grid grid-cols gap-4" style:--col-width={width}>
	<slot />
</div>

<style>
	.grid-cols {
		grid-template-columns: repeat(
			auto-fill,
			minmax(min(var(--col-width), 100%), 1fr)
		);
	}
</style>
