import { createTamagui } from 'tamagui';
import { defaultConfig } from '@tamagui/config/v4';
import { darkColours, lightColours } from '@/themes/themes';
import { bodyFont, headingFont, monospaceFont } from '@/themes/fonts';
import { tokens } from '@/themes/tokens';

const config = createTamagui({
	...defaultConfig,
	fonts: {
		heading: headingFont,
		button: bodyFont,
		body: bodyFont,
		text: monospaceFont,
	},
	tokens,
	themes: {
		...defaultConfig.themes,
		light: lightColours.color,
		dark: darkColours.color,
	},
	shorthands: {
		px: 'paddingHorizontal',
		py: 'paddingVertical',
		pt: 'paddingTop',
		pb: 'paddingBottom',
		mv: 'marginVertical',
		jc: 'justifyContent',
		fd: 'flexDirection',
		bw: 'borderWidth',
		f: 'flex',
		m: 'margin',
		mb: 'marginBottom',
		my: 'marginVertical',
		mt: 'marginTop',
		w: 'width',
		bg: 'backgroundColor',
		h: 'height',
		p: 'padding',
		c: 'color',
	} as const,
});

type Conf = typeof config;

// this will give you types for your components
// note - if using your own design system, put the package name here instead of tamagui
declare module 'tamagui' {
	interface TamaguiCustomConfig extends Conf {}

	// if you want types for group styling props, define them like so:
	interface TypeOverride {
		groupNames(): 'card';
	}
}

export default config;
