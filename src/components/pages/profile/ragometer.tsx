import { Info } from '@tamagui/lucide-icons';
import { Body } from '@ui/body';
import { Button } from '@ui/button';
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import Animated, {
	interpolateColor,
	runOnJS,
	useAnimatedProps,
	useAnimatedReaction,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import Svg, { G, Path } from 'react-native-svg';
import { View } from 'tamagui';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export function RageOdometer({ rageScore }: { rageScore: number }) {
	const progress = useSharedValue(0);
	const [label, setLabel] = useState('Not bothered');

	const { width: screenWidth } = Dimensions.get('window');

	useEffect(() => {
		const duration = rageScore * 30;
		progress.value = withTiming(rageScore, { duration });
	}, [rageScore]);

	// Animate label change based on progress
	useAnimatedReaction(
		() => progress.value,
		(value) => {
			let newLabel = '';
			if (value < 10) newLabel = 'Dead inside';
			else if (value < 40) newLabel = 'Mildly inconvenienced';
			else if (value < 60) newLabel = 'Slightly unhinged';
			else if (value < 80) newLabel = 'One email away from snapping';
			else newLabel = 'Full bin fire meltdown';

			// Run back on JS thread
			runOnJS(setLabel)(newLabel);
		},
		[],
	);

	const radius = (screenWidth - 50 * 2) / 2;
	const strokeWidth = 50;
	const center = radius + strokeWidth / 2;
	const arcLength = Math.PI * radius;
	const arcPath = describeArc(center, center, radius, 180, 0);

	const animatedStrokeColor = useDerivedValue(() => {
		const colors = ['#FFED66', '#ff6a00', '#EA4F0A'];
		return interpolateColor(progress.value, [0, 50, 100], colors);
	});

	const animatedProps = useAnimatedProps(() => ({
		strokeDashoffset: arcLength * (1 - progress.value / 100),
		stroke: animatedStrokeColor.value,
	}));

	return (
		<View jc="center" alignItems="center">
			<Svg
				width={radius * 2 + strokeWidth}
				height={radius + strokeWidth}
				viewBox={`0 0 ${radius * 2 + strokeWidth} ${radius + strokeWidth}`}
			>
				<G rotation={90} origin={`${center}, ${center}`}>
					<Path
						d={arcPath}
						stroke="rgba(255,255,255,0.1)"
						strokeWidth={strokeWidth}
						fill="none"
						strokeLinecap="round"
						strokeDasharray={arcLength}
					/>
					<AnimatedPath
						d={arcPath}
						stroke="#EA4F0A"
						strokeWidth={strokeWidth}
						fill="none"
						strokeLinecap="round"
						strokeDasharray={arcLength}
						animatedProps={animatedProps}
					/>
				</G>
			</Svg>
			<Button variant="ghost" position="absolute" mt="$lg">
				<Info c="$primary" size="$size.xl" />
			</Button>
			<View mt={-50} mb={25} w={150} jc="center" alignItems="center">
				<Body
					position="absolute"
					maxWidth={150}
					textWrap="wrap"
					numberOfLines={2}
					alignItems="center"
					textAlign="center"
				>
					{label}
				</Body>
			</View>
		</View>
	);
}

// === Arc helpers ===

function describeArc(
	x: number,
	y: number,
	radius: number,
	startAngle: number,
	endAngle: number,
): string {
	const start = polarToCartesian(x, y, radius, startAngle);
	const end = polarToCartesian(x, y, radius, endAngle);
	const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

	return [
		'M',
		start.x,
		start.y,
		'A',
		radius,
		radius,
		0,
		largeArcFlag,
		1,
		end.x,
		end.y,
	].join(' ');
}

function polarToCartesian(
	cx: number,
	cy: number,
	r: number,
	angleInDegrees: number,
) {
	const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
	return {
		x: cx + r * Math.cos(angleInRadians),
		y: cy + r * Math.sin(angleInRadians),
	};
}
