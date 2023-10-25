import React from 'react'
import { StyleSheet, View } from 'react-native'
export const ModalHeaderAtom = ({
	children,
}: {
	children?: React.ReactNode
}) => <View style={styles.header}>{children}</View>
const styles = StyleSheet.create({
	header: {
		justifyContent: 'center',
	},
})
