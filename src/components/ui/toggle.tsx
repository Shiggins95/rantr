import { Body, BodyType } from '@ui/body';
import { InputErrorTypes } from '@ui/select';
import { useController, UseControllerProps } from 'react-hook-form';
import type { SwitchProps as TamaguiSwitchProps } from 'tamagui';
import { Switch, View } from 'tamagui';

type LocalProps = {
	onValueChange?: (value: boolean) => void;
	checked?: boolean;
	label?: string;
};

type ToggleProps = TamaguiSwitchProps & LocalProps;

type ControlledToggleProps = LocalProps &
	TamaguiSwitchProps &
	UseControllerProps &
	InputErrorTypes;

export const ControlledToggle = (props: ControlledToggleProps) => {
	const { rules, defaultValue, name } = props;
	const { field } = useController({
		name,
		rules,
		defaultValue: defaultValue || '',
	});

	const handleOptionPress = (value: boolean) => {
		field.onChange(value);
		props.onValueChange?.(value);
	};

	return (
		<Toggle
			{...props}
			checked={field.value}
			onValueChange={handleOptionPress}
		/>
	);
};

export const Toggle = ({
	checked,
	onValueChange,
	label,
	...rest
}: ToggleProps) => {
	return (
		<View w="100%" gap="$md">
			{!!label && <Body variant={BodyType.small}>{label}</Body>}
			<Switch
				bg={checked ? '$primary' : '$background'}
				{...rest}
				onCheckedChange={onValueChange}
				borderColor="$color.borderColor"
			>
				<Switch.Thumb
					animation="bouncy"
					bg={checked ? '$color.background' : '$color.primary'}
				/>
			</Switch>
		</View>
	);
};
