import { Store } from '../typing'
export const selectAccount = (store: Store.Root) => {
	return store.categorise.info
}
