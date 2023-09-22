import React from 'react'
import { StyleSheet } from 'react-native'
import {
	Button,
	colors,
	TxtInput,
	useForm,
	PrimaryHeader,
} from '~modules/common'
import { ScreenLayout } from '~modules/common/components/layouts'

interface IForm {
	email: string
	password: string
}

export const UIKitScreen = () => {
	const form = useForm<IForm>({}, () => null)
	return (
		<ScreenLayout
			needScroll={true}
			horizontalPadding={20}
			bottomSafeArea={true}
			topPadding={20}
			stutusBarBg={colors.secondary}
			headerComponent={
				<PrimaryHeader
					label="UI Kit screen"
					rightIcon="menu-1"
					colorLeftIcon={colors.primary}
					colorRightIcon={colors.primary}
					leftIcon={'left-open-big'}
				/>
			}>
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
		</ScreenLayout>
	)
}
