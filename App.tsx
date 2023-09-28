import React from 'react';
import {Navigation} from './src/modules/root';
import 'react-native-gesture-handler';
import './src/modules/common/service/reactotron.service'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
	initialWindowMetrics,
	SafeAreaProvider,
} from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { store } from '~modules/store'
import { NavigationContainer } from '@react-navigation/native'

const App = () => {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaProvider initialMetrics={initialWindowMetrics}>
				<Provider store={store}>
					<NavigationContainer>
						<Navigation />
					</NavigationContainer>
				</Provider>
			</SafeAreaProvider>
		</GestureHandlerRootView>
	)
}

export default App;
