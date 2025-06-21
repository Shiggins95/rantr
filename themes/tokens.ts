import { createTokens } from 'tamagui';
import { darkColours } from '@/themes/themes';
import { spacing } from '@/src/constants/spacing';

export const tokens = createTokens({
	color: darkColours.color,
	radius: {
		true: 4,
		sm: 4,
		m: 8,
		l: 10,
	},
	space: spacing,
	size: {
		true: 48,
		sm: 14,
		md: 18,
		lg: 24,
		xl: 32,
	},
	zIndex: {
		true: 0,
		base: 0,
		mid: 10,
		high: 100,
		extraHigh: 1000,
	},
});
