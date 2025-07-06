import { Button } from '@ui/button';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Animated } from 'react-native';
import { GetThemeValueForKey, Popover } from 'tamagui';
import AnimatedNode = Animated.AnimatedNode;

type PopoverProps = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	offset?: number;
	children?: ReactNode;
	icon?: ReactNode;
	disabled?: boolean;
	width?:
		| number
		| AnimatedNode
		| GetThemeValueForKey<'width'>
		| null
		| undefined;
	height?:
		| number
		| AnimatedNode
		| GetThemeValueForKey<'width'>
		| null
		| undefined;
};

export default ({
	open,
	setOpen,
	children,
	offset = 0,
	icon,
	width,
	height,
	disabled,
}: PopoverProps) => {
	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
			size="$md"
			allowFlip
			placement="bottom"
			offset={offset}
		>
			<Popover.Trigger asChild p={0} m={0}>
				<Button
					disabled={disabled}
					variant="icon"
					w={width || '$xl'}
					h={height || '$xl'}
				>
					{icon}
				</Button>
			</Popover.Trigger>
			<Popover.Content
				elevate
				p="$md"
				borderRadius="$m"
				bg="rgba(20,20,20,0.7)"
				borderColor="rgba(255,255,255,0.1)"
				bw={1}
				shadowColor="#000"
				shadowRadius={10}
				marginRight="$md"
			>
				{children}
				{/*<Popover.Arrow />*/}
			</Popover.Content>
		</Popover>
	);
};
