import developmentConfig from '@/src/config.development.json';
import productionConfig from '@/src/config.production.json';

type AppConfig = {
	supabaseUrl: string;
	supabaseAnonToken: string;
	api: string;
};

const isDevelopment = __DEV__;

export const getConfigValue = (key: keyof AppConfig) => {
	const config = (isDevelopment
		? developmentConfig
		: productionConfig) as unknown as AppConfig;

	return config[key];
};
