import { Stack, useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Button } from '@/src/components/ui/button';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';

export default function NotFoundScreen() {
	const router = useRouter();
	const handlePress = () => {
		if (router.canGoBack()) {
			return router.back();
		}

		router.navigate('/(app)/(tabs)/(home)');
	};
	return (
		<>
			<Stack.Screen options={{ title: 'Oops!' }} />
			<ThemedView style={styles.container}>
				<ThemedText type="title">This screen doesn't exist.</ThemedText>
				<Button variant="danger" onPress={handlePress}>
					Go back
				</Button>
			</ThemedView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
});
