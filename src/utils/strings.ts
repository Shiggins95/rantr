import { PostDto } from '@/src/types/posts.types';

declare global {
	interface String {
		truncate(length: number): string;
	}
}

String.prototype.truncate = function (length: number) {
	return this.substring(0, length) + (this.length > length ? '...' : '');
};

export const getPostTypeColourFromPost = (post: PostDto) => {
	let colour: '$rantTagText' | '$adviceTagText' | '$otherTagText' | '$lime' =
		'$lime';
	switch (post.type) {
		case 'RANT':
			colour = '$rantTagText';
			break;
		case 'ADVICE':
			colour = '$adviceTagText';
			break;
		case 'OTHER':
			colour = '$otherTagText';
			break;
		default:
			break;
	}

	return colour;
};

export const getPostTypeBgColourFromPost = (post: PostDto) => {
	let colour: '$rantTagBg' | '$adviceTagBg' | '$otherTagBg' | '$lime' =
		'$rantTagBg';
	switch (post.type) {
		case 'RANT':
			colour = '$rantTagBg';
			break;
		case 'ADVICE':
			colour = '$adviceTagBg';
			break;
		case 'OTHER':
			colour = '$otherTagBg';
			break;
		default:
			break;
	}

	return colour;
};
