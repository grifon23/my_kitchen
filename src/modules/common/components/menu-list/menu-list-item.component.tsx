import React, { FC } from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { colors, Icon } from '~modules/common'
import { $size } from '~modules/common/helpers'
import { Txt } from '../typography'
import { MenuListRightIcon } from './atoms'

export interface IMenuListItemsProps {
	text: string
	onPress: () => void
	arrow?: boolean
	rightIcon?: string
	leftIcon?: string
}

export const MenuListItem: FC<IMenuListItemsProps> = ({
	text,
	onPress,
	arrow,
	rightIcon,
	leftIcon,
}) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.buttonWrapper}>
			<View style={styles.content}>
				<View style={styles.leftContent}>
					{leftIcon && (
						<Icon
							size={24}
							color={'#7832EA'}
							name={leftIcon}
							style={styles.customIcon}
						/>
					)}
					<Txt style={styles.text}>{text}</Txt>
				</View>
				<MenuListRightIcon arrow={arrow} icon={rightIcon} />
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	buttonWrapper: {
		height: 56,
		paddingHorizontal: 16,
		width: '100%',
		borderRadius: 4,
		justifyContent: 'center',
		marginBottom: 20,
		borderWidth: 2,
		borderColor: 'rgba(120, 50, 234, 0.3)',
	},
	content: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	leftContent: {
		flexDirection: 'row',
	},
	customIcon: {
		marginRight: 16,
	},
	text: {
		color: '#7832EA',
		lineHeight: 24,
		fontSize: $size(16),
	},
})
