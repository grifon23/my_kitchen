import { NavGroupKey } from '~modules/root/typing'
import { Store } from '../typing'

export class SetNavGroupAction implements Store.Action {
	readonly type = Store.StoreActionKey.SET_NAVIGATION_GROUP
	constructor(public readonly payload: NavGroupKey) {}
}

export class Reset implements Store.Action {
	readonly type = Store.StoreActionKey.RESET
}

export type NavActions = SetNavGroupAction | Reset
