export interface IComment {
	authorName: string
	avatarUrl?: string
	comment: string
	createdAt?: string
}

export interface ICommentsList extends Array<IComment> {}
