import firestore, { Filter } from '@react-native-firebase/firestore'
import { IRecipe } from '../typing'

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

	public async createRecipeReq(payload: IRecipe) {
		await firestore().collection('recipes').add(payload)
	}

	public async getFavoriteRecipeReq() {
		return await firestore()
			.collection('recipes')
			.where('isFavorite', '==', true)
			.get()
	}

	public async updateFvoriteReq(id: string, payload: boolean) {
		await firestore()
			.collection('recipes')
			.doc(id)
			.update({ isFavorite: payload })
	}
}

export const recipeApi = new RecipeApi()
