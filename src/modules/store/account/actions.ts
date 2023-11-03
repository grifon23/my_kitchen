import { ICategory } from '~modules/categories/typing'
import { Store } from '../typing'
import { IUser } from '~modules/account/typing'
import { IProduct } from '~modules/products/typing'

export class SetAccountAction implements Store.Action {
	readonly type = Store.StoreActionKey.SET_ACCOUNT
	constructor(public readonly payload: IUser) {}
}

export class RemoveProductAction implements Store.Action {
	readonly type = Store.StoreActionKey.REMOVE_PRODUCT
	constructor(public readonly payload: { id: string }) {}
}

export class UpdateProductAction implements Store.Action {
	readonly type = Store.StoreActionKey.UPDATE_PRODUCT
	constructor(public readonly payload: IProduct) {}
}

export class ResetAccount implements Store.Action {
	readonly type = Store.StoreActionKey.RESET
}

export type AccountActions =
	| SetAccountAction
	| ResetAccount
	| RemoveProductAction
	| UpdateProductAction
