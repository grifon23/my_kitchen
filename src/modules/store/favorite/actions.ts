import { IRecipe } from '~modules/recipes/typing'
import { Store } from '../typing'

export class SetFavoriteRecipesAction implements Store.Action {
	readonly type = Store.StoreActionKey.SET_FAVORITE_RECIPES
	constructor(public readonly payload: IRecipe[]) {}
}

export class Reset implements Store.Action {
	readonly type = Store.StoreActionKey.RESET
}

export type FavoriteRecipesActions = SetFavoriteRecipesAction | Reset
