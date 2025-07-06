import { NavigationHeader } from '@/src/components/navigation/basic-header';
import { useNavbarContext } from '@/src/context/navbar-context';
import { RelativePathString, Stack, useRouter } from 'expo-router';
import React from 'react';

export default function CreatePostStack() {
	const { currentTab } = useNavbarContext();
	const router = useRouter();
	const onBackPress = () => {
		router.navigate(`/(app)/(tabs)/${currentTab}` as RelativePathString);
	};

	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: 'Create Post',
					gestureEnabled: true,
					headerShown: true,
					header: () => <NavigationHeader onBackPress={onBackPress} />,
				}}
			/>
		</Stack>
	);
}
