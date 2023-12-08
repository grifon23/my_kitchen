import _ from 'lodash'
import React, { FC, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon, TxtInput, colors } from '~modules/common'

export const CommentForm: FC = () => {
	const [comment, setComment] = useState('')
	const onChange = (val: string) => {
		setComment(val)
	}
	return (
		<View style={styles.inputWrapper}>
			<TxtInput
				label="Add comment"
				value={comment}
				onChange={val => onChange(_.trimStart(val))}
				placeholder={'Write something '}
				minHeight={40}
				isTexterea={true}
				styleContainer={{ flexGrow: 1, maxWidth: '88%' }}
				inputProps={{
					multiline: true,
				}}
			/>
			<Icon
				name="send-fill"
				size={25}
				color={colors.primary}
				buttonStyle={styles.sendButton}
				onPress={() => _.noop}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {},
	label: {},
	inputWrapper: {
		marginVertical: 20,
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
	},
	input: {},
	sendButton: {
		height: 40,
		width: 40,
		borderRadius: 110,
		backgroundColor: 'rgba(212, 212, 250, 0.4)',
		alignItems: 'center',
		justifyContent: 'center',
		paddingLeft: 3,
	},
})
