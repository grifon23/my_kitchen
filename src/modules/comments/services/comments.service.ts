import { commentsApi } from '../api'

class CommentsService {
	public async loadComments(recipeId: string) {
		const comments: any[] = []
		const collection = await commentsApi.getComments(recipeId)
		collection.forEach(it => {
			comments.push({ id: it.id, ...it.data() })
		})
		return comments
	}
}

export const commentsService = new CommentsService()
