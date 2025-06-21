// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import R, { trackGlobalErrors } from 'reactotron-react-native';
import { LogBox, TurboModuleRegistry } from 'react-native';
// import DeviceInfo from 'react-native-device-info';

declare global {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Console {
		tron: any;
	}
}

const SourceCode = TurboModuleRegistry.getEnforcing('SourceCode');
const scriptURL = SourceCode.getConstants().scriptURL;
const address = scriptURL.split('://')[1].split('/')[0];
const hostname = address.split(':')[0];

// const model = DeviceInfo.getModel();
// const emulatorOrNotLabel = DeviceInfo.isEmulatorSync() ? 'Emulator' : 'Device';

const Reactotron = R.configure({
	// name: `TrustiFi - ${model} - ${emulatorOrNotLabel}`,
	name: `TrustiFi`,
	host: hostname,
})
	.use(trackGlobalErrors())
	.useReactNative({
		networking: {
			// optionally, you can turn it off with false.
			ignoreUrls: /symbolicate/,
		},
	}) // add all built-in react native plugins
	.connect(); // let's connect!

Reactotron.clear();

console.tron = Reactotron;

//TODO - issue on new arch for reactotron https://github.com/infinitered/reactotron/issues/1486#issuecomment-2244269882
LogBox.ignoreLogs([/Invalid non-string URL*/]);

export default Reactotron;
