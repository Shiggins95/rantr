import { ListFilter } from '@tamagui/lucide-icons';
import { Body, BodyType } from '@ui/body';
import { Button, PostTypeButtons } from '@ui/button';
import { Headline, HeadlineType } from '@ui/healine';
import Popover from '@ui/popover';
import Constants from 'expo-constants';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image, View } from 'tamagui';

type HeaderProps = {
	setCurrentTag: Dispatch<SetStateAction<string>>;
	currentTag: string;
};

export const HomeHeader = ({ setCurrentTag, currentTag }: HeaderProps) => {
	const [openFilters, setOpenFilters] = useState(false);
	const { top } = useSafeAreaInsets();
	const topPadding = useMemo(() => {
		let paddingTop = Constants.statusBarHeight || 0;

		if (paddingTop === 0) {
			paddingTop += top;
		}

		return paddingTop;
	}, [top]);

	const tags: {
		label: string;
		buttonType: 'rant' | 'advice' | 'other';
		textColour: '$otherTagText' | '$rantTagText' | '$adviceTagText';
	}[] = [
		{ label: 'RANT', buttonType: 'rant', textColour: '$rantTagText' },
		{ label: 'ADVICE', buttonType: 'advice', textColour: '$adviceTagText' },
		{ label: 'OTHER', buttonType: 'other', textColour: '$otherTagText' },
	];

	const handleFilterPress = (tag: string) => {
		setCurrentTag(tag);
	};

	return (
		<View
			px="$md"
			pt={topPadding}
			fd="row"
			jc="space-between"
			alignItems="center"
		>
			<Image
				w={100}
				h={50}
				source={require('@assets/images/rantr-header.png')}
			/>

			<View fd="row" alignItems="center" gap="$sm">
				<Popover
					open={openFilters}
					setOpen={setOpenFilters}
					icon={
						<View position="relative" marginRight="$md">
							<ListFilter size="$xl" c={'$primary'} borderRadius="$l" />
							{!!currentTag && (
								<View
									position="absolute"
									bottom={0}
									left={0}
									bg="$primary"
									w={15}
									h={15}
									jc="center"
									alignItems="center"
									borderRadius="$l"
								>
									<Body
										variant={BodyType.small}
										fontSize="$2"
										c="$background"
										position="absolute"
									>
										1
									</Body>
								</View>
							)}
						</View>
					}
				>
					<View>
						<Headline variant={HeadlineType.h2}>Filters</Headline>
						<View fd="row" gap="$md" jc="space-evenly" alignItems="center">
							{tags.map((tag) => (
								<PostTypeButtons
									onPress={() => handleFilterPress(tag.label)}
									key={tag.label}
									variant={tag.buttonType}
									bw={tag.label === currentTag ? 2 : 1}
									fontWeight={tag.label === currentTag ? '900' : 'normal'}
								>
									{tag.label}
								</PostTypeButtons>
							))}
						</View>
						<Button
							h="$xl"
							mt="$lg"
							variant="primary"
							onPress={() => handleFilterPress('')}
						>
							Clear filters
						</Button>
					</View>
				</Popover>
			</View>
		</View>
	);
};
