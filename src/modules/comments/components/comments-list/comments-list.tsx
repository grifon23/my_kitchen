import React, { FC, useCallback } from 'react'
import { DimensionValue, FlatList, ListRenderItem, View } from 'react-native'
import { CommentItem } from '../comment-item'
import { IComment, ICommentsList } from '~modules/comments/typing/interfaces'
import { CommentsEmpty } from '~modules/common'

interface IProps {
	list: ICommentsList
	height: DimensionValue
	scrollAnable: boolean
}
export const CommentsList: FC<IProps> = ({ list, height, scrollAnable }) => {
	const renderItem: ListRenderItem<IComment> = useCallback(
		({ item: it, index }) => {
			return (
				<CommentItem
					text={it.comment}
					avatarUrl={it.avatarUrl}
					authorName={it.authorName}
				/>
			)
		},
		[list],
	)

	return (
		<View
			style={{
				height,
			}}>
			<FlatList
				style={{ flex: 1 }}
				contentContainerStyle={{ flexGrow: 1 }}
				scrollEnabled={scrollAnable}
				data={list}
				renderItem={renderItem}
				keyExtractor={item => String(item.comment)}
				horizontal={false}
				ListEmptyComponent={CommentsEmpty}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	)
}
