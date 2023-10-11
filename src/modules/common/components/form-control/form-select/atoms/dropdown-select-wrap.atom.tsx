import React, { FC, PropsWithChildren } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Txt } from '~modules/common/components'
import { colors } from '~modules/common/theme'

export const DropdownSelectWrapAtom: FC<PropsWithChildren> = ({ children }) => {
	return (
		<View style={styles.dropDown}>
			<ScrollView>{children}</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	dropDown: {
		paddingHorizontal: 20,
		paddingVertical: 15,
		backgroundColor: colors.secondary,
		minHeight: 300,
		maxHeight: 400,
		borderRadius: 10,
	},
})
