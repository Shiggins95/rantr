import React, { JSX } from 'react';

import { Colours } from '@/src/constants/colours';
import { spacing } from '@/src/constants/spacing';
import { useAuthContext } from '@/src/context/auth-context';
import { IconProps } from '@tamagui/helpers-icon';
import { Bell, Home, MapPin, Plus, User2 } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import {
	TabList,
	Tabs,
	TabSlot,
	TabTrigger,
	TabTriggerSlotProps,
} from 'expo-router/ui';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CustomTabButtonProps
	extends React.PropsWithChildren,
		TabTriggerSlotProps {
	Icon: (props: IconProps) => JSX.Element;
}

const CustomTabButton = React.forwardRef<View, CustomTabButtonProps>(
	({ Icon, ...rest }, ref) => {
		return (
			<Pressable
				hitSlop={{ top: 10, left: 20, right: 20, bottom: 100 }}
				ref={ref}
				{...rest}
			>
				<Icon c={rest.isFocused ? '$primary' : '$text'} />
			</Pressable>
		);
	},
);

const CreatePostButton = () => {
	const router = useRouter();
	const styles = useStyles();
	return (
		<Pressable
			style={styles.createPostButton}
			onPress={() => router.navigate('/(app)/(out-of-tabs)/create-post')}
		>
			<View style={styles.createPostButtonInner}>
				<Plus c="$background" />
			</View>
		</Pressable>
	);
};

export default function Layout() {
	const styles = useStyles();
	const { guestMode } = useAuthContext();
	return (
		<View style={styles.flex}>
			<Tabs>
				<TabSlot />
				<TabList style={styles.tabList}>
					<TabTrigger name="(home)" href="/(app)/(tabs)/(home)" asChild>
						<CustomTabButton Icon={Home} />
					</TabTrigger>
					<TabTrigger
						name="(search)"
						href="/(app)/(tabs)/(search)/search"
						asChild
						style={!guestMode ? styles.mr50 : undefined}
					>
						<CustomTabButton Icon={MapPin} />
					</TabTrigger>

					{!guestMode && <CreatePostButton />}

					<TabTrigger
						name="(notifications)"
						href="/(app)/(tabs)/(notifications)"
						asChild
						style={!guestMode ? styles.ml50 : undefined}
					>
						<CustomTabButton Icon={Bell} />
					</TabTrigger>
					<TabTrigger
						name="(profile)"
						href="/(app)/(tabs)/(profile)/profile"
						asChild
					>
						<CustomTabButton Icon={User2} />
					</TabTrigger>
				</TabList>
			</Tabs>
		</View>
	);
}

const useStyles = () => {
	const { bottom } = useSafeAreaInsets();
	const { width } = Dimensions.get('window');
	// const theme = useColorScheme() ?? 'dark';
	const theme = 'dark';
	return StyleSheet.create({
		flex: { flex: 1 },
		mr50: { marginRight: 50 },
		ml50: { marginLeft: 50 },
		tabList: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingHorizontal: spacing.xl,
			paddingTop: spacing.md,
			paddingBottom: bottom + spacing.md,
			backgroundColor: Colours[theme].background,
		},
		createPostButton: {
			width: 70,
			height: 70,
			position: 'absolute',
			top: -25,
			left: width / 2 - 35,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: Colours[theme].background,
			borderRadius: 40,
		},
		createPostButtonInner: {
			width: 50,
			height: 50,
			backgroundColor: Colours[theme].primary,
			borderRadius: 25,
			justifyContent: 'center',
			alignItems: 'center',
		},
	});
};
