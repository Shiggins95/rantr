import { Colours } from '@/src/constants/colours';
import { USER_HEADER_HEIGHT } from '@/src/constants/spacing';
import { JSX } from 'react';
import {
	FlatList,
	ImageSourcePropType,
	ListRenderItem,
	StyleSheet,
	View,
} from 'react-native';
import Animated, {
	interpolate,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

type Props<T> = {
	data: T[];
	renderItem: ListRenderItem<unknown>;
	headerImage: ImageSourcePropType;
	HeaderOverlay?: () => JSX.Element;
};

export function ParallaxFlatList<T>({
	data,
	renderItem,
	headerImage,
	HeaderOverlay,
}: Props<T>) {
	const scrollY = useSharedValue(0);
	const insets = useSafeAreaInsets();
	const styles = useStyles();

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			scrollY.value = event.contentOffset.y;
		},
	});

	const headerAnimatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(scrollY.value, [0, USER_HEADER_HEIGHT / 2], [1, 0]),
		transform: [
			{
				translateY: interpolate(
					scrollY.value,
					[-USER_HEADER_HEIGHT, 0, USER_HEADER_HEIGHT],
					[-USER_HEADER_HEIGHT / 2, 0, USER_HEADER_HEIGHT * 0.75],
				),
			},
			{
				scale: interpolate(
					scrollY.value,
					[-USER_HEADER_HEIGHT, 0, USER_HEADER_HEIGHT],
					[2, 1, 1],
				),
			},
		],
	}));

	if (!data || data.length === 0) {
		return null;
	}

	return (
		<View style={styles.container}>
			<Animated.Image
				source={headerImage}
				style={[styles.header, headerAnimatedStyle]}
				resizeMode="contain"
			/>
			<AnimatedFlatList
				ListHeaderComponent={HeaderOverlay}
				data={data}
				renderItem={renderItem}
				keyExtractor={(_, index) => index.toString()}
				onScroll={scrollHandler}
				scrollEventThrottle={16}
				contentContainerStyle={{
					paddingTop: USER_HEADER_HEIGHT - 50,
					paddingBottom: insets.bottom,
				}}
			/>
		</View>
	);
}

const useStyles = () => {
	const theme = 'dark';
	return StyleSheet.create({
		container: {
			flex: 1,
		},
		header: {
			position: 'absolute',
			width: '100%',
			height: USER_HEADER_HEIGHT,
			top: 0,
			left: 0,
			right: 0,
			zIndex: -1,
			backgroundColor: Colours[theme].background,
		},
	});
};
