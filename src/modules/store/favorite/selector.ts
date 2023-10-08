import { Store } from '../typing'
export const selectFavoriteRecipes = (store: Store.Root) => {
	return store.favorite.info
}
