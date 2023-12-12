import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { RemoteImage, Txt } from '~modules/common'

interface IProps {
	text: string
	avatarUrl: string
	authorName: string
}
export const CommentItem: FC<IProps> = ({ avatarUrl, authorName, text }) => {
	return (
		<View style={styles.container}>
			<RemoteImage
				style={styles.avatar}
				source={require('~assets/images/user.png')}
				url={avatarUrl}
			/>
			<View>
				<Txt style={styles.authorName}>{authorName}</Txt>
				<Txt style={styles.comment}>{text}</Txt>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		marginBottom: 10,
	},

	authorName: {
		marginBottom: 3,
		opacity: 0.6,
		fontSize: 16,
	},
	avatar: {
		height: 40,
		width: 40,
		borderRadius: 110,
		marginRight: 10,
	},
	comment: {
		fontSize: 14,
		lineHeight: 15,
	},
})
