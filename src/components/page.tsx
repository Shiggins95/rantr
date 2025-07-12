import { HEADER_HEIGHT, spacing } from '@/src/constants/spacing';
import { FC, useMemo } from 'react';
import {
	Dimensions,
	ImageBackground,
	Platform,
	StyleSheet,
	ViewProps,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'tamagui';

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
	// const theme = useColorScheme();
	const theme = 'dark';
	const styles = useStyles();

	const bgImage = useMemo(() => {
		return require('@/assets/images/bg-dark.png');
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
		<View f={1}>
			<ImageBackground style={styles.imageBg} source={bgImage} />
			<View style={containerStyles}>{children}</View>
		</View>
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
