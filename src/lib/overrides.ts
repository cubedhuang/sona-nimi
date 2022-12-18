import type { Word } from './types';

export const overrides: Record<string, Partial<Word>> = {
	jule: {
		creator: 'jan Powa',
		def: {
			en: 'indeterminate, inconclusive, tentative; unpredictable, unstable, volatile; to waver; to vibrate, to tremble, to wobble, to shake'
		},
		commentary:
			"This definition of the word is quite different from the ones present in lipu Linku. This is because certain ideas I had at the time did not pan out in the way that I'd expect. The new version deprecates the 'oscillate, swing' definition to address major overlap with sike, removes the 'wave, tide' definition as it was never used in practice, and adds definitions to characterize the word's actual use better. The actual usage of the word more or less remains the exact same as prior to this quote, but hopefully this clears up the intention behind the word more. — jan Powa"
	}
};
