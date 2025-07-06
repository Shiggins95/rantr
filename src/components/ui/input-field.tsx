import { Body, BodyType } from '@ui/body';
import React, { forwardRef } from 'react';
import {
	LiteralUnion,
	RegisterOptions,
	useController,
	UseControllerProps,
} from 'react-hook-form';
import { TextInputProps } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { YStack } from 'tamagui';
import { Input } from './input';

type LocalProps = {
	label?: string;
	marginBottom?: boolean;
	marginTop?: boolean;
	marginVertical?: boolean;
	variant?: 'default' | 'invisible';
	maxWidth?: number;
	height?: number;
	customPaddingBottom?: number;
};

export type InputErrorTypes = {
	error?: boolean;
	errorType?: LiteralUnion<keyof RegisterOptions, string>;
	errorMessages?: Partial<
		Record<LiteralUnion<keyof RegisterOptions, string>, string>
	>;
};

export type ControlledInputFieldProps = TextInputProps &
	LocalProps &
	UseControllerProps &
	InputErrorTypes;

export type InputFieldProps = TextInputProps & LocalProps;

export const ControlledInputField = (props: ControlledInputFieldProps) => {
	const { rules, defaultValue, name } = props;
	const { field } = useController({
		name,
		rules,
		defaultValue: defaultValue || '',
	});

	return (
		<InputField
			{...props}
			onChangeText={(value: string) => {
				field.onChange(value);
				props.onChangeText?.(value);
			}}
			value={field.value}
		/>
	);
};

const InputField = forwardRef<TextInput, InputFieldProps>(
	(
		{
			label,
			marginVertical,
			marginBottom,
			marginTop,
			variant,
			maxWidth,
			customPaddingBottom,
			height,
			...rest
		},
		ref,
	) => {
		return (
			<YStack
				my={marginVertical ? '$sm' : 0}
				pb={customPaddingBottom || marginBottom ? '$sm' : 0}
				pt={marginTop ? '$sm' : 0}
				maxWidth={maxWidth}
				f={variant === 'invisible' ? 1 : undefined}
			>
				{!!label && (
					<Body variant={BodyType.small} mb="$sm">
						{label}
					</Body>
				)}
				<Input
					{...rest}
					ref={ref}
					variant={variant}
					onChangeText={rest.onChangeText}
					borderRadius="$radius.l"
					value={rest.value}
					h={height}
					bg="$background"
					borderColor="$color.borderColor"
				/>
			</YStack>
		);
	},
);

export default InputField;
