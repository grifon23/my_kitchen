import React from 'react';
import {Navigation} from './src/modules/root';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const App = () => {
  return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Navigation />
		</GestureHandlerRootView>
  )
  
};

export default App;
