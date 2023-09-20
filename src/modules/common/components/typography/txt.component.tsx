import React, { FC } from 'react'
import { Text, StyleSheet, TextStyle, TextProps } from 'react-native'
import { $size } from '../helpers';
const sizes = {
  s: $size(10, 8),
  es: $size(12, 10),
  sm: $size(14, 12),
  md: $size(16, 14),
  lg: $size(18, 16),
  xl: $size(20, 18),
};
const lineHeights = {
  s: $size(12, 10),
  es: $size(14, 12),
  sm: $size(16, 14),
  md: $size(18, 16),
  lg: $size(20, 18),
  xl: $size(22, 20),
};
export interface TxtProps extends TextProps {
	children: any
	style?: TextStyle | TextStyle[]
	color?: string
	mod?: keyof typeof sizes
	hide?: Boolean
	numberOfLines?: number
}
export const Txt: FC<TxtProps> = ({
	children,
	style = {},
	mod = 'md',
	hide,
	color,
	...props
}) => {
	if (hide === true) return null
	return (
		<Text
			{...props}
			style={[
				{
					...styles.text,
					color: color ? color : '#121212',
					fontSize: sizes[mod],
					lineHeight: lineHeights[mod],
				},
				style,
			]}>
			{children}
		</Text>
	)
}
const styles = StyleSheet.create({
	text: {},
})