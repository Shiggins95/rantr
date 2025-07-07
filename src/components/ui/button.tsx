import { Button as BaseButton, styled } from 'tamagui';

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
					bg: '$primary',
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
				bw: 2,
				borderColor: '$text',
				color: '$text',
				pressStyle: {
					bg: 'transparent',
					opacity: 0.6,
					bw: 1,
					borderColor: '$text',
				},
			},
			ghost: {
				bg: 'transparent',
				color: '$text',
				bw: 0,
				pressStyle: {
					bg: 'transparent',
					opacity: 0.6,
					bw: 0,
				},
			},
			icon: {
				bg: 'transparent',
				color: '$text',
				borderWidth: 0,
				pressStyle: {
					bg: 'transparent',
					opacity: 0.6,
					bw: 0,
				},
			},
		},
	} as const,
});

export const PostTypeButtons = styled(BaseButton, {
	fontWeight: 700,
	fontSize: '$4',
	h: '$xl',
	w: 100,
	fd: 'row',
	alignItems: 'center',
	jc: 'center',
	disabledStyle: {
		opacity: 0.5,
	},
	textProps: {
		flexShrink: 0,
	},
	variants: {
		variant: {
			rant: {
				bg: '$rantTagBg',
				color: '$rantTagText',
				borderWidth: 1,
				fontWeight: 'bold',
				borderColor: '$rantTagText',
				pressStyle: {
					bg: '$rantTagBg',
					opacity: 0.6,
					borderWidth: 1,
				},
			},
			advice: {
				bg: '$adviceTagBg',
				color: '$adviceTagText',
				borderWidth: 1,
				fontWeight: 'bold',
				borderColor: '$adviceTagText',
				pressStyle: {
					bg: '$adviceTagBg',
					opacity: 0.6,
					borderWidth: 1,
				},
			},
			other: {
				bg: '$otherTagBg',
				color: '$otherTagText',
				borderWidth: 1,
				fontWeight: 'bold',
				borderColor: '$otherTagText',
				pressStyle: {
					bg: '$otherTagBg',
					opacity: 0.6,
					borderWidth: 1,
				},
			},
		},
	},
} as const);
