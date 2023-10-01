import React, { FC } from 'react'
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native'
import { colors } from '~modules/common/theme'
import { Txt } from '../typography'

export const ListEmptyComponent: FC = () => {
	return (
		<View style={styles.container}>
			<Txt mod="xl" color={colors.primary} style={styles.txt}>
				List is empty
			</Txt>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		height: Dimensions.get('screen').height * 0.8,
	},
	txt: {
		opacity: 0.5,
	},
})
