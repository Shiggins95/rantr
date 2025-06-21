import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/src/components/HapticTab';
import TabBarBackground from '@ui/TabBarBackground';
import { Colours } from '@/src/constants/colours';
import { useColorScheme } from '@hooks/useColorScheme';
import * as Icon from '@tamagui/lucide-icons';

// const x: keyof typeof Icon = 'User2';

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarHideOnKeyboard: true,
				tabBarActiveTintColor: Colours[colorScheme ?? 'light'].tint,
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarBackground: TabBarBackground,
				tabBarStyle: Platform.select({
					ios: {
						// Use a transparent background on iOS to show the blur effect
						position: 'absolute',
						backgroundColor: 'rgba(255,255,255, 0.1)',
						paddingTop: 10,
					},
					default: {},
				}),
			}}
		>
			<Tabs.Screen
				name="(home)"
				options={{
					title: 'Home',
					tabBarShowLabel: false,
					tabBarIcon: ({ focused }) => (
						<Icon.Home size="$lg" c={focused ? '$primary' : '$text'} />
					),
				}}
			/>
			<Tabs.Screen
				name="(search)"
				options={{
					title: 'Search',
					tabBarShowLabel: false,
					tabBarIcon: ({ focused }) => (
						<Icon.Search size="$lg" c={focused ? '$primary' : '$text'} />
					),
				}}
			/>
			<Tabs.Screen
				name="(profile)"
				options={{
					title: 'Profile',
					tabBarShowLabel: false,
					tabBarIcon: ({ focused }) => (
						<Icon.User2 size="$lg" c={focused ? '$primary' : '$text'} />
					),
				}}
			/>
		</Tabs>
	);
}
