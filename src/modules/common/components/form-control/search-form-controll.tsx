import React, { FC } from 'react'
import { View, ViewStyle } from 'react-native'
import { colors } from '~modules/common/theme'
import { Icon } from '../elements'
import { TxtInput } from './input.component'

interface IProps {
	value: string
	onChange: (val: string) => void
	placeholder: string
	horrizontalPadding?: number
	mb?: number
	style?: ViewStyle
}
export const SearchFormControll: FC<IProps> = ({
	value,
	onChange,
	placeholder,
	style,
	mb,
	horrizontalPadding,
}) => {
	return (
		<View
			style={[
				style,
				{ marginBottom: mb, paddingHorizontal: horrizontalPadding },
			]}>
			<TxtInput
				value={value}
				onChange={onChange}
				rightElement={
					<Icon name="search" size={25} color={colors.primary} />
				}
				placeholder={placeholder}
			/>
		</View>
	)
}
