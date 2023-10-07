import { IRecipe } from '~modules/recipes/typing'
import { Store } from '../typing'

export class SetRecipesAction implements Store.Action {
	readonly type = Store.StoreActionKey.SET_RECIPES
	constructor(public readonly payload: IRecipe[]) {}
}

export class Reset implements Store.Action {
	readonly type = Store.StoreActionKey.RESET
}

export type RecipesActions = SetRecipesAction | Reset
