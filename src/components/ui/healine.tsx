import { styled } from 'tamagui';
import { Text } from 'tamagui';

export enum HeadlineType {
	h1 = 'h1',
	h1Thin = 'h1Thin',
	h2 = 'h2',
	h2Thin = 'h2Thin',
	h3 = 'h3',
	h3Thin = 'h3Thin',
	h4 = 'h4',
	h4Thin = 'h4Thin',
}

export const Headline = styled(Text, {
	c: '$text',
	fontWeight: '700',
	variants: {
		variant: {
			[HeadlineType.h1]: {
				fontSize: `$10`,
				mb: '$md',
			},
			[HeadlineType.h1Thin]: {
				fontSize: `$10`,
				mb: '$md',
				fontWeight: '400',
			},
			[HeadlineType.h2]: {
				fontSize: `$9`,
				mb: '$md',
			},
			[HeadlineType.h2Thin]: {
				fontSize: `$9`,
				fontWeight: '400',
				mb: '$md',
			},
			[HeadlineType.h3]: {
				fontSize: `$8`,
				mb: '$md',
			},
			[HeadlineType.h3Thin]: {
				fontSize: `$8`,
				mb: '$md',
				fontWeight: '400',
			},
			[HeadlineType.h4]: {
				fontSize: `$7`,
				mb: '$md',
			},
			[HeadlineType.h4Thin]: {
				fontWeight: '400',
				fontSize: `$7`,
				mb: '$md',
			},
		},
	} as const,
});
