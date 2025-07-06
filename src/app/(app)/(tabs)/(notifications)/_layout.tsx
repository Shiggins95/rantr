import { Stack } from 'expo-router';
import React from 'react';

export default function CreatePostStack() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					title: 'Notifications',
					gestureEnabled: true,
				}}
			/>
		</Stack>
	);
}
