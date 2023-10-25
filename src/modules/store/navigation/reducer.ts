import { createReducer } from '@bitalikrty/redux-create-reducer'
import { NavActions } from './actions'
import { NavGroupKey } from '~modules/root/typing'
import { Store } from '../typing'

const initialState: Store.States.Nav = {
	activeGroup: NavGroupKey.Loading,
	isLoading: true,
}
export const navigationReducer = createReducer<Store.States.Nav, NavActions>(
	initialState,
	{
		SET_NAVIGATION_GROUP: (state, { payload }) => {
			return {
				...state,
				activeGroup: payload,
				isLoading: false,
			}
		},
		RESET: () => {
			return initialState
		},
	},
)
