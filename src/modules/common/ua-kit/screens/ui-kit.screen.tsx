import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, colors, Txt, TxtInput, useForm } from '~modules/common'

interface IForm {
	email: string
	password: string
}

export const UIKitScreen = () => {
	const form = useForm<IForm>({}, () => null)
	return (
		<View style={styles.container}>
			<TxtInput
				placeholder="Enter email"
				onChange={val => form.setFormField('email', val)}
				value={form.values.email}
				label="Email"
				styleContainer={{ width: '100%', marginBottom: 20 }}
				error={'This field is require'}
			/>

			<TxtInput
				placeholder="Enter password"
				onChange={val => form.setFormField('password', val)}
				value={form.values.password}
				label="Passvord"
				styleContainer={{ width: '100%', marginBottom: 20 }}
			/>
			<Button
				onPress={() => {}}
				mod="outline"
				txtContent="Sign Up"
				style={{ marginBottom: 20 }}
			/>
			<Button onPress={() => {}} mod="primary" txtContent="Continue" />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		width: '100%',
		paddingHorizontal: 20,
		backgroundColor: colors.bgLayout,
	},
})
