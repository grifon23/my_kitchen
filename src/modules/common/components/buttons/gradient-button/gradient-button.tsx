import React, { useMemo } from 'react'
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import { LinearGradient } from 'react-native-gradients'
import { Txt } from '../../typography'

interface IProps {
	onPress: () => void
	txtContent: string
	style?: ViewStyle
	height?: number
	disable?: boolean
}
export const GradientButton = ({
	onPress,
	txtContent,
	style,
	height = 58,
	disable = false,
}: IProps) => {
	const colorList = [
		{ offset: '0%', color: '#89C77A', opacity: '1' },
		{ offset: '100%', color: '#95B84B', opacity: '1' },
	]
	return (
		<TouchableOpacity
			style={[
				styles.container,
				style,
				{ height, opacity: disable ? 0.5 : 1 },
			]}
			disabled={disable}
			onPress={onPress}>
			<View style={styles.gradient}>
				<Txt style={styles.txt} color="#FFFFFF">
					{txtContent}
				</Txt>
				<LinearGradient colorList={colorList} angle={30} />
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		maxWidth: '100%',
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 99,
		flexDirection: 'row',
		shadowColor: '#333333',
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.2,
		shadowRadius: 12,
		elevation: 1,
		position: 'relative',
	},

	txt: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		zIndex: 2,
		top: '30%',
		left: '40%',
		fontWeight: 600,
	},
	gradient: {
		width: '100%',
		overflow: 'hidden',
		borderRadius: 10,
	},
})
