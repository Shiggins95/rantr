import { useDebounce } from '@hooks/use-debounce';
import { Body, BodyType } from '@ui/body';
import React, { forwardRef, useState } from 'react';
import {
	LiteralUnion,
	RegisterOptions,
	useController,
	UseControllerProps,
} from 'react-hook-form';
import { Platform, TextInputProps } from 'react-native';
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

type DebouncedInputFieldProps = Omit<InputFieldProps, 'onChange'> & {
	onChangeText: (value: string) => void;
	immediateOnChange?: (value: string) => void;
	delay: number;
};

export const DebouncedInputField = (props: DebouncedInputFieldProps) => {
	// Local state to keep track of the input value, ensuring it stays in sync with the displayed value.
	const [value, setValue] = useState<string>(props.value as string);

	// Debounce the parent's onChange callback to reduce frequent updates and improve performance.
	useDebounce(
		() => {
			props.onChangeText(value);
		},
		props.delay,
		[value],
	);

	// Render a regular input field.
	// This input is not directly controlled by the parent but instead managed locally
	// and updates to the parent only after the debounced delay. This shouldn't be used in conjunction with a form,
	// which is why we don't render a controlled input.
	return (
		<InputField
			{...props}
			onChangeText={(newValue) => {
				props.immediateOnChange?.(newValue);
				setValue(newValue);
			}}
			value={value}
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
					px="$md"
					variant={variant}
					onChangeText={rest.onChangeText}
					borderRadius="$radius.l"
					value={rest.value}
					h={height}
					bg="$background"
					borderColor="$color.borderColor"
					verticalAlign={
						Platform.OS === 'android' && rest.multiline
							? 'top'
							: rest.textAlignVertical
					}
				/>
			</YStack>
		);
	},
);

export default InputField;
