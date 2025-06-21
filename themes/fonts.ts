import { createFont } from 'tamagui';
import { defaultConfig } from '@tamagui/config/v4';

const poppinsFace = {
	100: {
		normal: 'Poppins-Thin',
		italic: 'Poppins-ThinItalic',
	},
	200: {
		normal: 'Poppins-ExtraLight',
		italic: 'Poppins-ExtraLightItalic',
	},
	300: {
		normal: 'Poppins-Light',
		italic: 'Poppins-LightItalic',
	},
	400: {
		normal: 'Poppins-Regular',
		italic: 'Poppins-Italic',
	},
	500: {
		normal: 'Poppins-Medium',
		italic: 'Poppins-MediumItalic',
	},
	600: {
		normal: 'Poppins-SemiBold',
		italic: 'Poppins-SemiBoldItalic',
	},
	700: {
		normal: 'Poppins-Bold',
		italic: 'Poppins-BoldItalic',
	},
	800: {
		normal: 'Poppins-ExtraBold',
		italic: 'Poppins-ExtraBoldItalic',
	},
	900: {
		normal: 'Poppins-Black',
		italic: 'Poppins-BlackItalic',
	},
};

export const headingFont = createFont({
	family: 'Poppins-Regular',
	size: defaultConfig.fonts.heading.size,
	lineHeight: defaultConfig.fonts.heading.lineHeight,
	weight: defaultConfig.fonts.heading.weight,
	letterSpacing: defaultConfig.fonts.heading.letterSpacing,
	face: poppinsFace,
});

export const bodyFont = createFont({
	family: 'Poppins-Regular',
	size: defaultConfig.fonts.body.size,
	lineHeight: defaultConfig.fonts.body.lineHeight,
	weight: defaultConfig.fonts.body.weight,
	letterSpacing: defaultConfig.fonts.body.letterSpacing,
});
