import React, { FC } from 'react'
import { Platform, StyleSheet, TouchableOpacity } from 'react-native'
import { $size, colors, Icon } from '~modules/common'
interface TabBarItemProps {
	isActive: boolean
	onPress: () => void
	iconName: string
}
export const TabBarItemAtom: FC<TabBarItemProps> = ({
	isActive,
	onPress,
	iconName,
}) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.item}>
			<Icon
				size={$size(24, 24)}
				color={isActive ? colors.primary : colors.secondaryTxt}
				name={iconName}
			/>
		</TouchableOpacity>
	)
}
const styles = StyleSheet.create({
	item: {
		justifyContent: 'center',
		alignItems: 'center',
	},
})
