import { Service } from '~modules/common/service'
import { categoriesApi } from '../api'
import {
	IStoreCategoryPayload,
	IUpdateCategoryPayload,
} from '../api/interfaces'
import { SetCategoriesAction } from '~modules/store/categories/actions'

class CategoryService extends Service {
	public async loadCategories() {
		const categories: any = []
		const collection = await categoriesApi.getCategoriesReq()
		collection.forEach(it => {
			categories.push({ id: it.id, ...it.data() })
		})
		this.dispatch(new SetCategoriesAction(categories))
	}

	public async createCategory(payload: IStoreCategoryPayload) {
		await categoriesApi.createCategoryReq(payload)
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
		await categoriesApi.removeCategoryReq(id)
		await this.loadCategories()
	}
}

export const categoryService = new CategoryService()
