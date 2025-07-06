import { Colours } from '@/src/constants/colours';
import { spacing } from '@/src/constants/spacing';
import { useColorScheme } from '@hooks/useColorScheme';
import { Body, BodyType } from '@ui/body';
import { Button } from '@ui/button';
import React, { useMemo, useRef, useState } from 'react';
import {
	LiteralUnion,
	RegisterOptions,
	useController,
	UseControllerProps,
} from 'react-hook-form';
import {
	FlatList,
	LayoutChangeEvent,
	Pressable,
	StyleSheet,
} from 'react-native';
import { Popover, TamaguiElement, View } from 'tamagui';

type SelectItem = {
	label: string;
	value: string;
};

type LocalProps = {
	label?: string;
	placeholder?: string;
	options: SelectItem[];
	onChange?: (value: string) => void;
	value?: string;
};

type ControlledSelectProps = LocalProps & UseControllerProps & InputErrorTypes;

type SelectProps = LocalProps &
	UseControllerProps &
	InputErrorTypes & { onChange: (value: string) => void };

export type InputErrorTypes = {
	error?: boolean;
	errorType?: LiteralUnion<keyof RegisterOptions, string>;
	errorMessages?: Partial<
		Record<LiteralUnion<keyof RegisterOptions, string>, string>
	>;
};

export const ControlledSelect = (props: ControlledSelectProps) => {
	const { rules, defaultValue, name } = props;
	const { field } = useController({
		name,
		rules,
		defaultValue: defaultValue || '',
	});

	const handleOptionPress = (value: string) => {
		field.onChange(value);
		props.onChange?.(value);
	};

	return <Select {...props} onChange={handleOptionPress} value={field.value} />;
};

export const Select = ({
	placeholder,
	options,
	onChange,
	value,
}: SelectProps) => {
	const [open, setOpen] = useState(false);
	const styles = useStyles();
	const [width, setWidth] = useState(0);

	const currentLabel = useMemo(() => {
		if (!value) return placeholder || 'Select';
		return options.find((o) => o.value === value)?.label || value;
	}, [value, options]);

	const handleOptionPress = (value: string) => {
		onChange(value);
		setOpen(false);
	};

	const onLayout = (event: LayoutChangeEvent) => {
		setWidth(event.nativeEvent.layout.width);
	};

	const measureRef = useRef<TamaguiElement | null>(null);

	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
			size="$md"
			allowFlip
			placement="bottom-start"
		>
			<View onLayout={onLayout}>
				<Popover.Trigger asChild p={0} m={0}>
					<Button
						borderRadius="$radius.l"
						color="$textMuted"
						borderColor="$color.borderColor"
						bw={1}
						style={styles.trigger}
						ref={measureRef}
					>
						{currentLabel}
					</Button>
				</Popover.Trigger>
			</View>
			<Popover.Content
				elevate
				p="$md"
				borderRadius="$m"
				bg="rgba(20,20,20,0.7)"
				borderColor="$color.borderColor"
				bw={1}
				w={width}
				shadowColor="#000"
				shadowRadius={10}
				marginRight="$md"
				maxHeight={250}
			>
				<FlatList
					data={options}
					style={styles.flatList}
					showsVerticalScrollIndicator={false}
					bounces={false}
					renderItem={({ item }) => (
						<Pressable
							style={styles.option}
							onPress={() => handleOptionPress(item.value)}
						>
							<Body c="$textMuted" variant={BodyType.small}>
								{item.label}
							</Body>
						</Pressable>
					)}
				/>
			</Popover.Content>
		</Popover>
	);
};

const useStyles = () => {
	const theme = useColorScheme() ?? 'dark';
	return StyleSheet.create({
		trigger: {
			flex: 1,
			paddingVertical: spacing.md,
			paddingLeft: spacing.md,
			width: '100%',
			borderWidth: 1,
			borderColor: Colours[theme].borderColor,
			justifyContent: 'flex-start',
			alignItems: 'center',
			backgroundColor: Colours[theme].background,
		},
		flatList: {
			width: '100%',
		},
		option: {
			height: 50,
			borderBottomWidth: 1,
			borderBottomColor: Colours[theme].primary20,
			justifyContent: 'center',
		},
	});
};
