import { createReducer } from '@bitalikrty/redux-create-reducer'
import { Store } from '../typing'
import { FavoriteRecipesActions } from './actions'

const initialState: Store.States.Recipes = {
	info: {
		data: null,
		isLoading: true,
	},
}

export const favoriteRecipesReducer = createReducer<
	Store.States.Recipes,
	FavoriteRecipesActions
>(initialState, {
	SET_FAVORITE_RECIPES: (state, { payload }) => {
		return {
			...state,
			info: {
				data: payload,
				isLoading: false,
			},
		}
	},
	RESET: () => {
		return initialState
	},
})
