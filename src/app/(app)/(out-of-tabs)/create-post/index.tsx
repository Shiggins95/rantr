import { CreatePostForm } from '@/src/components/forms/create-post/create-post-form';
import { Page } from '@/src/components/page';
import { Headline, HeadlineType } from '@ui/healine';
import { Dimensions, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'tamagui';

export default function () {
	const { height } = Dimensions.get('window');
	return (
		<Page isSafeAreaTop withNavigationHeader>
			<TouchableWithoutFeedback
				style={{ flex: 1 }}
				onPress={() => Keyboard.dismiss()}
			>
				<ScrollView
					showsVerticalScrollIndicator={false}
					f={1}
					px="$md"
					style={{ height }}
					contentContainerStyle={{ pb: 100 }}
				>
					<Headline variant={HeadlineType.h3}>Create post</Headline>
					<CreatePostForm />
				</ScrollView>
			</TouchableWithoutFeedback>
		</Page>
	);
}
