import { PagePropsBase } from '@/src/components/page';
import { ScrollView, ScrollViewProps } from 'tamagui';
import { FC } from 'react';
import {
	Dimensions,
	Keyboard,
	StyleSheet,
	TouchableWithoutFeedback,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '@/src/constants/spacing';

type ScrollPageProps = ScrollViewProps & PagePropsBase;

export const ScrollPage: FC<ScrollPageProps> = ({
	isSafeAreaBottom,
	isSafeAreaTop,
	isSafeArea,
	children,
}) => {
	const { top, bottom } = useSafeAreaInsets();

	const bottomSafeArea = isSafeAreaBottom || isSafeArea;
	const topSafeArea = isSafeAreaTop || isSafeArea;

	const styles = useStyles();

	return (
		<TouchableWithoutFeedback
			onPress={() => Keyboard.dismiss()}
			style={styles.container}
			accessible={false}
		>
			<ScrollView
				bg="$background"
				style={styles.container}
				contentContainerStyle={{
					pb: (bottomSafeArea ? bottom : 0) + spacing.md,
					pt: (topSafeArea ? top : 0) + spacing.md,
				}}
			>
				{children}
			</ScrollView>
		</TouchableWithoutFeedback>
	);
};

const useStyles = () => {
	const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
	return StyleSheet.create({
		container: {
			width: windowWidth,
			height: windowHeight,
			flex: 1,
		},
	});
};
