import React, { FC, useCallback } from 'react'
import { FlatList, ListRenderItem, View } from 'react-native'
import { CommentItem } from '../comment-item'
import { IComment, ICommentsList } from '~modules/comments/typing/interfaces'
import { CommentsEmpty, ListEmptyComponent } from '~modules/common'

const stylePreview = (viewFull: boolean) => {
	if (viewFull) {
		return {
			scroll: true,
			height: null,
		}
	} else {
		return {
			scroll: false,
			height: 50,
		}
	}
}
interface IProps {
	list: ICommentsList
	fullPreview: boolean
}
export const CommentsList: FC<IProps> = ({ list, fullPreview }) => {
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

	const fullMode = stylePreview(fullPreview)
	return (
		<View
			style={{
				height: fullMode.height,
			}}>
			<FlatList
				style={{ flex: 1 }}
				scrollEnabled={false}
				data={list}
				renderItem={renderItem}
				keyExtractor={item => String(item.comment)}
				horizontal={false}
				ListEmptyComponent={CommentsEmpty}
			/>
		</View>
	)
}
