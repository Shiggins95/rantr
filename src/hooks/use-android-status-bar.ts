import { useEffect } from 'react';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { darkColours, lightColours } from '@/themes/themes';
import { setBackgroundColorAsync } from 'expo-navigation-bar';
import { useColorScheme } from '@hooks/useColorScheme';
import { Platform } from 'react-native';

export const useAndroidStatusBar = () => {
	const colourScheme = useColorScheme();
	useEffect(() => {
		if (Platform.OS === 'android') {
			setStatusBarBackgroundColor(
				(colourScheme === 'light' ? lightColours : darkColours).color.background
					.val,
			);
			void setBackgroundColorAsync(
				(colourScheme === 'light' ? lightColours : darkColours).color.background
					.val,
			);
		}
	}, [colourScheme]);
};
