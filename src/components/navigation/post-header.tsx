import {
	ContextOption,
	PostCommentHeader,
} from '@/src/components/pages/tabs/home/feed/posts/post-comment-header';
import { HEADER_HEIGHT } from '@/src/constants/spacing';
import { useCurrentUser } from '@/src/context/auth-context';
import { UserDto } from '@/src/types/user.types';
import { Flag, Pencil } from '@tamagui/lucide-icons';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'tamagui';

export const PostPageHeader = () => {
	const { top } = useSafeAreaInsets();
	const router = useRouter();
	const params = useGlobalSearchParams();

	const currentUser = useCurrentUser();

	const handleBackPress = () => {
		if (router.canGoBack()) {
			return router.back();
		}
		if (!currentUser) {
			router.navigate('/(auth)/sign-in');
			return;
		}
		router.navigate('/(app)/(tabs)/(home)');
		return true;
	};

	const { user, createdAt } = useMemo(() => {
		let _user: UserDto | undefined;
		let _createdAt: Date | undefined;

		if (params.user) {
			_user = JSON.parse((params.user as string) || '{}');
		}

		if (params.createdAt) {
			_createdAt = new Date((params.createdAt as string) || '');
		}

		return { user: _user, createdAt: _createdAt };
	}, [params.user, params.createdAt]);

	const postContextOptions = useMemo(() => {
		if (!params.postId || !currentUser || !user) return [];

		const options: ContextOption[] = [];

		if (currentUser.id === user.id) {
			options.push({
				label: 'Edit',
				icon: <Pencil size="$size.md" c="$primary" />,
				onPress: () =>
					router.navigate(`/(app)/(out-of-tabs)/edit-post/${params.postId}`),
			});
		} else {
			options.push({
				label: 'Report',
				onPress: () => console.info('report'),
				icon: <Flag size="$size.md" c="$primary" />,
			});
		}

		return options;
	}, [currentUser, params.postId, user]);

	return (
		<View h={top + HEADER_HEIGHT} pt={top} bg="transparent" px="$md">
			{!!user && !!createdAt && (
				<PostCommentHeader
					withNav
					onBackPress={handleBackPress}
					createdAt={createdAt}
					user={user}
					contextOptions={postContextOptions}
					type="post"
					showDelete
					entityId={params.postId as string}
				/>
			)}
		</View>
	);
};
