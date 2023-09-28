import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { colors } from '~modules/common'
import { appService } from '~modules/common/service'

export const RootLoadingScreen = () => {
	useEffect(() => {
		appService.init()
	}, [])
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
