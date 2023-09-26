import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { colors } from '~modules/common/theme'
export const ModalContainerAtom = ({
	children,
	style,
}: {
	children: React.ReactNode
	style?: ViewStyle
}) => {
	return <View style={[styles.container, style]}>{children}</View>
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.secondary,
		borderRadius: 4,
	},
})
