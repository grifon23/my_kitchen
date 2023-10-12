import { Store } from '../typing'
export const selectRecipes = (store: Store.Root) => {
	return store.recipes.info
}

export const selectRecipeById = (store: Store.Root, id: string) => {
	const recipe = store.recipes.info.data.find(it => it.id === id)
	return { isLoading: store.recipes.info.isLoading, data: recipe }
}
