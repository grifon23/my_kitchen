import { Service } from '~modules/common/service'
import { categoriesApi } from '../api'
import {
	IStoreCategoryPayload,
	IUpdateCategoryPayload,
} from '../api/interfaces'
import { SetCategoriesAction } from '~modules/store/categories/actions'
import { recipesService } from '~modules/recipes/service'
import { recipeApi } from '~modules/recipes/api'
import { IRecipe } from '~modules/recipes/typing'
import _ from 'lodash'

class CategoryService extends Service {
	public async loadCategories() {
		const state: any = this.getState('account')
		const account = state.info.data

		const categories: any = []
		const collection = await categoriesApi.getCategoriesReq(account.uuid)
		collection.forEach(it => {
			categories.push({ id: it.id, ...it.data() })
		})
		this.dispatch(new SetCategoriesAction(categories))
	}

	public async createCategory(name: string) {
			const state: any = this.getState('account')
			const account = state.info.data
		await categoriesApi.createCategoryReq({ name, uuid: account.uuid })
		await this.loadCategories()
	}

	public async updateCategory(id: string, payload: IUpdateCategoryPayload) {
		await categoriesApi.updateCategoryReq(id, payload)
		await this.loadCategories()
	}

	public async getOneCategory(id: string) {
		return await categoriesApi.getOneCategoryReq(id)
	}

	public async deleteCategory(id: string) {
		const recipes = await recipesService.loadRecipesByCategory(id)
		await categoriesApi.removeCategoryReq(id)
		await this.loadCategories()

		if (_.isEmpty(recipes)) return
		recipes.forEach(async (it: IRecipe) => {
			await recipeApi.removeRecipeReq(it.id)
		})
		await recipesService.loadFavoriteRecipe()
	}
}

export const categoryService = new CategoryService()
