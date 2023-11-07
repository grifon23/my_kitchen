import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { colors } from '~modules/common/theme'
import { Icon } from '../../elements'
import { Txt } from '../../typography'

interface IProps {
	label?: string
	onChange: () => void
	isActive?: boolean
}

export const Checkbox: FC<IProps> = ({ label, onChange, isActive }) => {
	const renderIcon = () => {
		if (!isActive) {
			return null
		}
		return <Icon name="check" size={20} color={colors.primary} />
	}

	return (
		<TouchableOpacity
			activeOpacity={0.6}
			style={styles.container}
			onPress={onChange}>
			<Txt>{label}</Txt>
			<View style={styles.checkbox}>{renderIcon()}</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	checkbox: {
		height: 25,
		width: 25,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: colors.primary,
		marginLeft: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
