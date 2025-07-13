import { useSupabaseQuery } from '@/src/api/hooks/common/use-supabase-query';
import { getPost } from '@/src/api/methods/posts/get-post';
import { CreateEditPostForm } from '@/src/components/forms/create-edit-post/create-edit-post-form';
import { Page } from '@/src/components/page';
import { useCurrentUser } from '@/src/context/auth-context';
import { useToastController } from '@tamagui/toast';
import { Headline, HeadlineType } from '@ui/healine';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Dimensions, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'tamagui';

export default function () {
	const { id: postId } = useLocalSearchParams();
	const currentUser = useCurrentUser();

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

	const {
		data: post,
		isLoading,
		isFetching,
		isError,
	} = useSupabaseQuery(['post', postId], getPost, {
		postId: postId as string,
		userId: currentUser?.id || '',
	});

	if (isLoading || isFetching || isError) {
		// todo loading state
		return null;
	}

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
					<CreateEditPostForm
						onSuccess={onSuccess}
						onError={onError}
						defaultPost={post}
					/>
				</ScrollView>
			</TouchableWithoutFeedback>
		</Page>
	);
}
