import React from 'react'
import { FC } from 'react'
import { StyleSheet, TextInput, View, ViewStyle } from 'react-native'
import { ErrorTxt } from '../typography'
import { Txt } from '../typography/txt.component'

interface IProps {
	value: string
	onChange: (val: string) => void
	label?: string
	error?: string
	styleContainer?: ViewStyle
}
export const TxtInput: FC<IProps> = ({
	value,
	onChange,
	label,
	error,
	styleContainer,
}) => {
	return (
		<View style={styleContainer}>
			{label ? (
				<Txt mod="es" style={styles.label}>
					{label}
				</Txt>
			) : null}

			<TextInput
				value={value}
				onChangeText={onChange}
				style={styles.input}
			/>
			{error ? <ErrorTxt error={error} /> : null}
		</View>
	)
}

const styles = StyleSheet.create({
	label: {
		marginBottom: 10,
	},
	input: {
		height: 60,
		width: '100%',
		borderRadius: 10,
		borderWidth: 1,
		fontSize: 20,
		lineHeight: 24,
		paddingLeft: 10,
	},
})
