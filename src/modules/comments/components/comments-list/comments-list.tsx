import React, { FC, useCallback } from 'react'
import {
	DimensionValue,
	FlatList,
	ListRenderItem,
	RefreshControl,
	View,
} from 'react-native'
import { CommentItem } from '../comment-item'
import { IComment, ICommentsList } from '~modules/comments/typing/interfaces'
import { CommentsEmpty } from '~modules/common'

interface IProps {
	list: ICommentsList
	height: DimensionValue
	scrollAnable: boolean
	isLoading?: boolean
	reload?: () => void
}
export const CommentsList: FC<IProps> = ({
	list,
	height,
	scrollAnable,
	isLoading,
	reload,
}) => {
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
				keyExtractor={item => String(item.createdAt)}
				horizontal={false}
				ListEmptyComponent={CommentsEmpty}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						onRefresh={reload}
						refreshing={isLoading}
						title="Pull to refresh"
						tintColor="#fff"
						titleColor="#fff"
					/>
				}
			/>
		</View>
	)
}
