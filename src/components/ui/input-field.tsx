import React, { type FC } from 'react';
import { Input, YStack } from 'tamagui';
import { Body, BodyType } from '@ui/body';
import { TextInputProps } from 'react-native';
import {
	LiteralUnion,
	RegisterOptions,
	useController,
	UseControllerProps,
} from 'react-hook-form';

type LocalProps = {
	label: string;
	marginBottom?: boolean;
	marginTop?: boolean;
	marginVertical?: boolean;
};

export type InputErrorTypes = {
	error?: boolean;
	errorType?: LiteralUnion<keyof RegisterOptions, string>;
	errorMessages?: Partial<
		Record<LiteralUnion<keyof RegisterOptions, string>, string>
	>;
};

export type InputFieldProps = TextInputProps &
	LocalProps &
	UseControllerProps &
	InputErrorTypes;

const InputField: FC<InputFieldProps> = ({
	label,
	marginVertical,
	marginBottom,
	marginTop,
	...rest
}) => {
	// region define auth
	// endregion

	// region hooks
	const { rules, defaultValue, name } = rest;
	const { field, fieldState } = useController({
		name,
		rules,
		defaultValue: defaultValue || '',
	});
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

	console.log(name, defaultValue);

	return (
		<YStack
			my={marginVertical ? '$sm' : 0}
			pb={marginBottom ? '$sm' : 0}
			pt={marginTop ? '$sm' : 0}
		>
			<Body variant={BodyType.small} mb="$sm">
				{label}
			</Body>
			<Input
				{...rest}
				onChangeText={(value: string) => {
					field.onChange(value);
					rest.onChangeText?.(value);
				}}
				borderRadius="$radius.l"
				value={field.value}
			/>
		</YStack>
	);
};

export default InputField;
