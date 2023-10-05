import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import { $size, colors, Txt } from '~modules/common'
interface IProps {
	label: string
	onPress: () => void
	style?: ViewStyle
	deleteCategory: () => void
}
export const Category: FC<IProps> = ({
	label,
	onPress,
	style,
	deleteCategory,
}) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[styles.container, style]}
			onLongPress={deleteCategory}>
			<Txt mod="md" color={colors.secondaryTxt} style={styles.label}>
				{label}
			</Txt>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		width: $size(100, 80),
		height: $size(100, 80),
		borderRadius: 10,
		borderWidth: 1,
		backgroundColor: colors.secondary,
		borderColor: colors.primary,
		alignItems: 'center',
		justifyContent: 'center',
	},
	label: {},
})
