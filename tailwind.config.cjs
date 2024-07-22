const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
				pona: ['"ssk"', ...defaultTheme.fontFamily.sans],
				display: ['"SFRounded"', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: [
		plugin(({ addVariant }) => {
			addVariant('hf', ['&:hover', '&:focus']);
			addVariant('hv', ['&:hover', '&:focus-visible']);
			addVariant('group-hf', ['.group:hover &', '.group:focus &']);
			addVariant('group-hv', [
				'.group:hover &',
				'.group:focus-visible &'
			]);
		}),
		plugin(({ matchUtilities, theme }) => {
			matchUtilities(
				{
					'grid-cols-fill': size => ({
						gridTemplateColumns: `repeat(auto-fill, minmax(minmax(${size}, 1fr)), 100%)`
					})
				},
				{ values: theme('width') }
			);
		})
	]
};
