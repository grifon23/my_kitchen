import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Txt } from '~modules/common'

interface IProps {
	onPress: () => void
	label: string
}

export const DropdownItemSelectAtom: FC<IProps> = ({ onPress, label }) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.drobDownItem}>
			<Txt mod="md" style={styles.txtItem}>
				{label}
			</Txt>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	drobDownItem: {
		paddingVertical: 8,
		borderRadius: 10,
	},
	txtItem: {},
})
