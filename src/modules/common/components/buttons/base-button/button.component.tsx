import React from 'react'
import { FC } from 'react'
import { StyleSheet, ViewStyle, TouchableOpacity } from 'react-native'
import { colors } from '~modules/common/theme'
import { Icon } from '../../elements'
import { Txt } from '../../typography'
import { styleModConfig } from './style-config'

interface IProps {
	mod: 'primary' | 'outline'
	onPress: () => void
	txtContent: string
	style?: ViewStyle
	icon?: string
	iconStyle?: ViewStyle
	iconColor?: string
}
export const Button: FC<IProps> = ({
	onPress,
	txtContent,
	mod,
	style,
	icon,
	iconStyle,
	iconColor,
}) => {
	const styleMod = styleModConfig[mod]
	return (
		<TouchableOpacity
			activeOpacity={0.6}
			onPress={onPress}
			style={[style, styles.container, styleMod.container]}>
			<Txt mod="md" style={styleMod.txt}>
				{txtContent}
			</Txt>
			{icon && (
				<Icon
					color={iconColor}
					name={icon}
					size={24}
					style={{ marginLeft: 10, ...iconStyle }}
				/>
			)}
		</TouchableOpacity>
	)
}
const styles = StyleSheet.create({
	container: {
		maxWidth: '100%',
		height: 60,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 16,
		zIndex: 99,
		flexDirection: 'row',
	},
})
