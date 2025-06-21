// import {
// 	AxiosInstance,
// 	AxiosRequestConfig,
// 	AxiosResponse,
// 	Canceler,
// } from 'axios';
// import { getConfigValue } from '@/src/utils/config';
// import { getAxios } from '@/src/api/axios';
// import { getStorageString, StorageKey } from '@/src/utils/storage';
// // import * as TrustifiClient from 'trustifi-client';
//
// export const getAxiosConfig = (): [string, Canceler, AxiosInstance] => {
// 	const baseUrl = getConfigValue('api') as string;
// 	const accessToken = getStorageString(StorageKey.AccessToken) as string;
// 	const [axios, cancel] = getAxios({
// 		baseUrl,
// 		accessToken,
// 		timeout: 30000,
// 	});
//
// 	return [baseUrl, cancel, axios];
// };
//
// type Constructor<T = any> = new (...args: any[]) => T;
// type ApiOnlyConstructors = {
// 	[K in keyof typeof any]: (typeof any)[K] extends Constructor
// 		? (typeof any)[K]
// 		: never;
// };
//
// type ValidApiConstructor = Exclude<
// 	ApiOnlyConstructors[keyof ApiOnlyConstructors],
// 	undefined
// >;
//
// type UnwrapAxios<T> = T extends (
// 	...args: infer A
// ) => Promise<AxiosResponse<infer R>>
// 	? (...args: A) => Promise<R>
// 	: T;
//
// type UnwrapApi<T> = {
// 	[K in keyof T]: UnwrapAxios<T[K]>;
// };
//
// export function wrapApi<T extends Record<string, any>>(api: T): UnwrapApi<T> {
// 	const handler = {
// 		get(target: any, prop: string) {
// 			const orig = target[prop];
// 			if (typeof orig === 'function') {
// 				return (...args: any[]) => {
// 					// Extract signal if passed as an options object in the last arg
// 					const lastArg = args[args.length - 1];
// 					let config: AxiosRequestConfig | undefined;
//
// 					if (lastArg?.signal instanceof AbortSignal) {
// 						config = { signal: lastArg.signal };
// 						args = args.slice(0, -1); // remove the signal wrapper if you want
// 					}
//
// 					// Append config as the last argument to the API call
// 					return orig
// 						.apply(target, [...args, config])
// 						.then((res: AxiosResponse) => res.data);
// 				};
// 			}
// 			return orig;
// 		},
// 	};
// 	return new Proxy(api, handler) as UnwrapApi<T>;
// }
//
// export function getTrustiFiApi<C extends ValidApiConstructor>(
// 	Client: C,
// ): UnwrapApi<InstanceType<C>> {
// 	const [baseUrl, , axiosInstance] = getAxiosConfig();
// 	const instance = new Client(undefined, baseUrl, axiosInstance);
// 	return wrapApi(instance) as UnwrapApi<InstanceType<C>>;
// }
