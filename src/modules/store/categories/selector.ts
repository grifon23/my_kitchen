import { Store } from '../typing'
export const selectCategories = (store: Store.Root) => {
	return store.categorise.info
}
