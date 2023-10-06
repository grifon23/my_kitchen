import React, { FC } from 'react'
import {
	ColorValue,
	Platform,
	StyleSheet,
	TouchableOpacity,
	View,
	ViewStyle,
} from 'react-native'
import { colors } from '~modules/common/theme'
import { Icon } from '../elements'
import { $size } from '../../helpers'
import { Txt } from '../typography'

interface IProps {
	label?: string
	colorLeftIcon?: ColorValue
	leftIcon?: string
	rightIcon?: string
	colorRightIcon?: ColorValue
	onPressRightIcon?: () => void
	onPressLeftIcon?: () => void
	style?: ViewStyle
}
export const PrimaryHeader: FC<IProps> = ({
	leftIcon,
	onPressLeftIcon,
	label,
	colorLeftIcon,
	rightIcon,
	colorRightIcon,
	onPressRightIcon,
	style,
}) => {
	return (
		<View style={[styles.container, style]}>
			{leftIcon && (
				<TouchableOpacity
					style={[styles.icon, { left: 15 }]}
					onPress={onPressLeftIcon}>
					<Icon
						name={leftIcon}
						size={$size(20)}
						color={colorLeftIcon}
					/>
				</TouchableOpacity>
			)}
			{label ? (
				<Txt mod="lg" style={styles.label}>
					{label}
				</Txt>
			) : null}

			{rightIcon && (
				<TouchableOpacity
					onPress={onPressRightIcon}
					style={[styles.icon, { right: 15 }]}>
					<Icon
						name={rightIcon}
						size={$size(20)}
						color={colorRightIcon}
					/>
				</TouchableOpacity>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.bgLayout,
		flexDirection: 'row',
		justifyContent: 'center',
		position: 'relative',
		alignItems: 'flex-end',
		height: Platform.OS === 'ios' ? 80 : 60,
	},
	icon: {
		position: 'absolute',
		zIndex: 99,
	},
	label: {
		textAlign: 'center',
		width: '100%',
		color: colors.primaryTxt,
		zIndex: 99,
	},
})
