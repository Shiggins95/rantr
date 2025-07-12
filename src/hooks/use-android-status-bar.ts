import { darkColours } from '@/themes/themes';
import { setBackgroundColorAsync } from 'expo-navigation-bar';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';

export const useAndroidStatusBar = () => {
	// const colourScheme = useColorScheme();
	const colourScheme = 'dark';
	useEffect(() => {
		if (Platform.OS === 'android') {
			setStatusBarBackgroundColor(darkColours.color.background.val);
			void setBackgroundColorAsync(darkColours.color.background.val);
		}
	}, [colourScheme]);
};
