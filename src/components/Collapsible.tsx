import { PropsWithChildren, ReactNode, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View } from 'tamagui';

type Props = PropsWithChildren & {
	heading: ReactNode;
	isOpenDefault?: boolean;
};

export function Collapsible({ children, heading, isOpenDefault }: Props) {
	const [isOpen, setIsOpen] = useState(isOpenDefault || false);

	return (
		<View>
			<TouchableOpacity
				onPress={() => setIsOpen((value) => !value)}
				activeOpacity={0.8}
			>
				{heading}
			</TouchableOpacity>
			{isOpen && <View pb="$md">{children}</View>}
		</View>
	);
}
