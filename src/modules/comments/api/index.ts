import { IComment } from '../typing'
import firestore from '@react-native-firebase/firestore'

class CommentsApi {
	public async createComment(payload: IComment) {
		await firestore().collection('comments').add(payload)
	}

	public async getComments(recipeId: string) {
		const collection = await firestore()
			.collection('comments')
			.where('recipeId', '==', recipeId)
			.limit(60)
			.get()
		return collection.docs
	}
}

export const commentsApi = new CommentsApi()
