import { Input as BaseInput, styled } from 'tamagui';

export const Input = styled(BaseInput, {
	disabledStyle: {
		opacity: 0.5,
	},
	variants: {
		variant: {
			default: {},
			invisible: {
				// borderColor: 'transparent',
				flex: 1,
				focusStyle: {
					borderColor: 'transparent',
				},
			},
		},
	} as const,
});
