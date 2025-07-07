import { Image, ImageContentFit, ImageStyle } from 'expo-image';
import { useMemo } from 'react';
import { StyleProp, StyleSheet } from 'react-native';

type ImageProps = {
	src?: string;
	width?: number;
	height?: number;
	resizeMode?: ImageContentFit;
};

export const RantrImage = ({ src, width, height, resizeMode }: ImageProps) => {
	const blurhash =
		'|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

	const imageStyle = useMemo(() => {
		return {
			...styles.image,
			width: width || '100%',
			height: height || '100%',
			resizeMode,
		};
	}, [width, height, resizeMode]);

	return (
		<Image
			style={imageStyle as StyleProp<ImageStyle>}
			source={{ uri: src }}
			cachePolicy="memory-disk"
			placeholder={{ blurhash }}
			contentFit={resizeMode}
			transition={1000}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		flex: 1,
		width: '100%',
		backgroundColor: '#0553',
	},
});
