import { spacing } from '@/src/constants/spacing';
import { darkColours } from '@/themes/themes';
import { createTokens } from 'tamagui';

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
		xxl: 42,
	},
	zIndex: {
		true: 0,
		base: 0,
		mid: 10,
		high: 100,
		extraHigh: 1000,
	},
});
