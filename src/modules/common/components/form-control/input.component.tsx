import React from 'react'
import { FC } from 'react'
import {
	StyleSheet,
	TextInput,
	TextInputProps,
	View,
	ViewStyle,
} from 'react-native'
import { colors } from '~modules/common/theme'
import { ErrorTxt } from '../typography'
import { Txt } from '../typography/txt.component'

interface IProps {
	value: string
	onChange: (val: string) => void
	label?: string
	error?: string
	styleContainer?: ViewStyle
	placeholder?: string
	inputProps?: Omit<TextInputProps, 'value' | 'onChange' | 'placeholder'>

	rightElement?: JSX.Element
}
export const TxtInput: FC<IProps> = ({
	value,
	onChange,
	label,
	error,
	styleContainer,
	placeholder,
	rightElement,
	inputProps = {},
}) => {
	return (
		<View style={styleContainer}>
			{label ? (
				<Txt mod="es" style={styles.label}>
					{label}
				</Txt>
			) : null}
			<View style={styles.container}>
				<TextInput
					autoCapitalize="none"
					placeholder={placeholder}
					value={value}
					onChangeText={onChange}
					style={styles.input}
					{...inputProps}
				/>
				{rightElement ? (
					<View style={styles.rightElement}>{rightElement}</View>
				) : null}
			</View>

			{error ? <ErrorTxt error={error} /> : null}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		position: 'relative',
	},
	label: {
		marginBottom: 10,
		color: colors.primary,
	},
	input: {
		height: 60,
		width: '100%',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: colors.primary,
		fontSize: 20,
		lineHeight: 24,
		paddingLeft: 10,
		color: colors.primaryTxt,
	},
	rightElement: {
		position: 'absolute',
		right: 20,
	},
})
