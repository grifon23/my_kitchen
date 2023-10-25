import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import { $size, colors, Icon, Txt } from '~modules/common'
interface IProps {
	label: string
	onPress: () => void
	style?: ViewStyle
	deleteCategory: () => void
	editCategory: () => void
}
export const Category: FC<IProps> = ({
	label,
	onPress,
	style,
	deleteCategory,
	editCategory,
}) => {
	return (
		<View style={[styles.container, style]}>
			<View style={styles.topContainer}>
				<Icon
					name="info"
					size={20}
					color={colors.secondaryTxt}
					style={{ opacity: 0.5 }}
					onPress={editCategory}
				/>

				<Icon
					name="trash"
					size={20}
					color={colors.errorTxt}
					style={{ opacity: 0.5 }}
					onPress={deleteCategory}
				/>
			</View>

			<TouchableOpacity onPress={onPress} style={styles.content}>
				<Txt mod="md" color={colors.secondaryTxt} style={styles.label}>
					{label}
				</Txt>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: $size(100, 80),
		height: $size(200, 180),
		borderRadius: 10,
		borderWidth: 1,
		backgroundColor: colors.secondary,
		borderColor: colors.primary,
	},
	topContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 15,
	},
	content: {
		height: 140,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	label: {},
})
