import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { Txt, TxtInput, useForm } from '~modules/common'

interface IForm {
	email: string
	password: string
}

export const SignInScreen = () => {
	const form = useForm<IForm>({}, () => null)
	console.log('values', form.values)
	return (
		<View style={styles.container}>
			<Txt mod="md">Sign in</Txt>

			<TxtInput
				onChange={val => form.setFormField('email', val)}
				value={form.values.email}
				label="Email"
				styleContainer={{ width: '100%', marginBottom: 20 }}
			/>

			<TxtInput
				onChange={val => form.setFormField('password', val)}
				value={form.values.password}
				label="Passvord"
				styleContainer={{ width: '100%' }}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		paddingHorizontal: 20,
	},
})