import React, { FC, useEffect, useMemo, useState } from 'react'
import { DimensionValue, LayoutAnimation, StyleSheet, View } from 'react-native'
import { SheetManager } from 'react-native-actions-sheet'
import { CommentForm, CommentsList } from '~modules/comments/components'
import { mockComment } from '~modules/comments/components/comments-list/mock-comments'
import {
	Icon,
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
	console.log('recipe Id', recipeId)
	return (
		<CommentsList
			scrollAnable={scrollAnable}
			height={height}
			list={mockComment}
		/>
	)
}
