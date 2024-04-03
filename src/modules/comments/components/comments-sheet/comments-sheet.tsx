import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import ActionSheet, {
	SheetManager,
	SheetProps,
} from 'react-native-actions-sheet'
import { CommentForm } from '../comment-form'
import { Icon, Txt, appEvents, colors } from '~modules/common'
import { CommentsWidget } from '~modules/comments/widgets'
import { useSelector } from 'react-redux'
import { selectAccount } from '~modules/store/account/selector'
import { IComment } from '~modules/comments/typing'
import { commentsApi } from '~modules/comments/api'

export const CommentsSheet = (props: SheetProps) => {
	const { data: account } = useSelector(selectAccount)
	const recipeId = props.payload?.recipeId
	const [comment, setComment] = useState('')
	const onChange = (val: string) => {
		setComment(val)
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
	const hideCommentsList = () => {
		SheetManager.hide('comments-sheet')
	}

	console.log('in sheet', props.payload?.recipeId)
	return (
		<ActionSheet
			snapPoints={[80, 30]}
			initialSnapIndex={0}
			id={props.sheetId}>
			<View style={[styles.container, {}]}>
				<View style={styles.rowTitle}>
					<Txt mod="xl">Comments</Txt>
					<View style={styles.fullView}>
						<Txt
							mod="s"
							color={colors.primary}
							onPress={hideCommentsList}>
							Hide comments
						</Txt>
						<Icon
							color={colors.primary}
							style={styles.icon}
							name={'down-open-big'}
							size={10}
						/>
					</View>
				</View>
				<CommentForm
					value={comment}
					onChange={onChange}
					submit={submit}
				/>
				<CommentsWidget
					height={'65%'}
					recipeId={props.payload?.recipeId}
					scrollAnable={true}
				/>
			</View>
		</ActionSheet>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingTop: 10,
		borderRadius: 20,
		backgroundColor: '#FFF',
		flexGrow: 1,
		height: '100%',
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
