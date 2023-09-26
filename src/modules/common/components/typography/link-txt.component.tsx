import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import _ from 'lodash'
import { colors } from '~modules/common/theme'
import { Txt } from './txt.component'
interface IProps {
	onPress: () => void
	children: string
	mod?: any
}
export const LinkTxt: FC<IProps> = ({ onPress, children, mod }) => {
	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0.6}>
			<Txt mod={mod} color={colors.linkTxt}>
				{children}
			</Txt>
		</TouchableOpacity>
	)
}
