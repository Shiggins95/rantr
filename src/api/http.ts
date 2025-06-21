import { getAxios } from '@/src/api/axios';
import { getConfigValue } from '@/src/utils/config';
import { getStorageString, StorageKey } from '@/src/utils/storage';

export const handleHttpGet = async (endpoint: string) => {
	try {
		const [api] = getAxios({
			baseUrl: getConfigValue('api'),
			accessToken: getStorageString(StorageKey.AccessToken),
			timeout: 30000,
		});
		const data = await api.get(endpoint);
		return data.data;
	} catch (error) {
		throw error;
	}
};
