import axios, {
	type AxiosInstance,
	type Canceler,
	type CancelToken,
} from 'axios';

export const authorisationInterceptors = (
	_axios: AxiosInstance,
	token?: string,
): void => {
	_axios.interceptors.request.use(async (__axios) => {
		if (token) {
			__axios.headers.Authorization = `Bearer ${token}`;
		}

		return __axios;
	});
};

const cancelInterceptor = (_axios: AxiosInstance, cancel: CancelToken) => {
	_axios.interceptors.request.use((__axios) => {
		__axios.cancelToken = cancel;

		return __axios;
	});
};

export type ClientConfiguration = {
	baseUrl: string;
	accessToken?: string;
	logTraffic?: boolean;
	timeout: number;
	useTotp?: boolean;
};

export const getAxios = (
	clientConfig: ClientConfiguration,
): [AxiosInstance, Canceler] => {
	axios.defaults.timeout = clientConfig.timeout;

	const cancelTokenSource = axios.CancelToken.source();

	const instance = axios.create({
		baseURL: clientConfig.baseUrl,
	});

	cancelInterceptor(instance, cancelTokenSource.token);
	authorisationInterceptors(instance, clientConfig.accessToken);

	return [instance, cancelTokenSource.cancel];
};
