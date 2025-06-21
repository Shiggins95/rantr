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
				name="index"
				options={{
					title: 'Home',
					gestureEnabled: true,
				}}
			/>
			<Stack.Screen
				name="test"
				options={{
					title: 'Test',
					gestureEnabled: true,
				}}
			/>
		</Stack>
	);
}
