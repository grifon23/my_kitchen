import { createReducer } from '@bitalikrty/redux-create-reducer'
import { Store } from '../typing'
import { CategoriesActions } from './actions'

const initialState: Store.States.Categories = {
	info: {
		data: null,
		isLoading: true,
	},
}

export const categoriesReducer = createReducer<
	Store.States.Categories,
	CategoriesActions
>(initialState, {
	SET_CATEGORIES: (state, { payload }) => {
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
