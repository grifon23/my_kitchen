import { ICategory } from '~modules/categories/typing'
import { Store } from '../typing'
import { IUser } from '~modules/acount/typing'

export class SetAccountAction implements Store.Action {
	readonly type = Store.StoreActionKey.SET_ACCOUNT
	constructor(public readonly payload: IUser) {}
}

export class ResetAccount implements Store.Action {
	readonly type = Store.StoreActionKey.RESET
}

export type AccountActions = SetAccountAction | ResetAccount
