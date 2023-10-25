import React from 'react'
import { StyleSheet, View } from 'react-native'
export const ModalBodyAtom = ({ children }: { children?: React.ReactNode }) => (
	<View style={styles.body}>{children}</View>
)
const styles = StyleSheet.create({
	body: {
		justifyContent: 'center',
		minHeight: 100,
	},
})
