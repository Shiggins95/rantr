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
				name="post/[id]/[commentId]/post"
				options={{
					headerShown: true,
					gestureEnabled: true,
					header: PostPageHeader,
				}}
			/>
		</Stack>
	);
}
