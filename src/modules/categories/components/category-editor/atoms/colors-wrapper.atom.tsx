import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import { colorsConfig } from '~modules/categories/config'

const activeStyle = {
	height: 35,
	width: 35,
}

interface IProps {
	onChange: (val: string) => void
	activeColor: string
	style?: ViewStyle
}

export const ColorsWrapperAtom: FC<IProps> = ({
	activeColor,
	onChange,
	style,
}) => {
	return (
		<View style={[styles.container, style]}>
			{colorsConfig.map(it => {
				return (
					<TouchableOpacity
						onPress={() => onChange(it)}
						style={[
							styles.colorItem,
							{ backgroundColor: it },
							activeColor === it && activeStyle,
						]}></TouchableOpacity>
				)
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	colorItem: {
		height: 30,
		width: 30,
		borderRadius: 110,
		margin: 8,
	},
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
})
