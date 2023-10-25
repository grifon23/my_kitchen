import { Store } from '../typing'
export const selectNavGroup = (store: Store.Root) => {
	return store.navigation.activeGroup
}
