import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { colors } from '~modules/common/theme'

export const Loader = () => {
	return (
		<View style={styles.container}>
			<ActivityIndicator color={colors.primary} />
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.bgLayout,
	},
})
