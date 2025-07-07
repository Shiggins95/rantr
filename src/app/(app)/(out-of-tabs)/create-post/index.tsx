import { CreatePostForm } from '@/src/components/forms/create-post/create-post-form';
import { Page } from '@/src/components/page';
import { useToastController } from '@tamagui/toast';
import { Headline, HeadlineType } from '@ui/healine';
import { useRouter } from 'expo-router';
import { Dimensions, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'tamagui';

export default function () {
	const { height } = Dimensions.get('window');
	const toast = useToastController();

	const router = useRouter();

	const onSuccess = () => {
		toast.show('Post created', {
			message: 'Your post has been created',
			type: 'success',
		});

		router.back();
	};

	const onError = () => {
		toast.show('Something went wrong', {
			message: 'Something went wrong when creating your post',
			type: 'error',
			viewportName: 'top-toast',
		});
	};
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
					<CreatePostForm onSuccess={onSuccess} onError={onError} />
				</ScrollView>
			</TouchableWithoutFeedback>
		</Page>
	);
}
