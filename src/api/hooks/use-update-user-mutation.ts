// import { useMutation } from 'react-query';
// import { UserApi, UserPostPutDto, UserGetDto } from 'trustifi-client';
// import { getTrustiFiApi } from '@/src/api/client';
//
// export const useUpdateUserMutation = (
// 	onSuccess: (data: UserGetDto) => void,
// 	onError: () => void,
// ) => {
// 	const userApi = getTrustiFiApi(UserApi);
// 	return useMutation({
// 		mutationFn: async (data: UserPostPutDto) => {
// 			return userApi.apiUpdateUserById(data);
// 		},
// 		onSuccess,
// 		onError,
// 	});
// };
