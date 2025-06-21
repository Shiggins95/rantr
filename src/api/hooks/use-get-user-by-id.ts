// import { UserApi } from 'trustifi-client';
// import { getTrustiFiApi } from '@/src/api/client';
// import { useLazyQuery } from '@/src/api/hooks/use-lazy-query';
//
// export const useGetUserById = (userId: string) => {
// 	const userApi = getTrustiFiApi(UserApi);
// 	return useLazyQuery(
// 		{
// 			queryFn: (ctx) => userApi.apiGetUserById(userId, ctx),
// 		},
// 		['getUserById', userId].filter((v) => !!v),
// 	);
// };
