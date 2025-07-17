import { useSupabaseQuery } from '@/src/api/hooks/common/use-supabase-query';
import { getPosts } from '@/src/api/methods/posts/get-posts';
import { Page } from '@/src/components/page';
import { RageOdometer } from '@/src/components/pages/profile/ragometer';
import { Post } from '@/src/components/pages/tabs/home/feed/posts/post';
import { useCurrentUser } from '@/src/context/auth-context';
import { useLocationContext } from '@/src/context/location-context';
import { PostDto } from '@/src/types/posts.types';
import { UserDto } from '@/src/types/user.types';
import { Body, BodyType } from '@ui/body';
import { Button } from '@ui/button';
import { Headline, HeadlineType } from '@ui/healine';
import { ParallaxFlatList } from '@ui/parallax-flat-list';
import { Image } from 'expo-image';
import React, { type FC } from 'react';
import { View, XStack, YStack } from 'tamagui';

const UserProfileHeader = ({ user }: { user: UserDto }) => {
	const blurhash =
		'|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

	return (
		<View alignItems="center" px="$md" gap="$sm">
			<View
				w={100}
				h={100}
				borderRadius={50}
				jc="center"
				alignItems="center"
				bg="$primary40"
			>
				<View w={90} h={90} borderRadius={50} overflow="hidden">
					<Image
						style={{ flex: 1 }}
						source={
							user.profilePhoto
								? { uri: user.profilePhoto }
								: require('@/assets/images/icon-dark.png')
						}
						cachePolicy="memory-disk"
						placeholder={{ blurhash }}
						contentFit="cover"
						transition={1000}
					/>
				</View>
			</View>
			<Headline c="$primary" variant={HeadlineType.h4}>
				@{user.username}
			</Headline>
			<XStack>
				<Button f={1}>Edit Profile</Button>
			</XStack>
			<View mt={25}>
				<RageOdometer rageScore={100} />
				<XStack jc="space-evenly" w="100%">
					<YStack jc="center" alignItems="center" p="$md">
						<Body variant={BodyType.normal}>{user.followerCount}</Body>
						<Body variant={BodyType.small}>Followers</Body>
					</YStack>
					<YStack jc="center" alignItems="center" p="$md">
						<Body variant={BodyType.normal}>{user.followingCount}</Body>
						<Body variant={BodyType.small}>Followers</Body>
					</YStack>
				</XStack>
			</View>
		</View>
	);
};

const Profile: FC = () => {
	// region define auth
	// endregion

	// region hooks
	const currentUser = useCurrentUser();
	const { location } = useLocationContext();
	const {
		data: posts,
		isLoading,
		isFetching,
		isError,
	} = useSupabaseQuery(['user-posts'], getPosts, {
		userId: currentUser?.id || '',
		location,
	});
	// endregion

	// region state variables
	// endregion

	// region useMemos
	// endregion

	// region define apis
	// endregion

	// region methods
	// endregion

	// region useEffects
	// endregion

	if (!currentUser) {
		return null;
	}

	return (
		<Page>
			<View f={1} bg="$background">
				<ParallaxFlatList<PostDto>
					data={posts || []}
					renderItem={({ item }) => (
						<View my="$md">
							<Post post={item as PostDto} />
						</View>
					)}
					headerImage={
						currentUser.profilePhoto
							? { uri: currentUser.profilePhoto }
							: require('@/assets/images/user-header.png')
					}
					HeaderOverlay={() => <UserProfileHeader user={currentUser} />}
				/>
			</View>
		</Page>
	);
};

export default Profile;
