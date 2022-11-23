import type { UsageCategory } from './types';

export const categoryColors: Record<UsageCategory, string> = {
	core: 'bg-emerald-400',
	widespread: 'bg-sky-400',
	common: 'bg-violet-400',
	uncommon: 'bg-yellow-500',
	rare: 'bg-red-500',
	obscure: 'bg-zinc-500'
};
