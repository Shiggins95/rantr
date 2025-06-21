import React, { type FC } from 'react';
import ParallaxScrollView from '@/src/components/ParallaxScrollView';
import { IconSymbol } from '@ui/IconSymbol';
import { StyleSheet } from 'react-native';

const TestComponent: FC = () => {
	// region define auth
	// endregion

	// region hooks
	// endregion

	// region state variables
	// endregion

	// region useMemos
	// endregion

	// region define apis
	// endregion

	// region methods
	// endregion

	// region useEffects
	// endregion

	return (
		<ParallaxScrollView
			headerImage={
				<IconSymbol
					size={310}
					color="#808080"
					name="chevron.left.forwardslash.chevron.right"
					style={styles.headerImage}
				/>
			}
			headerBackgroundColor={{ light: 'red', dark: 'blue' }}
		/>
	);
};

const styles = StyleSheet.create({
	headerImage: {
		color: '#808080',
		bottom: -90,
		left: -35,
		position: 'absolute',
	},
});

export default TestComponent;
