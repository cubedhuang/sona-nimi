const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				pona: ['"Fairfax Pona HD"', ...defaultTheme.fontFamily.sans],
				text: ['"SFProText"', ...defaultTheme.fontFamily.sans],
				display: ['"SFRounded"', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant('hocus', ['&:hover', '&:focus']);
			addVariant('hocus-visible', ['&:hover', '&:focus-visible']);
			addVariant('group-hocus', ['.group:hover &', '.group:focus &']);
			addVariant('group-hocus-visible', [
				'.group:hover &',
				'.group:focus-visible &'
			]);
		})
	]
};
