import { Colours } from '@/src/constants/colours';
import { spacing } from '@/src/constants/spacing';
import { PostImageDto } from '@/src/types/post-images.types';
import { useColorScheme } from '@hooks/useColorScheme';
import { RantrImage } from '@ui/image';
import { RantrZoomableImage } from '@ui/zoomable-image';
import { ImageContentFit } from 'expo-image';
import { forwardRef, useCallback, useMemo } from 'react';
import { Dimensions, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, {
	ICarouselInstance,
	Pagination,
} from 'react-native-reanimated-carousel';
import { CarouselRenderItemInfo } from 'react-native-reanimated-carousel/lib/typescript/types';
import { View } from 'tamagui';

type ImageCarouselProps = {
	images: PostImageDto[];
	renderType?: 'feed' | 'post-full' | 'image-full';
	width?: number;
	height?: number;
	dotContainerStyle?: StyleProp<ViewStyle>;
	onClose?: () => void;
	onSingleTap?: () => void;
	startingIndex?: number;
	mode?: 'parallax';
	resizeMode?: ImageContentFit;
};

const { width: windowWidth } = Dimensions.get('window');

export const ImageCarousel = forwardRef<ICarouselInstance, ImageCarouselProps>(
	(
		{
			images,
			renderType,
			width,
			height,
			dotContainerStyle,
			onClose,
			onSingleTap,
			startingIndex,
			resizeMode,
			mode,
		},
		ref,
	) => {
		const progress = useSharedValue<number>(0);
		const styles = useStyles();

		const onPressPagination = (index: number) => {
			if (ref && 'current' in ref && ref.current) {
				ref?.current?.scrollTo({
					/**
					 * Calculate the difference between the current index and the target index
					 * to ensure that the carousel scrolls to the nearest index
					 */
					count: index - progress.value,
					animated: true,
				});
			}
		};

		const componentWidth = useMemo(() => {
			if (renderType === 'image-full') {
				return windowWidth;
			}

			if (renderType === 'post-full') {
				return windowWidth - spacing.md * 2;
			}

			return windowWidth - spacing.md * 2 - spacing.lg * 2;
		}, [renderType, width, spacing.md, spacing.lg]);

		const dotContainerStyles = useMemo(() => {
			return [styles.dotContainer, dotContainerStyle as ViewStyle];
		}, [dotContainerStyle]);

		const renderItem = useCallback(
			({ item }: CarouselRenderItemInfo<PostImageDto>) => {
				return (
					<View
						key={item.id}
						style={{
							flex: 1,
							justifyContent: 'center',
						}}
					>
						{renderType === 'image-full' ? (
							<RantrZoomableImage
								onSingleTap={onSingleTap}
								onClose={onClose}
								src={item.imageUrl}
								resizeMode={resizeMode}
							/>
						) : (
							<RantrImage resizeMode={resizeMode} src={item.imageUrl} />
						)}
					</View>
				);
			},
			[resizeMode],
		);

		return (
			<View f={1}>
				<Carousel
					mode={mode}
					defaultIndex={startingIndex}
					enabled={images.length > 1}
					loop={false}
					ref={ref}
					width={componentWidth}
					height={height || windowWidth / 2}
					data={images}
					onProgressChange={progress}
					renderItem={renderItem}
				/>

				{images.length > 1 && (
					<Pagination.Basic
						progress={progress}
						data={images}
						dotStyle={styles.dot}
						activeDotStyle={styles.activeDot}
						containerStyle={dotContainerStyles}
						onPress={onPressPagination}
					/>
				)}
			</View>
		);
	},
);

const useStyles = () => {
	const theme = useColorScheme() ?? 'dark';
	return StyleSheet.create({
		activeDot: {
			backgroundColor: 'white',
			borderRadius: 50,
			borderWidth: 1,
			borderColor: Colours[theme]?.primary,
		},
		dot: {
			backgroundColor: 'rgba(255,255,255,0.1)',
			borderRadius: 50,
			borderWidth: 1,
			borderColor: Colours[theme]?.primary,
		},
		dotContainer: {
			gap: 5,
			marginTop: 10,
		},
	});
};
