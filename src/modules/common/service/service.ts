import { NavGroupKey } from '~modules/root/typing'
import { store } from '~modules/store'
import { SetNavGroupAction } from '~modules/store/navigation/actions'
import { Store } from '~modules/store/typing'
export abstract class Service {
	protected dispatch(action: Store.Action) {
		store.dispatch({
			type: action.type,
			payload: action.payload,
		})
	}
	protected getState<T extends keyof Store.Root>(
		key?: T,
	): Store.Root | Store.Root[T] {
		const state = store.getState()
		if (key) return state[key]
		return state
	}
	protected select<T>(selector: (state: Store.Root) => T): T {
		const state = this.getState() as Store.Root
		return selector(state)
	}
	protected navigate(key: NavGroupKey) {
		this.dispatch(new SetNavGroupAction(key))
	}
}
