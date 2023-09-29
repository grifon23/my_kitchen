import React, { FC, useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { $size, colors, Icon } from '~modules/common'

export const ActionBtnAtom: FC = () => {
	return (
		<TouchableOpacity
			activeOpacity={0.6}
			style={styles.container}
			onPress={() => {}}>
			<Icon name="plus-circled" size={32} color={colors.bgLayout} />
		</TouchableOpacity>
	)
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.primary,
		height: $size(56, 52),
		width: $size(56, 52),
		borderRadius: 110,
		alignItems: 'center',
		justifyContent: 'center',
		bottom: 10,
	},
})
