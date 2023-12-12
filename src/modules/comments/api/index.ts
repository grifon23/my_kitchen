import { IComment } from '../typing'
import firestore from '@react-native-firebase/firestore'

class CommentsApi {
	public async createComment(payload: IComment) {
		return await firestore()
			.collection('comments')
			.add({
				...payload,
				createdAt: new Date().toISOString(),
			})
	}

	public async getComments(recipeId: string) {
		const collection = await firestore()
			.collection('comments')
			.orderBy('createdAt', 'desc')
			.where('recipeId', '==', recipeId)
			.limit(60)
			.get()
		return collection.docs
	}
}

export const commentsApi = new CommentsApi()
