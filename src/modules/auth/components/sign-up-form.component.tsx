import React, { FC, useState } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { colors, Icon, TxtInput } from '~modules/common'
import { ISignInForm, ISignUpForm } from '../typing'

interface IProps {
	values: ISignUpForm
	onChange: (key: keyof ISignUpForm, val: string) => void
	errors?: any
	style?: ViewStyle
}
export const SignUpForm: FC<IProps> = ({ values, onChange, errors, style }) => {
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
				styleContainer={{ marginBottom: 24 }}
				rightElement={
					<Icon
						name={showPassword ? 'eye' : 'eye-off'}
						size={30}
						color={colors.primary}
						onPress={togglePassword}
					/>
				}
			/>
			<TxtInput
				inputProps={{ secureTextEntry: showPassword }}
				label="Confirm password"
				placeholder="Enter password"
				value={values.password}
				onChange={val => onChange('confirmPassword', val)}
				error={errors?.confirmPassword}
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
