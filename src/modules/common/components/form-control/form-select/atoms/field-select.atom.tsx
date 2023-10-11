import React, { FC, useMemo } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Txt } from '~modules/common/components/typography'
import { colors } from '~modules/common/theme'
import { IOption } from '~modules/common/typing'

interface IProps {
	onPress: () => void
	selected: string
	placeholder: string
	disabled?: boolean
}

export const FieldSelectAtom: FC<IProps> = ({
	onPress,
	selected,
	placeholder = 'Select',
	disabled,
}) => {
	const renderMemoField = useMemo(() => {
		if (selected) {
			return (
				<Txt ellipsizeMode={'tail'} numberOfLines={1} mod="md">
					{selected}
				</Txt>
			)
		}
		return (
			<Txt mod="md" style={{ opacity: 0.5 }}>
				{placeholder}
			</Txt>
		)
	}, [selected])

	return (
		<TouchableOpacity
			onPress={onPress}
			style={styles.containerField}
			disabled={disabled}>
			{renderMemoField}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	containerField: {
		height: 60,
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 10,
		justifyContent: 'center',
		backgroundColor: colors.bgLayout,
		width: '100%',
		borderWidth: 1,
		borderColor: colors.primary,
	},
})
