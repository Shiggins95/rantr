import { createUser } from '@/src/api/methods/user/create-user';
import { getUser } from '@/src/api/methods/user/get-user';
import { updateUser } from '@/src/api/methods/user/update-user';
import { useLocationContext } from '@/src/context/location-context';
import { UserDto } from '@/src/types/user.types';
import { setStorageItem, StorageKey } from '@/src/utils/storage';
import { getSupabaseAuthenticatedClient, supabase } from '@/src/utils/supabase';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { useToastController } from '@tamagui/toast';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react';

type AuthContextType = {
	signOut: () => void;
	session: Session | null;
	isLoading: boolean;
	user?: UserDto;
	setUser: Dispatch<SetStateAction<UserDto | undefined>>;
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
	const [user, setUser] = useState<UserDto>();
	const [guestMode, setGuestMode] = useState(false);
	const router = useRouter();
	const toast = useToastController();
	const queryClient = useQueryClient();

	const { checkPermissions, requestPermissions, getCurrentLocation } =
		useLocationContext();

	const handleUserRetrieved = (user: UserDto, _session: Session) => {
		setUser(user);
		setSession(_session);
		setLoading(false);
		switch (user.status) {
			case 'COMPLETE':
				router.navigate('/(app)/(tabs)/(home)');
				return true;
			case 'SETUP_REQUIRED':
				router.navigate('/(onboarding)');
				return true;
		}
	};

	const requestLocationOnLogin = async () => {
		const isLocationAlreadyGranted = await checkPermissions();
		if (!isLocationAlreadyGranted.granted) {
			const isLocationGranted = await requestPermissions();
			if (!isLocationGranted.granted) {
				return false;
			}
		}
		return await getCurrentLocation();
	};

	const handleCompleteLogin = async (_session: Session) => {
		try {
			const userId = _session.user.id;
			const supabase = getSupabaseAuthenticatedClient();
			const userRequest = getUser(userId, supabase);
			const locationRequest = requestLocationOnLogin();

			const [user] = await Promise.all([userRequest, locationRequest]);

			if (!user) {
				const data = await createUser(
					{
						data: {
							id: userId,
							email: _session.user.email,
							created_at: new Date().toISOString(),
							last_sign_in: new Date().toISOString(),
							status: 'SETUP_REQUIRED',
						},
					},
					supabase,
				);

				handleUserRetrieved(data, _session);
				return;
			}

			const data = await updateUser(
				{
					id: userId,
					data: { last_sign_in: new Date().toISOString() },
				},
				supabase,
			);

			handleUserRetrieved(data, _session);
			return;
		} catch (e) {
			console.error('error', e);
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
		setGuestMode(false);
		setUser(undefined);
		await supabase.auth.signOut();
		router.navigate('/(auth)');
		queryClient.removeQueries();
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
				setGuestMode,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
