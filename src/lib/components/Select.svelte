<script lang="ts" generics="T">
	/* eslint no-undef: off */

	interface Props {
		options: {
			label: string;
			value: T;
		}[];
		name: string;
		value: T;
		onchange?: (value: T) => void;
	}

	let { options, name, value = $bindable(), onchange }: Props = $props();
</script>

<label class="relative max-w-full">
	<span class="sr-only">{name}</span>

	<select
		bind:value
		onchange={() => onchange?.(value as T)}
		class="interactable max-w-full appearance-none text-ellipsis py-0.5 pl-2 pr-10"
	>
		{#each options as option}
			<option value={option.value} selected={option.value === value}>
				{option.label}
			</option>
		{/each}
	</select>

	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 20 20"
		aria-hidden="true"
		class="pointer-events-none absolute right-2 top-1/2 size-6 -translate-y-1/2 select-none text-muted"
	>
		<path
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="1.5"
			d="M6 8l4 4 4-4"
		/>
	</svg>
</label>
