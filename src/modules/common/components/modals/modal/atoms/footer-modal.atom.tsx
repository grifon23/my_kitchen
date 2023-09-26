import React from 'react'
import { StyleSheet, View } from 'react-native'
export const ModalFooterAtom = ({
	children,
}: {
	children?: React.ReactNode
}) => <View style={styles.footer}>{children}</View>
const styles = StyleSheet.create({
	footer: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
})
