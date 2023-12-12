import React, { FC, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SheetManager } from 'react-native-actions-sheet'
import { Icon, Txt, appEvents, colors } from '~modules/common'
import { CommentForm } from '../comment-form'
import { CommentsWidget } from '~modules/comments/widgets'
import { IComment } from '~modules/comments/typing'
import { useSelector } from 'react-redux'
import { selectAccount } from '~modules/store/account/selector'
import { commentsApi } from '~modules/comments/api'

interface IProps {
	recipeId: string
}
export const CreateComments: FC<IProps> = ({ recipeId }) => {
	const { data: account } = useSelector(selectAccount)
	const [comment, setComment] = useState('')
	const onChange = (val: string) => {
		setComment(val)
	}

	const showCommentsList = () => {
		SheetManager.show('comments-sheet', { payload: { recipeId } })
	}

	const submit = async () => {
		try {
			const prepareSave: IComment = {
				authorName: account.name,
				comment,
				recipeId,
				avatarUrl: account.avatar,
			}
			await commentsApi.createComment(prepareSave)
			appEvents.emit('reload', {})
			setComment('')
		} catch (error) {
			console.log('error create comment', error)
		}
	}
	return (
		<View style={[styles.container, {}]}>
			<View style={styles.rowTitle}>
				<Txt mod="xl">Comments</Txt>
				<View style={styles.fullView}>
					<Txt
						mod="s"
						color={colors.primary}
						onPress={showCommentsList}>
						All comments
					</Txt>
					<Icon
						color={colors.primary}
						style={styles.icon}
						name={'up-open-big'}
						size={10}
					/>
				</View>
			</View>
			<CommentForm value={comment} onChange={onChange} submit={submit} />
			<CommentsWidget
				scrollAnable={false}
				height={100}
				recipeId={recipeId}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingTop: 10,
		borderRadius: 20,
		backgroundColor: '#FFF',
	},
	rowTitle: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	fullView: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	icon: {
		marginLeft: 5,
	},
})
