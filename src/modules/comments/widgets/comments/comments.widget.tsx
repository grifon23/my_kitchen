import React, { FC, useEffect, useState } from 'react'
import { LayoutAnimation, StyleSheet, View } from 'react-native'
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
}
export const CommentsWidget: FC<IProps> = ({ recipeId }) => {
	const [isFullView, setFullView] = useState(false)

	const toggleFullView = () => {
		setFullView(!isFullView)
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
	}
	return (
		<View style={[styles.container, {}]}>
			<View style={styles.rowTitle}>
				<Txt mod="xl">Comments</Txt>
				<View style={styles.fullView}>
					<Txt
						mod="s"
						color={colors.primary}
						onPress={toggleFullView}>
						Full view
					</Txt>
					<Icon
						color={colors.primary}
						style={styles.icon}
						name={isFullView ? 'up-open-big' : 'down-open-big'}
						size={10}
					/>
				</View>
			</View>
			<CommentForm />
			<CommentsList fullPreview={isFullView} list={mockComment} />
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
