import { View } from 'tamagui';

// This is a shim for web and Android where the tab bar is generally opaque.
export default function () {
	return <View position="absolute" style={{ backgroundColor: 'red' }}></View>;
}

export function useBottomTabOverflow() {
	return 0;
}
