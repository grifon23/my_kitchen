import { NavGroupKey } from '~modules/root/typing'
export namespace Store {
	export enum StoreActionKey {
		SET_NAVIGATION_GROUP = 'SET_NAVIGATION_GROUP',
		RESET = 'RESET',
		SET_ACCOUNT = 'SET_ACCOUNT',
		SET_CATEGORIES = 'SET_CATEGORIES',
	}
	type StoreData<T> = {
		data: T
		isLoading: Boolean
	}
	export interface Action {
		type: StoreActionKey
		payload?: any
	}
	export interface Root {
		navigation: States.Nav
		categorise: States.Categories
	}
	export namespace States {
		export interface Nav {
			activeGroup: NavGroupKey
			isLoading: boolean
		}
		export interface Categories {
			info: StoreData<any>
		}
	}
}
