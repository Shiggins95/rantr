import { Stack } from 'expo-router';
import React from 'react';
import { PostPageHeader } from '@/src/components/navigation/post-header';

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
		</Stack>
	);
}
