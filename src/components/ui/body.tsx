import { GetThemeValueForKey, styled } from 'tamagui';
import { Text } from 'tamagui';
import { Platform } from 'react-native';

export enum BodyType {
	normal = 'normal',
	bold = 'bold',
	extraBold = 'extraBold',
	italic = 'italic',
	italicBold = 'italicBold',
	italicExtraBold = 'italicExtraBold',
	small = 'small',
	smallBold = 'smallBold',
	smallExtraBold = 'smallExtraBold',
	smallItalic = 'smallItalic',
	smallBoldItalic = 'smallBoldItalic',
	smallExtraBoldItalic = 'smallExtraBoldItalic',
	normalMonospace = 'normalMonospace',
	smallMonospace = 'smallMonospace',
	extraSmallMonospace = 'extraSmallMonospace',
}

const monospaceTypeface = Platform.select({
	ios: 'Menlo',
	android: 'monospace',
});

export const Body = styled(Text, {
	c: '$text',
	fontSize: '$6',
	variants: {
		variant: {
			[BodyType.normal]: {
				fontWeight: '400',
			},
			[BodyType.bold]: {
				fontWeight: '600',
			},
			[BodyType.extraBold]: {
				fontWeight: '700',
			},
			[BodyType.italic]: {
				fontWeight: '400',
				fontStyle: 'italic',
			},
			[BodyType.italicBold]: {
				fontWeight: '600',
				fontStyle: 'italic',
			},
			[BodyType.italicExtraBold]: {
				fontWeight: '700',
				fontStyle: 'italic',
			},
			[BodyType.small]: {
				fontSize: '$5',
				fontWeight: '400',
			},
			[BodyType.smallBold]: {
				fontSize: '$5',
				fontWeight: '600',
			},
			[BodyType.smallExtraBold]: {
				fontSize: '$5',
				fontWeight: '700',
			},
			[BodyType.smallItalic]: {
				fontSize: '$5',
				fontWeight: '400',
				fontStyle: 'italic',
			},
			[BodyType.smallBoldItalic]: {
				fontSize: '$5',
				fontWeight: '600',
				fontStyle: 'italic',
			},
			[BodyType.smallExtraBoldItalic]: {
				fontSize: '$5',
				fontWeight: '700',
				fontStyle: 'italic',
			},
			[BodyType.normalMonospace]: {
				fontWeight: '400',
				fontFamily:
					monospaceTypeface as string as GetThemeValueForKey<'fontFamily'>,
			},
			[BodyType.smallMonospace]: {
				fontWeight: '400',
				fontSize: '$3',
				fontFamily:
					monospaceTypeface as string as GetThemeValueForKey<'fontFamily'>,
			},
			[BodyType.extraSmallMonospace]: {
				fontWeight: '400',
				fontSize: '$3',
				fontFamily:
					monospaceTypeface as string as GetThemeValueForKey<'fontFamily'>,
			},
		},
	} as const,
});
