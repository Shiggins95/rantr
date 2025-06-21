import {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react';
import { supabase } from '@/src/utils/supabase';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { useRouter } from 'expo-router';
import { handleHttpGet } from '@/src/api/http';
import { setStorageItem, StorageKey } from '@/src/utils/storage';
import { useToastController } from '@tamagui/toast';

type AuthContextType = {
	signOut: () => void;
	session: Session | null;
	isLoading: boolean;
	user?: any;
	setUser: Dispatch<SetStateAction<any | undefined>>;
	guestMode: boolean;
	setGuestMode: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType>({
	signOut: () => null,
	session: null,
	isLoading: false,
	user: undefined,
	setUser: () => null,
	guestMode: false,
	setGuestMode: () => null,
});

type SessionResponse = {
	data: {
		session: Session | null;
	};
};

export function useAuthContext() {
	const value = useContext(AuthContext);
	if (!value) {
		throw new Error('useSession must be wrapped in a <SessionProvider />');
	}

	return value;
}

export function useCurrentUser() {
	const { user } = useAuthContext();
	return user;
}

export function AuthProvider({ children }: PropsWithChildren) {
	const [isLoading, setLoading] = useState(true);
	const [session, setSession] = useState<Session | null>(null);
	const [user, setUser] = useState<any>();
	const [guestMode, setGuestMode] = useState(false);
	const router = useRouter();
	const toast = useToastController();

	const handleCompleteLogin = async (session: Session) => {
		try {
			const data = await handleHttpGet('/auth/completeSignIn');
			if (data) {
				setUser(data);
				setSession(session);
				setLoading(false);
				switch (data.status) {
					case 'COMPLETE':
						router.navigate('/(app)/(tabs)/(home)');
						return true;
					case 'PERSONAL_DETAILS_COMPLETE':
						router.navigate('/(onboarding)/join-reason');
						return true;
					case 'SETUP_REQUIRED':
						router.navigate('/(onboarding)');
						return true;
				}
			}
		} catch (e) {
			console.log('error', e);
		}

		toast.show("Couldn't complete sign in.", {
			duration: 2500,
			type: 'error',
			message: 'Please try again.',
		});

		await supabase.auth.signOut();

		if (router.canDismiss()) {
			router.dismissAll();
		}

		return false;
	};

	const handleGotSession = (session: Session) => {
		setStorageItem(StorageKey.AccessToken, session.access_token);
		void handleCompleteLogin(session);
		return;
	};

	useEffect(() => {
		supabase.auth
			.getSession()
			.then(({ data: { session } }: SessionResponse) => {
				if (session) {
					handleGotSession(session);
					return;
				}
				setSession(null);
				setLoading(false);
			});

		const subscriber = supabase.auth.onAuthStateChange(
			(_event: AuthChangeEvent, session: Session | null) => {
				if (session && _event === 'SIGNED_IN') {
					handleGotSession(session);
					return;
				}

				setSession(session);
			},
		);

		return () => subscriber.data.subscription.unsubscribe();
	}, []);

	const signOut = async () => {
		await supabase.auth.signOut();
		router.navigate('/(auth)');
	};

	return (
		<AuthContext.Provider
			value={{
				signOut,
				session,
				isLoading,
				user,
				setUser,
				guestMode,
				setGuestMode
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
