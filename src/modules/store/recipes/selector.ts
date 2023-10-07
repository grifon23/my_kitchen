import { Store } from '../typing'
export const selectRecipes = (store: Store.Root) => {
	return store.recipes.info
}
