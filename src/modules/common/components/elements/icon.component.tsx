import React, { FC } from 'react'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import { ColorValue, TouchableOpacity, ViewStyle } from 'react-native'
import fontelloConfig from '../../../../config/fontello.json'
const FontelloIcon = createIconSetFromFontello(fontelloConfig)

interface IProps {
	name: string
	size: number
	color?: ColorValue
	style?: ViewStyle
	onPress?: () => void
	buttonStyle?: ViewStyle
}
export const Icon: FC<IProps> = props => {
	if (props.onPress)
		return (
			<TouchableOpacity
				onPress={props.onPress}
				style={props.buttonStyle}
				activeOpacity={0.3}>
				<FontelloIcon {...props} onPress={null} />
			</TouchableOpacity>
		)
	return <FontelloIcon {...props} />
}
