import { Page } from '@/src/components/page';
import { useAuthContext } from '@/src/context/auth-context';
import { Button } from '@ui/button';
import React, { type FC } from 'react';
import { View } from 'tamagui';

const Profile: FC = () => {
	// region define auth
	// endregion

	// region hooks
	const { signOut } = useAuthContext();
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

	return (
		<Page isSafeAreaTop>
			<View px="$md">
				<Button onPress={signOut}>Sign out</Button>
			</View>
		</Page>
	);
};

export default Profile;
