import { styled } from 'tamagui';
import { Label as TamaguiLabel } from 'tamagui';
import { BodyType } from './body';

export const Label = styled(TamaguiLabel, {
	fontSize: '$5',
	variants: {
		variant: {
			[BodyType.normal]: {
				color: '$text',
				fontWeight: '400',
			},
			[BodyType.bold]: {
				color: '$text',
				fontWeight: '600',
			},
			[BodyType.extraBold]: {
				color: '$text',
				fontWeight: '700',
			},
			[BodyType.italic]: {
				color: '$text',
				fontWeight: '400',
				fontStyle: 'italic',
			},
			[BodyType.italicBold]: {
				color: '$text',
				fontWeight: '600',
				fontStyle: 'italic',
			},
			[BodyType.italicExtraBold]: {
				color: '$text',
				fontWeight: '700',
				fontStyle: 'italic',
			},
			[BodyType.small]: {
				lineHeight: '$3',
				color: '$text',
				fontSize: '$3',
				fontWeight: '400',
			},
			[BodyType.smallBold]: {
				color: '$text',
				fontSize: '$3',
				fontWeight: '600',
			},
			[BodyType.smallExtraBold]: {
				color: '$text',
				fontSize: '$3',
				fontWeight: '700',
			},
			[BodyType.smallItalic]: {
				color: '$text',
				fontSize: '$3',
				fontWeight: '400',
				fontStyle: 'italic',
			},
			[BodyType.smallBoldItalic]: {
				color: '$text',
				fontSize: '$3',
				fontWeight: '600',
				fontStyle: 'italic',
			},
			[BodyType.smallExtraBoldItalic]: {
				color: '$text',
				fontSize: '$3',
				fontWeight: '700',
				fontStyle: 'italic',
			},
		},
	} as const,
});
