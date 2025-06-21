import { type ViewProps } from 'react-native';
import { View } from 'tamagui';

export function ThemedView(props: ViewProps) {
	return <View bg="$background" {...props} />;
}
