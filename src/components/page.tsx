import {
	Dimensions,
	ImageBackground,
	Keyboard,
	Platform,
	StyleSheet,
	TouchableWithoutFeedback,
	useColorScheme,
	ViewProps,
} from 'react-native';
import { FC, useMemo } from 'react';
import { View } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HEADER_HEIGHT, spacing } from '@/src/constants/spacing';

export type PagePropsBase = {
	isSafeArea?: boolean;
	isSafeAreaTop?: boolean;
	isSafeAreaBottom?: boolean;
	withNavigationHeader?: boolean;
};
type PageProps = ViewProps & PagePropsBase;

export const Page: FC<PageProps> = ({
	isSafeAreaBottom,
	isSafeAreaTop,
	isSafeArea,
	children,
	style: _style,
	withNavigationHeader,
}) => {
	const { top, bottom } = useSafeAreaInsets();
	const theme = useColorScheme();
	const styles = useStyles();

	const bgImage = useMemo(() => {
		return theme === 'light'
			? require('@/assets/images/bg-light.png')
			: require('@/assets/images/bg-dark.png');
	}, [theme]);

	const containerStyles = useMemo(() => {
		const stylesArr = [_style, styles.container];

		const isIos = Platform.OS === 'ios';

		const applyPaddingTop = isSafeAreaTop || isSafeArea || withNavigationHeader;

		let paddingTop = isIos ? 0 : spacing.md;

		if (isSafeArea) {
			paddingTop += top;
			stylesArr.push({
				paddingBottom: bottom + spacing.md,
			});
		}

		if (isSafeAreaTop && paddingTop <= spacing.md) {
			paddingTop += top;
		}

		if (isSafeAreaBottom) {
			stylesArr.push({ paddingBottom: bottom + spacing.md });
		}

		if (withNavigationHeader) {
			paddingTop += HEADER_HEIGHT + spacing.md;
		}

		if (applyPaddingTop) {
			stylesArr.push({
				paddingTop,
			});
		}

		return stylesArr;
	}, [
		isSafeArea,
		isSafeAreaTop,
		isSafeAreaBottom,
		_style,
		top,
		bottom,
		withNavigationHeader,
	]);

	return (
		<TouchableWithoutFeedback
			onPress={() => Keyboard.dismiss()}
			style={styles.container}
			accessible={false}
		>
			<>
				<ImageBackground style={styles.imageBg} source={bgImage} />
				<View style={containerStyles}>{children}</View>
			</>
		</TouchableWithoutFeedback>
	);
};

const useStyles = () => {
	const { width, height } = Dimensions.get('window');
	return StyleSheet.create({
		container: {
			flex: 1,
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
		},
		imageBg: {
			position: 'absolute',
			top: 0,
			left: 0,
			minHeight: height,
			minWidth: width,
			resizeMode: 'cover',
			opacity: 0.5,
		},
	});
};
