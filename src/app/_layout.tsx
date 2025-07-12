import { Colours } from '@/src/constants/colours';
import { AuthProvider, useAuthContext } from '@/src/context/auth-context';
import { LocationProvider } from '@/src/context/location-context';
import { queryClient } from '@/src/utils/query-client';
import tamaguiConfig from '@/tamagui.config';
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { ToastProvider, ToastViewport } from '@tamagui/toast';
import { QueryClientProvider } from '@tanstack/react-query';
import { CurrentToast } from '@ui/toast';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { PortalProvider, TamaguiProvider } from 'tamagui';

if (__DEV__) {
	require('../reactotron.config');
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	// const colorScheme = useColorScheme();
	const colorScheme = 'dark';
	const { isLoading } = useAuthContext();

	const [loaded] = useFonts({
		Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
		InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),

		'Poppins-Thin': require('@assets/fonts/Poppins-Thin.ttf'),
		'Poppins-ThinItalic': require('@assets/fonts/Poppins-ThinItalic.ttf'),

		'Poppins-ExtraLight': require('@assets/fonts/Poppins-ExtraLight.ttf'),
		'Poppins-ExtraLightItalic': require('@assets/fonts/Poppins-ExtraLightItalic.ttf'),

		'Poppins-Light': require('@assets/fonts/Poppins-Light.ttf'),
		'Poppins-LightItalic': require('@assets/fonts/Poppins-LightItalic.ttf'),

		'Poppins-Regular': require('@assets/fonts/Poppins-Regular.ttf'),
		'Poppins-Italic': require('@assets/fonts/Poppins-Italic.ttf'),

		'Poppins-Medium': require('@assets/fonts/Poppins-Medium.ttf'),
		'Poppins-MediumItalic': require('@assets/fonts/Poppins-MediumItalic.ttf'),

		'Poppins-SemiBold': require('@assets/fonts/Poppins-SemiBold.ttf'),
		'Poppins-SemiBoldItalic': require('@assets/fonts/Poppins-SemiBoldItalic.ttf'),

		'Poppins-Bold': require('@assets/fonts/Poppins-Bold.ttf'),
		'Poppins-BoldItalic': require('@assets/fonts/Poppins-BoldItalic.ttf'),

		'Poppins-ExtraBold': require('@assets/fonts/Poppins-ExtraBold.ttf'),
		'Poppins-ExtraBoldItalic': require('@assets/fonts/Poppins-ExtraBoldItalic.ttf'),

		'Poppins-Black': require('@assets/fonts/Poppins-Black.ttf'),
		'Poppins-BlackItalic': require('@assets/fonts/Poppins-BlackItalic.ttf'),

		'SyneMono-Regular': require('@assets/fonts/SyneMono-Regular.ttf'),
	});

	useEffect(() => {
		if (Platform.OS === 'android') {
			void NavigationBar.setPositionAsync('absolute');
			void NavigationBar.setBackgroundColorAsync(
				Colours[colorScheme ?? 'dark'].background,
			);
		}
		if (loaded && !isLoading) {
			void SplashScreen.hideAsync();
		}
	}, [loaded, isLoading]);

	return (
		<GestureHandlerRootView>
			<KeyboardProvider>
				<QueryClientProvider client={queryClient}>
					<PortalProvider>
						<ToastProvider>
							<LocationProvider>
								<AuthProvider>
									<TamaguiProvider
										config={tamaguiConfig}
										defaultTheme={colorScheme || 'light'}
									>
										<ThemeProvider
											value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
										>
											<Slot />
											<ToastViewport bottom={0} left={0} right={0} />
											<ToastViewport
												name="top-toast"
												top={0}
												left={0}
												right={0}
											/>
											<CurrentToast />
										</ThemeProvider>
									</TamaguiProvider>
								</AuthProvider>
							</LocationProvider>
						</ToastProvider>
					</PortalProvider>
				</QueryClientProvider>
			</KeyboardProvider>
		</GestureHandlerRootView>
	);
}
