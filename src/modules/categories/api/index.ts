import firestore from '@react-native-firebase/firestore'

class CategoriesApi {
	public async getCategoriesReq() {
		const collection = await firestore().collection('categories').get()
		return collection.docs
	}

	public async createCategoryReq() {}

	public async updateCategoryReq() {}

	public async removeCategoryReq() {}
}

export const categoriesApi = new CategoriesApi()
