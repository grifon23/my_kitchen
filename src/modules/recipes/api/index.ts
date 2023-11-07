import firestore from '@react-native-firebase/firestore'
import {
	ICreateUserRateRecipePayload,
	IStoreRecipePayload,
	IUpdateRecipePayload,
} from './interfaces'

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

	public async createRecipeReq(payload: IStoreRecipePayload) {
		await firestore().collection('recipes').add(payload)
	}

	public async updateRecipeReq(id: string, payload: IUpdateRecipePayload) {
		return await firestore().collection('recipes').doc(id).update(payload)
	}

	public async getOneRecipeReq(id: string) {
		const recipe = await firestore().collection('recipes').doc(id).get()
		return { ...recipe.data(), id: recipe.id }
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

	public async updateRecipeRating(id: string, rating: number) {
		await firestore()
			.collection('recipes')
			.doc(id)
			.update({ rating: rating })
	}

	public async getUserRateRecipe(userId: string, recipeId: string) {
		return await firestore()
			.collection('ratings')
			.where('userId', '==', userId)
			.where('recipeId', '==', recipeId)
			.get()
	}

	public async createUserRateRecipe(payload: ICreateUserRateRecipePayload) {
		await firestore().collection('ratings').add(payload)
	}

	public async getRecipesDashboard() {
	const resp = await firestore()
		.collection('recipes')
		.where('isPublic', '==', true)
		.get()
	return resp.docs
	}
}


export const recipeApi = new RecipeApi()
