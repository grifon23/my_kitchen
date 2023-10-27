import { createReducer } from '@bitalikrty/redux-create-reducer'
import { Store } from '../typing'
import { AccountActions } from './actions'

const initialState: Store.States.Account = {
	info: {
		data: null,
		isLoading: true,
	},
}

export const accountReducer = createReducer<
	Store.States.Account,
	AccountActions
>(initialState, {
	SET_ACCOUNT: (state, { payload }) => {
		return {
			...state,
			info: {
				data: payload,
				isLoading: false,
			},
		}
	},

	REMOVE_PRODUCT: (state, { payload }) => {
		const products = state.info.data.myProducts
		const templ = products.filter(it => it.id !== payload.id)

		return {
			info: {
				data: { ...state.info.data, myProducts: templ },
				isLoading: false,
			},
		}
	},

	UPDATE_PRODUCT: (state, { payload }) => {
		const products = state.info.data.myProducts
		const updateProducts = products.map(it => {
			if (it.id === payload.id) {
				return payload
			}
			return it
		})

		return {
			info: {
				data: {
					...state.info.data,
					myProducts: updateProducts,
				},
				isLoading: false,
			},
		}
	},

	RESET: () => {
		return initialState
	},
})
