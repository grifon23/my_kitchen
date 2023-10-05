import React from 'react'
import { FC } from 'react'
import { StyleSheet, ViewStyle, TouchableOpacity } from 'react-native'
import { colors } from '~modules/common/theme'
import { Txt } from '../../typography'
import { styleModConfig } from './style-config'

interface IProps {
	mod: 'primary' | 'outline'
	onPress: () => void
	txtContent: string
	style?: ViewStyle
}
export const Button: FC<IProps> = ({ onPress, txtContent, mod, style }) => {
	const styleMod = styleModConfig[mod]
	return (
		<TouchableOpacity
			activeOpacity={0.6}
			onPress={onPress}
			style={[style, styles.container, styleMod.container]}>
			<Txt mod="md" style={styleMod.txt}>
				{txtContent}
			</Txt>
		</TouchableOpacity>
	)
}
const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 60,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 16,
		zIndex: 99,
	},
})
