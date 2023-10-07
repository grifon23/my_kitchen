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
}

export const recipeApi = new RecipeApi()
