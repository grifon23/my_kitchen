import { categoriesApi } from '../api'
import {
	IStoreCategoryPayload,
	IUpdateCategoryPayload,
} from '../api/interfaces'

class CategoryService {
	public async getCategories() {
		const categories: any = []
		const collection = await categoriesApi.getCategoriesReq()
		console.log('collection', collection)
		collection.forEach(it => {
			categories.push({ id: it.id, ...it.data() })
		})
		return categories
	}

	public async createCategory(payload: IStoreCategoryPayload) {
		await categoriesApi.createCategoryReq(payload)
	}

	public async updateCategory(id: string, payload: IUpdateCategoryPayload) {
		await categoriesApi.updateCategoryReq(id, payload)
	}

	public async getOneCategory(id: string) {
		return await categoriesApi.getOneCategoryReq(id)
	}

	public async deleteCategory(id: string) {
		await categoriesApi.removeCategoryReq(id)
	}
}

export const categoryService = new CategoryService()
