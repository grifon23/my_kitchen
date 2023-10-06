import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import { colors, Txt } from '~modules/common'

interface IProps {
	name: string
	onPress: () => void
	style?: ViewStyle
}
export const Recipe: FC<IProps> = ({ name, onPress, style }) => {
	return (
		<View style={[styles.container, style]}>
			<TouchableOpacity onPress={onPress} style={styles.content}>
				<Txt style={{ fontWeight: '500' }}>{name}</Txt>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		justifyContent: 'center',
		borderRadius: 10,

		backgroundColor: colors.secondary,
		borderColor: colors.primary,
	},
	content: {
		width: '100%',
		paddingHorizontal: 15,
		paddingVertical: 20,
	},
})
