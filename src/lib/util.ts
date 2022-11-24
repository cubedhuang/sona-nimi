import type { UsageCategory } from './types';

export const categoryColors: Record<UsageCategory, string> = {
	core: 'bg-emerald-400 dark:bg-emerald-600',
	widespread: 'bg-sky-400 dark:bg-sky-600',
	common: 'bg-violet-400 dark:bg-violet-600',
	uncommon: 'bg-yellow-500 dark:bg-yellow-600',
	rare: 'bg-red-500 dark:bg-red-600',
	obscure: 'bg-zinc-500 dark:bg-zinc-600'
};
