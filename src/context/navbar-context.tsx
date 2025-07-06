import { createContext, PropsWithChildren, useContext, useState } from 'react';

type NavbarContextType = {
	show: boolean;
	setShow: (show: boolean) => void;
	currentTab: string;
	setCurrentTab: (tab: string) => void;
};

export const NavbarContext = createContext<NavbarContextType>({
	show: true,
	setShow: () => null,
	currentTab: '(home)',
	setCurrentTab: () => '',
});

export function useNavbarContext() {
	return useContext(NavbarContext);
}

export function NavbarProvider({ children }: PropsWithChildren) {
	const [show, setShow] = useState(true);
	const [currentTab, setCurrentTab] = useState('(home)');

	return (
		<NavbarContext.Provider
			value={{
				show,
				setShow,
				currentTab,
				setCurrentTab,
			}}
		>
			{children}
		</NavbarContext.Provider>
	);
}
