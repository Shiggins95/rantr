import { styled } from 'tamagui';
import { Button as BaseButton } from 'tamagui';

export const Button = styled(BaseButton, {
	fontWeight: 700,
	color: '$buttonTextColour',
	disabledStyle: {
		opacity: 0.5,
	},
	textProps: {
		flexShrink: 0,
	},
	variants: {
		variant: {
			danger: {
				bg: 'transparent',
				color: '$danger',
				borderColor: 'transparent',
				pressStyle: {
					bg: 'transparent',
					borderColor: 'transparent',
					opacity: 0.6,
				},
			},
			primary: {
				bg: '$primary',
				pressStyle: {
					bg: '$primaryHover',
					opacity: 0.6,
				},
			},
			secondary: {
				bg: '$secondary',
				pressStyle: {
					bg: '$secondaryHover',
					opacity: 0.6,
				},
			},
			outline: {
				bg: 'transparent',
				borderWidth: 2,
				borderColor: '$text',
				color: '$text',
				pressStyle: {
					bg: 'transparent',
					opacity: 0.6,
					borderWidth: 1,
					borderColor: '$text',
				},
			},
			ghost: {
				bg: 'transparent',
				color: '$text',
				borderWidth: 0,
				pressStyle: {
					bg: 'transparent',
					opacity: 0.6,
					borderWidth: 0,
				},
			},
		},
	} as const,
});
