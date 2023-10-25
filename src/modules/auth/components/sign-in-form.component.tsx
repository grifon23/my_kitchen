import React, { FC, useState } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { colors, Icon, TxtInput } from '~modules/common'
import { ISignInForm } from '../typing'

interface IProps {
	values: ISignInForm
	onChange: (key: keyof ISignInForm, val: string) => void
	errors?: any
	style?: ViewStyle
}
export const SignInForm: FC<IProps> = ({ values, onChange, errors, style }) => {
	const [showPassword, setShowPassword] = useState(false)
	const togglePassword = () => setShowPassword(prev => !prev)
	return (
		<View style={[styles.container, style]}>
			<TxtInput
				label="Email"
				value={values.email}
				onChange={val => onChange('email', val)}
				error={errors?.email}
				styleContainer={{ marginBottom: 24 }}
				placeholder="Enter email"
			/>

			<TxtInput
				inputProps={{ secureTextEntry: showPassword }}
				label="Password"
				placeholder="Enter password"
				value={values.password}
				onChange={val => onChange('password', val)}
				error={errors?.password}
				rightElement={
					<Icon
						name={showPassword ? 'eye' : 'eye-off'}
						size={30}
						color={colors.primary}
						onPress={togglePassword}
					/>
				}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
	},
})
