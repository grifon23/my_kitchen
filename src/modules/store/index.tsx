import { combineReducers, createStore } from 'redux'
import { Store } from './typing'
import reactotron from 'reactotron-react-native'
import { navigationReducer } from './navigation/reducer'
import { categoriesReducer } from './categories/reducer'
import { recipesReducer } from './recipes/reducer'
const rootReducer = combineReducers<Store.Root>({
	navigation: navigationReducer,
	categorise: categoriesReducer,
	recipes: recipesReducer,
})
export const store = createStore(rootReducer, reactotron.createEnhancer())
