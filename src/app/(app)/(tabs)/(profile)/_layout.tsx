import { Stack } from 'expo-router';
import React from 'react';

export default function HomeStack() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name="profile"
				options={{
					title: 'Profile',
					gestureEnabled: true,
				}}
			/>
		</Stack>
	);
}
