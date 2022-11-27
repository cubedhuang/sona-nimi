<div class="mt-4 grid grid-cols gap-4">
	<slot />
</div>

<style>
	.grid-cols {
		grid-template-columns: repeat(auto-fill, minmax(min(24rem, 100%), 1fr));
	}
</style>
