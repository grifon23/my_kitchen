import { Service } from '~modules/common/service'
import { SetFavoriteRecipesAction } from '~modules/store/favorite/actions'
import { SetRecipesAction } from '~modules/store/recipes/actions'
import { recipeApi } from '../api'
import _ from 'lodash'
import { IRecipe } from '../typing'
import { IStoreRecipePayload, IUpdateRecipePayload } from '../api/interfaces'

class RecipesService extends Service {
	public async loadRecipesByCategory(categoryId: string) {
		const recipes: any[] = []
		const collection = await recipeApi.getRecipeReq(categoryId)
		collection.forEach(it => {
			recipes.push({ id: it.id, ...it.data() })
		})
		this.dispatch(new SetRecipesAction(recipes))
		return recipes
	}
	public async removeRecipe(categoryId: string, id: string) {
		await recipeApi.removeRecipeReq(id)
		await this.loadRecipesByCategory(categoryId)
	}

	public async createRecipe(payload: IStoreRecipePayload) {
		await recipeApi.createRecipeReq(payload)
	}

	public async updateRecipe(id: string, payload: IUpdateRecipePayload) {
		await recipeApi.updateRecipeReq(id, payload)
	}

	public async getDetailedRecipe(id: string) {
		return await recipeApi.getOneRecipeReq(id)
	}

	public async loadFavoriteRecipe() {
		const favorites: any[] = []
		const collection = await recipeApi.getFavoriteRecipeReq()
		collection.forEach(it => {
			favorites.push({ id: it.id, ...it.data() })
		})
		this.dispatch(new SetFavoriteRecipesAction(favorites))
	}

	public async updateFavorite(id: string, payload: boolean) {
		await recipeApi.updateFvoriteReq(id, payload)
		await this.loadFavoriteRecipe()
	}
}

export const recipesService = new RecipesService()
