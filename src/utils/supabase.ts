import { AppState } from 'react-native';
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import {
	authStorageMethods,
	getStorageString,
	StorageKey,
} from '@/src/utils/storage';
import { SupabaseAuthClientOptions } from '@supabase/supabase-js/dist/module/lib/types';
import { getConfigValue } from '@/src/utils/config';

export const supabase = createClient(
	getConfigValue('supabaseUrl')!,
	getConfigValue('supabaseAnonToken')!,
	{
		auth: {
			// doing this manual cast as we want to solidly type that the key is supposed to be our enum but the ts gods don't like that
			// so casting the type to appease them
			storage: authStorageMethods as SupabaseAuthClientOptions['storage'],
			autoRefreshToken: true,
			persistSession: true,
			detectSessionInUrl: false,
		},
	},
);

export const getSupabaseAuthenticatedClient = () => {
	return createClient(
		getConfigValue('supabaseUrl')!,
		getStorageString(StorageKey.AccessToken),
	);
};

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', (state) => {
	if (state === 'active') {
		void supabase.auth.startAutoRefresh();
	} else {
		void supabase.auth.stopAutoRefresh();
	}
});
