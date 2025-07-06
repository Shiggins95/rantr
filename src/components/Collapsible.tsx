import { Dispatch, PropsWithChildren, ReactNode, SetStateAction } from 'react';
import { Pressable } from 'react-native';
import { View } from 'tamagui';

type Props = PropsWithChildren & {
	heading: ReactNode;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	onLongPress?: () => void;
};

export function Collapsible({
	children,
	heading,
	open,
	setOpen,
	onLongPress,
}: Props) {
	return (
		<View>
			<Pressable
				onLongPress={onLongPress}
				onPress={() => setOpen((value) => !value)}
			>
				{heading}
			</Pressable>
			{open && <View pb="$md">{children}</View>}
		</View>
	);
}
