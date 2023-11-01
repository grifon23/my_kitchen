import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { $size, Txt } from '~modules/common'

interface IProps {
	value: string
	label?: string
}

export const TextRow: FC<IProps> = ({ value, label }) => {
	return (
		<View style={styles.container}>
			{label && (
				<Txt mod="sm" style={styles.label}>
					{label}
				</Txt>
			)}
			<Txt style={styles.txt}>{value}</Txt>
		</View>
	)
}

const styles = StyleSheet.create({
	txt: {
		padding: $size(15),
		borderRadius: $size(10),
		borderWidth: 1,
		borderColor: '#7832EA',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		textAlign: 'left',
	},
	container: {
		marginBottom: 20,
	},
	label: {
		marginBottom: 10,
		color: '#7832EA',
	},
})
