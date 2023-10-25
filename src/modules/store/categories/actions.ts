import { ICategory } from '~modules/categories/typing'
import { Store } from '../typing'

export class SetCategoriesAction implements Store.Action {
	readonly type = Store.StoreActionKey.SET_CATEGORIES
	constructor(public readonly payload: ICategory[]) {}
}

export class Reset implements Store.Action {
	readonly type = Store.StoreActionKey.RESET
}

export type CategoriesActions = SetCategoriesAction | Reset
