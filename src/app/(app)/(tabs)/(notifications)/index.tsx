import { Page } from '@/src/components/page';
import { Headline } from '@ui/healine';
import { View } from 'tamagui';

export default function () {
	return (
		<Page isSafeAreaTop>
			<View px="$md">
				<Headline>Notifications</Headline>
			</View>
		</Page>
	);
}
