import { PostImageDto } from '@/src/types/post-images.types';
import { useMemo, useRef } from 'react';
import { Dimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, {
	ICarouselInstance,
	Pagination,
} from 'react-native-reanimated-carousel';
import { View } from 'tamagui';
import { RantrImage } from '@ui/image';
import { spacing } from '@/src/constants/spacing';
import { Colours } from '@/src/constants/colours';
import { useColorScheme } from '@hooks/useColorScheme';

type ImageCarouselProps = {
	images: PostImageDto[];
	isFullPage?: boolean;
};

const { width } = Dimensions.get('window');

export const ImageCarousel = ({ images, isFullPage }: ImageCarouselProps) => {
	const ref = useRef<ICarouselInstance>(null);
	const progress = useSharedValue<number>(0);
	const theme = useColorScheme() ?? 'dark';

	const onPressPagination = (index: number) => {
		ref.current?.scrollTo({
			/**
			 * Calculate the difference between the current index and the target index
			 * to ensure that the carousel scrolls to the nearest index
			 */
			count: index - progress.value,
			animated: true,
		});
	};

	const componentWidth = useMemo(() => {
		if (isFullPage) {
			return width - spacing.md * 2;
		}
		return width - spacing.md * 2 - spacing.lg * 2;
	}, [isFullPage, width, spacing.md, spacing.lg]);

	return (
		<View f={1}>
			<Carousel
				enabled={images.length > 1}
				loop={false}
				ref={ref}
				width={componentWidth}
				height={width / 2}
				data={images}
				onProgressChange={progress}
				renderItem={({ item }) => (
					<View
						style={{
							flex: 1,
							borderWidth: 1,
							justifyContent: 'center',
						}}
					>
						<RantrImage src={item.imageUrl} />
					</View>
				)}
			/>

			{images.length > 1 && (
				<Pagination.Basic
					progress={progress}
					data={images}
					dotStyle={{
						backgroundColor: 'rgba(255,255,255,0.1)',
						borderRadius: 50,
						borderWidth: 1,
						borderColor: Colours[theme]?.primary,
					}}
					activeDotStyle={{
						backgroundColor: 'white',
						borderRadius: 50,
						borderWidth: 1,
						borderColor: Colours[theme]?.primary,
					}}
					containerStyle={{ gap: 5, marginTop: 10 }}
					onPress={onPressPagination}
				/>
			)}
		</View>
	);
};
