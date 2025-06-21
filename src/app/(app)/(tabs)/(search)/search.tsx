import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/src/components/ParallaxScrollView';
import { IconSymbol } from '@ui/IconSymbol';
import { Button } from '@ui/button';
import { useRouter } from 'expo-router';

export default function TabTwoScreen() {
	const router = useRouter();
	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
			headerImage={
				<IconSymbol
					size={310}
					color="#808080"
					name="chevron.left.forwardslash.chevron.right"
					style={styles.headerImage}
				/>
			}
		>
			<Button variant="primary" onPress={() => router.navigate('/test')}>
				Primary
			</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="danger">Danger</Button>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	headerImage: {
		color: '#808080',
		bottom: -90,
		left: -35,
		position: 'absolute',
	},
	titleContainer: {
		flexDirection: 'row',
		gap: 8,
	},
});
