import { styled } from 'tamagui';
import { Text } from 'tamagui';

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
}

export const Body = styled(Text, {
	c: '$text',
	fontSize: '$5',
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
				fontSize: '$3',
				fontWeight: '400',
			},
			[BodyType.smallBold]: {
				fontSize: '$3',
				fontWeight: '600',
			},
			[BodyType.smallExtraBold]: {
				fontSize: '$3',
				fontWeight: '700',
			},
			[BodyType.smallItalic]: {
				fontSize: '$3',
				fontWeight: '400',
				fontStyle: 'italic',
			},
			[BodyType.smallBoldItalic]: {
				fontSize: '$3',
				fontWeight: '600',
				fontStyle: 'italic',
			},
			[BodyType.smallExtraBoldItalic]: {
				fontSize: '$3',
				fontWeight: '700',
				fontStyle: 'italic',
			},
		},
	} as const,
});
