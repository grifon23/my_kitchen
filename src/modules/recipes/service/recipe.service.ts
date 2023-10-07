import { Service } from '~modules/common/service'
import { SetRecipesAction } from '~modules/store/recipes/actions'
import { recipeApi } from '../api'

class RecipesService extends Service {
	public async loadRecipesByCategory(categoryId: string) {
		const recipes: any[] = []
		const collection = await recipeApi.getRecipeReq(categoryId)
		collection.forEach(it => {
			recipes.push({ id: it.id, ...it.data() })
		})

		this.dispatch(new SetRecipesAction(recipes))
	}
	public async removeRecipe(categoryId: string, id: string) {
		await recipeApi.removeRecipeReq(id)
		await this.loadRecipesByCategory(categoryId)
	}
}

export const recipesService = new RecipesService()
