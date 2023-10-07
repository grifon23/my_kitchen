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
			<View style={styles.item}>
				{leftIcon ? (
					<TouchableOpacity
						style={styles.icon}
						onPress={onPressLeftIcon}>
						<Icon
							name={leftIcon}
							size={$size(20)}
							color={colorLeftIcon}
						/>
					</TouchableOpacity>
				) : null}
			</View>

			<View style={styles.item}>
				{label ? (
					<Txt mod="lg" style={styles.label}>
						{label}
					</Txt>
				) : null}
			</View>
			<View style={styles.item}>
				{rightIcon ? (
					<TouchableOpacity
						onPress={onPressRightIcon}
						style={styles.icon}>
						<Icon
							name={rightIcon}
							size={$size(20)}
							color={colorRightIcon}
						/>
					</TouchableOpacity>
				) : null}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.bgLayout,
		flexDirection: 'row',
		justifyContent: 'space-between',
		position: 'relative',
		alignItems: 'center',
		height: Platform.OS === 'ios' ? 80 : 80,
		paddingTop: 30,
	},
	icon: {
		zIndex: 99,
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	label: {
		textAlign: 'center',
		width: '100%',
		color: colors.primaryTxt,
		zIndex: 99,
	},
	item: {
		minWidth: 40,
	},
})
