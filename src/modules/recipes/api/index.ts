import firestore, { Filter } from '@react-native-firebase/firestore'

class RecipeApi {
	public async getRecipeReq(categoryId: string) {
		const resp = await firestore()
			.collection('recipes')
			.where('categoryId', '==', categoryId)
			.get()
		return resp.docs
	}

	public async removeRecipeReq(id: string) {
		await firestore().collection('recipes').doc(id).delete()
	}

	public async getFavoriteRecipeReq() {
		return await firestore()
			.collection('recipes')
			.where('isFavorite', '==', 'true')
			.get()
	}

	public async updateFvoriteReq(id: string, payload: boolean) {
		await firestore()
			.collection('recipes')
			.doc(id)
			.update({ isFavorite: String(payload) })
	}
}

export const recipeApi = new RecipeApi()
