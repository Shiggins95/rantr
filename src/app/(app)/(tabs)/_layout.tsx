import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/src/components/HapticTab';
import { Colours } from '@/src/constants/colours';
import { useNavbarContext } from '@/src/context/navbar-context';
import { useColorScheme } from '@hooks/useColorScheme';
import { useNavigationState } from '@react-navigation/core';
import * as Icon from '@tamagui/lucide-icons';
import TabBarBackground from '@ui/TabBarBackground';
import { View } from 'tamagui';

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const { show, currentTab, setCurrentTab } = useNavbarContext();

	const state = useNavigationState((state) => state);

	useEffect(() => {
		const tabState = state?.routes[state.index]?.state;

		const newTabRouteName =
			tabState?.routes && tabState.index !== undefined
				? tabState.routes[tabState.index].name
				: undefined;

		if (
			newTabRouteName &&
			newTabRouteName !== currentTab &&
			newTabRouteName !== '(create-post)'
		) {
			setCurrentTab(newTabRouteName);
		}

		// console.log('currentTabRouteName', currentTabRouteName);
	}, [state]);

	// useEffect(() => {
	// 	const neValue = show ? 0 : 100;
	// 	translateY.value = withTiming(neValue);
	// }, [show])

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
						bottom: !show ? 1000 : 0,
						position: 'absolute',
						backgroundColor: 'rgb(0,0,0)',
						paddingTop: 10,
						justifyContent: 'space-between',
						flexDirection: 'row',
						flex: 1,
					},
					default: {
						justifyContent: 'center',
						flexDirection: 'row',
						flex: 1,
						backgroundColor: 'rgba(0,0,0,1)',
					},
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
				name="(create-post)"
				options={{
					title: 'Home',
					tabBarShowLabel: false,
					tabBarIcon: () => (
						<View
							bg="$background"
							borderRadius={75}
							w={75}
							h={75}
							jc="center"
							alignItems="center"
							mb={45}
						>
							<View
								w={50}
								h={50}
								jc="center"
								alignItems="center"
								borderRadius="$size.xl"
								borderColor="$primary"
								bg="$primary"
							>
								<Icon.Plus size="$xl" c="$background" />
							</View>
						</View>
					),
				}}
			/>
			<Tabs.Screen
				name="(notifications)"
				options={{
					title: 'Notifications',
					tabBarShowLabel: false,
					tabBarIcon: ({ focused }) => (
						<Icon.Bell size="$lg" c={focused ? '$primary' : '$text'} />
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
