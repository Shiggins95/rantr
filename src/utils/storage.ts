import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export enum StorageKey {
	AccessToken = 'AccessToken',
}

export const getStorageString = (key: StorageKey) => {
	return storage.getString(key) || '';
};

export const setStorageItem = (key: StorageKey, value: string) => {
	storage.set(key, value);
};

export const deleteStorageItem = (key: StorageKey) => {
	storage.delete(key);
};

export const authStorageMethods = {
	getItem: getStorageString,
	setItem: setStorageItem,
	removeItem: deleteStorageItem,
};
