import React, { type FC } from 'react';
import { Text, TextProps } from 'tamagui';
import { Headline, HeadlineType } from '@ui/healine';
import { Body, BodyType } from '@ui/body';

type LocalProps =
	| { type: 'headline'; variant: HeadlineType; thinVariant: HeadlineType }
	| { type: 'body'; variant: BodyType; thinVariant: BodyType };

type RantrHeadingProps = TextProps & LocalProps;

const RantrHeading: FC<RantrHeadingProps> = ({
	type,
	variant,
	thinVariant,
}) => {
	if (type === 'headline') {
		return (
			<Text>
				<Headline variant={variant} c="$primary">
					RantR
				</Headline>
			</Text>
		);
	}

	return (
		<Text>
			<Body variant={variant} c="$primary">
				Trusti
			</Body>
			<Body variant={thinVariant} c="$secondary">
				Fi
			</Body>
		</Text>
	);
};

export default RantrHeading;
