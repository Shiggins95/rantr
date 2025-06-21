import { styled } from 'tamagui';
import { Button as BaseButton } from 'tamagui';

export const Button = styled(BaseButton, {
	fontWeight: 700,
	color: '$buttonTextColour',
	disabledStyle: {
		opacity: 0.5,
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
				},
			},
			secondary: {
				bg: '$secondary',
				pressStyle: {
					bg: '$secondaryHover',
				},
			},
		},
	} as const,
});
