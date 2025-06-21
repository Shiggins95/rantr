import { Image, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/src/components/ParallaxScrollView';
import { Button } from '@ui/button';
import { useRouter } from 'expo-router';
import { useAuthContext } from '@/src/context/auth-context';

export default function HomeScreen() {
	const router = useRouter();
	const { signOut } = useAuthContext();

	const triggerGetUserById = async () => {
		router.navigate('/test');
	};

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
			headerImage={
				<Image
					source={require('@assets/images/partial-react-logo.png')}
					style={styles.reactLogo}
				/>
			}
		>
			<Button variant="primary" onPress={triggerGetUserById}>
				Primary
			</Button>
			<Button variant="secondary" onPress={signOut}>
				Secondary
			</Button>
			<Button variant="danger">Danger</Button>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: 'absolute',
	},
});
