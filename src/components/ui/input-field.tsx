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
import { XStack, YStack } from 'tamagui';
import { Input } from './input';

type LocalProps = {
	error?: boolean;
	label?: string;
	marginBottom?: boolean;
	marginTop?: boolean;
	marginVertical?: boolean;
	variant?: 'default' | 'invisible';
	maxWidth?: number;
	height?: number;
	customPaddingBottom?: number;
	suppressMaxLengthIndicator?: boolean;
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
	const { field, fieldState } = useController({
		name,
		rules,
		defaultValue: defaultValue || '',
	});

	return (
		<InputField
			{...props}
			error={!!fieldState.error}
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
			error,
			suppressMaxLengthIndicator,
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
				<XStack alignItems="center" jc="space-between">
					{!!label && (
						<Body variant={BodyType.small} mb="$sm">
							{label}
						</Body>
					)}
					{error && (
						<Body c="$danger" variant={BodyType.extraSmall}>
							Required
						</Body>
					)}
					{rest.maxLength !== undefined &&
						!!rest.value &&
						!suppressMaxLengthIndicator && (
							<Body variant={BodyType.extraSmall}>
								{rest.value.length} / {rest.maxLength}
							</Body>
						)}
				</XStack>
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
