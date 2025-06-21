import { Stack } from 'expo-router';
import React from 'react';

export default function SearchStack() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name="search"
				options={{
					title: 'Search',
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
