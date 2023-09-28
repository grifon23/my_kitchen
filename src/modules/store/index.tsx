import { combineReducers, createStore } from 'redux'
import { Store } from './typing'
import reactotron from 'reactotron-react-native'
import { navigationReducer } from './navigation/reducer'
const rootReducer = combineReducers<Store.Root>({
	navigation: navigationReducer,
})
export const store = createStore(rootReducer, reactotron.createEnhancer())
