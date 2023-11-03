import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import { Txt } from '~modules/common'

interface IProps {
	count: string
	metric: string
	name: string
}

export const PreviewIngradient: FC<IProps> = ({ count, metric, name }) => {
	return (
		<View style={styles.container}>
			<Txt>{name}</Txt>

			<View style={styles.separate} />

			<View style={styles.row}>
				<Txt>{count} </Txt>

				<Txt>{metric}</Txt>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	separate: {
		borderBottomWidth: 1,
		flex: 1,
		borderStyle: 'solid',
		paddingBottom: 10,
	},
	row: { flexDirection: 'row' },
})
