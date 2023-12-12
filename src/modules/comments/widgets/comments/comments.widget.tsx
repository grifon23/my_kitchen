import React, { FC, useEffect, useMemo, useState } from 'react'
import { DimensionValue, LayoutAnimation, StyleSheet, View } from 'react-native'
import { SheetManager } from 'react-native-actions-sheet'
import { CommentForm, CommentsList } from '~modules/comments/components'
import { mockComment } from '~modules/comments/components/comments-list/mock-comments'
import { commentsService } from '~modules/comments/services'
import { IComment, ICommentsList } from '~modules/comments/typing'
import {
	Icon,
	Loader,
	Txt,
	appEvents,
	colors,
	useEventsListener,
} from '~modules/common'
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

	const loadComments = async (id: string) => {
		setIsLoading(true)
		try {
			const list = await commentsService.loadComments(id)
			console.log('list', list)
			setComments(list)
		} catch (error) {
			console.log('error load comments', error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (recipeId) {
			loadComments(recipeId)
		}
	}, [recipeId])

	if (isLoading) {
		return <Loader />
	}

	return (
		<CommentsList
			scrollAnable={scrollAnable}
			height={height}
			list={comments}
		/>
	)
}
