import { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { Dialog, View } from 'tamagui';

type ModalProps = PropsWithChildren & {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

export const Modal = ({ open, setOpen, children }: ModalProps) => {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Dialog.Portal>
				<Dialog.Overlay key="post-create-dialog" />
				<Dialog.Content w="100%" px="$md" bg="transparent">
					<View
						mx="$md"
						bg="$background"
						borderRadius="$radius.m"
						bw={2}
						borderColor="$color.borderColor"
						py="$xl"
						px="$md"
						jc="center"
						alignItems="center"
						gap="$md"
					>
						{children}
					</View>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog>
	);
};
