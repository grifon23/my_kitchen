import React, { FC } from 'react'
import { View, ViewStyle, TouchableOpacity } from 'react-native'
import { colors } from '~modules/common/theme'
import { Icon } from '../elements'

interface IProps {
	label: string
	goBack?: () => void
	rightElement?: JSX.Element
	style?: ViewStyle
}
export const BaseHeader: FC<IProps> = ({
	goBack,
	label,
	rightElement,
	style,
}) => {
	return (
		<View>
			{goBack ? (
				<TouchableOpacity>
					<Icon name="floppy" size={30} color={colors.primary} />
				</TouchableOpacity>
			) : null}
		</View>
	)
}
