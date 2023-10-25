import AsyncStorage from '@react-native-async-storage/async-storage'
import { NativeModules } from 'react-native'
import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'
const scriptURL = NativeModules.SourceCode.scriptURL
const packagerHostname = scriptURL.split('://')[1].split(':')[0]
Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
	.configure({
		name: 'React Native Demo',
		host: packagerHostname,
	})
	.useReactNative({
		asyncStorage: false, // there are more options to the async storage.
		networking: {
			// optionally, you can turn it off with false.
			ignoreUrls: /symbolicate/,
		},
		editor: false, // there are more options to editor
		errors: { veto: () => false }, // or turn it off with false
		overlay: false, // just turning off overlay
	})
	.use(reactotronRedux())
	.connect()
const yeOldeConsoleLog = console.log
console.log = (...props) => {
	yeOldeConsoleLog(...props)
	Reactotron.log(...props)
}
