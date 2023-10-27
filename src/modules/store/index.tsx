import { combineReducers, createStore } from 'redux'
import { Store } from './typing'
import reactotron from 'reactotron-react-native'
import { navigationReducer } from './navigation/reducer'
import { categoriesReducer } from './categories/reducer'
import { recipesReducer } from './recipes/reducer'
import { favoriteRecipesReducer } from './favorite/reducer'
import { accountReducer } from './account/reducer'
const rootReducer = combineReducers<Store.Root>({
	navigation: navigationReducer,
	categorise: categoriesReducer,
	recipes: recipesReducer,
	favorite: favoriteRecipesReducer,
	account: accountReducer,
})
export const store = createStore(rootReducer, reactotron.createEnhancer())
