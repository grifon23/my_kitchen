import firestore from '@react-native-firebase/firestore'
import { IStoreCategoryPayload, IUpdateCategoryPayload } from './interfaces'

class CategoriesApi {
	public async getCategoriesReq(uuid: string) {
		const collection = await firestore()
			.collection('categories')
			.where('uuid', '==', uuid)
			.get()
		return collection.docs
	}

	public async createCategoryReq(payload: IStoreCategoryPayload) {
		await firestore().collection('categories').add(payload)
	}

	public async updateCategoryReq(
		id: string,
		payload: IUpdateCategoryPayload,
	) {
		await firestore().collection('categories').doc(id).update(payload)
	}

	public async getOneCategoryReq(id: string) {
		const category = await firestore()
			.collection('categories')
			.doc(id)
			.get()
		return { ...category.data(), id: category.id }
	}
	public async removeCategoryReq(id: string) {
		await firestore().collection('categories').doc(id).delete()
	}
}

export const categoriesApi = new CategoriesApi()
