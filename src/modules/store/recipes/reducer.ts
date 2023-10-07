import { createReducer } from '@bitalikrty/redux-create-reducer'
import { Store } from '../typing'
import { RecipesActions } from './actions'

const initialState: Store.States.Recipes = {
	info: {
		data: null,
		isLoading: true,
	},
}

export const recipesReducer = createReducer<
	Store.States.Recipes,
	RecipesActions
>(initialState, {
	SET_RECIPES: (state, { payload }) => {
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
