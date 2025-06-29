import { GetThemeValueForKey, styled } from 'tamagui';
import { Text } from 'tamagui';

export enum HeadlineType {
	h1 = 'h1',
	h1Thin = 'h1Thin',
	h1ThinMonospace = 'h1ThinMonospace',
	h1Monospace = 'h1Monospace',
	h2 = 'h2',
	h2Monospace = 'h2Monospace',
	h2Thin = 'h2Thin',
	h2ThinMonospace = 'h2ThinMonospace',
	h3 = 'h3',
	h3Monospace = 'h3Monospace',
	h3Thin = 'h3Thin',
	h3ThinMonospace = 'h3ThinMonospace',
	h4 = 'h4',
	h4Monospace = 'h4Monospace',
	h4Thin = 'h4Thin',
	h4ThinMonospace = 'h4ThinMonospace',
}

const monospaceTypeface =
	'SyneMono-Regular' as GetThemeValueForKey<'fontFamily'>;

export const Headline = styled(Text, {
	c: '$text',
	fontWeight: '700',
	variants: {
		variant: {
			[HeadlineType.h1]: {
				fontSize: `$10`,
				mb: '$md',
			},
			[HeadlineType.h1Monospace]: {
				fontSize: `$10`,
				mb: '$md',
				fontFamily: monospaceTypeface,
			},
			[HeadlineType.h1Thin]: {
				fontSize: `$10`,
				mb: '$md',
				fontWeight: '400',
			},
			[HeadlineType.h1ThinMonospace]: {
				fontSize: `$10`,
				mb: '$md',
				fontWeight: '400',
				fontFamily: monospaceTypeface,
			},
			[HeadlineType.h2]: {
				fontSize: `$9`,
				mb: '$md',
			},
			[HeadlineType.h2Monospace]: {
				fontSize: `$9`,
				mb: '$md',
				fontFamily: monospaceTypeface,
			},
			[HeadlineType.h2Thin]: {
				fontSize: `$9`,
				fontWeight: '400',
				mb: '$md',
			},
			[HeadlineType.h2ThinMonospace]: {
				fontSize: `$9`,
				fontWeight: '400',
				mb: '$md',
				fontFamily: monospaceTypeface,
			},
			[HeadlineType.h3]: {
				fontSize: `$8`,
				mb: '$md',
			},
			[HeadlineType.h3Monospace]: {
				fontSize: `$8`,
				mb: '$md',
				fontFamily: monospaceTypeface,
			},
			[HeadlineType.h3Thin]: {
				fontSize: `$8`,
				mb: '$md',
				fontWeight: '400',
			},
			[HeadlineType.h3ThinMonospace]: {
				fontSize: `$8`,
				mb: '$md',
				fontWeight: '400',
				fontFamily: monospaceTypeface,
			},
			[HeadlineType.h4]: {
				fontSize: `$7`,
				mb: '$md',
			},
			[HeadlineType.h4Monospace]: {
				fontSize: `$7`,
				mb: '$md',
				fontFamily: monospaceTypeface,
			},
			[HeadlineType.h4Thin]: {
				fontWeight: '400',
				fontSize: `$7`,
				mb: '$md',
			},
			[HeadlineType.h4ThinMonospace]: {
				fontWeight: '400',
				fontSize: `$7`,
				mb: '$md',
				fontFamily: monospaceTypeface,
			},
		},
	} as const,
});
