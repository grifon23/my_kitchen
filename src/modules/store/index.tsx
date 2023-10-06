import { combineReducers, createStore } from 'redux'
import { Store } from './typing'
import reactotron from 'reactotron-react-native'
import { navigationReducer } from './navigation/reducer'
import { categoriesReducer } from './categories/reducer'
const rootReducer = combineReducers<Store.Root>({
	navigation: navigationReducer,
	categorise: categoriesReducer,
})
export const store = createStore(rootReducer, reactotron.createEnhancer())
