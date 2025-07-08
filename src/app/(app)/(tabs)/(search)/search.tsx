import { Page } from '@/src/components/page';
import { Headline } from '@ui/healine';
import { Dimensions } from 'react-native';
import { View } from 'tamagui';

export default function TabTwoScreen() {
	const { height } = Dimensions.get('window');
	return (
		<Page isSafeAreaTop>
			<View px="$md" h={height}>
				<Headline>Search</Headline>
			</View>
		</Page>
	);
}
