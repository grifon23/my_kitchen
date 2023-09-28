import React from 'react'
import { StyleSheet } from 'react-native'
import { authService } from '~modules/auth/services'
import {
	Button,
	colors,
	TxtInput,
	useForm,
	PrimaryHeader,
	appEvents,
} from '~modules/common'
import { ScreenLayout } from '~modules/common/components/layouts'

interface IForm {
	email: string
	password: string
}

export const UIKitScreen = () => {
	const form = useForm<IForm>({}, () => null)
	const openAlert = () => {
		console.log('press')
		appEvents.emit('alert', {
			onPress: () => console.log('press event alert'),
			btnText: 'Close',
			icon: 'user',
			buttonType: 'primary',
			message: 'Alert modal',
		})
	}
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
				onPress={async () => await authService.logOut()}
				mod="outline"
				txtContent="LogOut"
				style={{ marginBottom: 20 }}
			/>
			<Button onPress={openAlert} mod="primary" txtContent="Open alert" />
		</ScreenLayout>
	)
}
