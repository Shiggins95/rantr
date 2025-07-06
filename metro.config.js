const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
	...defaultConfig,
	resolver: {
		...defaultConfig.resolver,
		unstable_enablePackageExports: false,
	},
};
