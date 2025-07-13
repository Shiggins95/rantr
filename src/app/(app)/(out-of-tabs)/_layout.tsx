import { NavigationHeader } from '@/src/components/navigation/basic-header';
import { PostPageHeader } from '@/src/components/navigation/post-header';
import { Stack } from 'expo-router';
import React from 'react';

export default function OuterTabsStack() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name="post/[id]/post"
				options={{
					headerShown: true,
					gestureEnabled: true,
					header: PostPageHeader,
				}}
			/>
			<Stack.Screen
				name="post/[id]/[parentId]/post"
				options={{
					headerShown: true,
					gestureEnabled: true,
					header: PostPageHeader,
				}}
			/>
			<Stack.Screen
				name="create-post/index"
				options={{
					headerShown: true,
					gestureEnabled: true,
					header: () => <NavigationHeader />,
				}}
			/>
			<Stack.Screen
				name="edit-post/[id]/index"
				options={{
					headerShown: true,
					gestureEnabled: true,
					header: () => <NavigationHeader />,
				}}
			/>
			<Stack.Screen
				name="search-list-view/index"
				options={{
					headerShown: true,
					gestureEnabled: true,
					header: () => <NavigationHeader />,
				}}
			/>
		</Stack>
	);
}
