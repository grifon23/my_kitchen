import React from 'react'
import { Navigation } from './src/modules/root'
import 'react-native-gesture-handler'
import './src/modules/common/service/reactotron.service'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
	initialWindowMetrics,
	SafeAreaProvider,
} from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { store } from './src/modules/store'
import { NavigationContainer } from '@react-navigation/native'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import Toast from 'react-native-toast-message'
import { toastConfig } from '~config'
import { SheetProvider } from 'react-native-actions-sheet'
import './src/modules/comments/components/comments-sheet/index'
GoogleSignin.configure({
	webClientId:
		'876282652641-sjb2i8ifpio3on381lmu84a1une5iggt.apps.googleusercontent.com',
	offlineAccess: true,
})

const App = () => {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SheetProvider>
				<SafeAreaProvider initialMetrics={initialWindowMetrics}>
					<Provider store={store}>
						<NavigationContainer>
							<>
								<Navigation />
								<Toast config={toastConfig} />
							</>
						</NavigationContainer>
					</Provider>
				</SafeAreaProvider>
			</SheetProvider>
		</GestureHandlerRootView>
	)
}

export default App
