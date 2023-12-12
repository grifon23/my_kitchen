import React, { FC, useEffect, useState } from 'react'
import { DimensionValue } from 'react-native'
import { CommentsList } from '~modules/comments/components'
import { commentsService } from '~modules/comments/services'
import { ICommentsList } from '~modules/comments/typing'
import { Loader, useEventsListener } from '~modules/common'
interface IProps {
	recipeId?: string
	scrollAnable?: boolean
	height: DimensionValue
}
export const CommentsWidget: FC<IProps> = ({
	recipeId,
	height,
	scrollAnable,
}) => {
	const [comments, setComments] = useState<ICommentsList>([])
	const [isLoading, setIsLoading] = useState(false)

	const loadComments = async () => {
		setIsLoading(true)
		try {
			if (!recipeId) {
				return
			}
			const list = await commentsService.loadComments(recipeId)
			setComments(list)
		} catch (error) {
			console.log('error load comments', error)
		} finally {
			setIsLoading(false)
		}
	}

	useEventsListener(
		'reload',
		() => {
			loadComments()
		},
		[recipeId],
	)
	useEffect(() => {
		loadComments()
	}, [recipeId])

	if (isLoading) {
		return <Loader />
	}

	return (
		<CommentsList
			isLoading={isLoading}
			reload={loadComments}
			scrollAnable={scrollAnable}
			height={height}
			list={comments}
		/>
	)
}
