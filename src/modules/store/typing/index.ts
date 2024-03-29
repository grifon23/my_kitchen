import { IUser } from '~modules/account/typing'
import { ICategory } from '~modules/categories/typing'
import { IRecipe } from '~modules/recipes/typing'
import { NavGroupKey } from '~modules/root/typing'
export namespace Store {
	export enum StoreActionKey {
		SET_NAVIGATION_GROUP = 'SET_NAVIGATION_GROUP',
		RESET = 'RESET',
		SET_ACCOUNT = 'SET_ACCOUNT',
		SET_CATEGORIES = 'SET_CATEGORIES',
		SET_RECIPES = 'SET_RECIPES',
		SET_FAVORITE_RECIPES = 'SET_FAVORITE_RECIPES',
		REMOVE_PRODUCT = 'REMOVE_PRODUCT',
		UPDATE_PRODUCT = 'UPDATE_PRODUCT',
	}
	type StoreData<T> = {
		data: T
		isLoading: Boolean
	}
	export interface Action {
		type: StoreActionKey
		payload?: any
	}
	export interface Root {
		navigation: States.Nav
		categorise: States.Categories
		recipes: States.Recipes
		favorite: States.FavoriteRecipes
		account: States.Account
	}
	export namespace States {
		export interface Nav {
			activeGroup: NavGroupKey
			isLoading: boolean
		}
		export interface Categories {
			info: StoreData<ICategory[]>
		}

		export interface Account {
			info: StoreData<IUser>
		}

		export interface Recipes {
			info: StoreData<IRecipe[]>
		}
		export interface FavoriteRecipes {
			info: StoreData<IRecipe[]>
		}
	}
}
