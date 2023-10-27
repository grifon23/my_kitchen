import _ from 'lodash'
import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {
	appEvents,
	Button,
	colors,
	PrimaryHeader,
	ScreenLayout,
	useForm,
	useNav,
} from '~modules/common'
import {
	AuthRouteKey,
	UserRouteKey,
} from '~modules/root/typing/enums/route-key.enum'
import { AccountForm } from '../components'
import { IAccountForm } from '../typing'
import { accountFormValidate } from '../valida'

export const AccountScreen: FC = () => {
	const form = useForm<IAccountForm>({}, accountFormValidate)
	const nav = useNav()

	const resetForm = () =>
		form.setForm({
			email: 'email.com.',
			name: null,
			dateOfBirth: null,
			gender: null,
		})

	const resetErrors = () =>
		form.setFormErrors({
			email: 'email.com.',
			name: null,
			dateOfBirth: null,
			gender: null,
		})

	const submit = async () => {
		try {
			resetErrors()
			resetForm()
		} catch (error: any) {
			appEvents.emit('alert', {
				onPress: () => {},
				buttonType: 'primary',
				btnText: 'Close',
				message: error,
				icon: 'cancel-1',
				colorIcon: colors.errorTxt,
			})
		}
	}

	return (
		<ScreenLayout
			scrollStyle={styles.container}
			bottomSafeArea={true}
			needScroll={true}
			horizontalPadding={20}
			headerComponent={<PrimaryHeader label="Profile" />}>
			<View style={styles.formContainer}>
				<AccountForm
					values={form.values}
					onChange={form.setFormField}
					errors={form.errors}
				/>
			</View>
			<View style={styles.buttonsGroup}>
				<Button
					onPress={() => form.onSubmit(submit)}
					mod="primary"
					txtContent="Save"
					style={styles.btn}
				/>
				<Button
					onPress={() => nav.navigate(UserRouteKey.MyIngredients)}
					mod="outline"
					txtContent="My product"
					style={styles.btn}
				/>
			</View>
		</ScreenLayout>
	)
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		justifyContent: 'space-between',
	},
	formContainer: {},
	linkContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 20,
	},
	btn: {
		width: '45%',
		marginBottom: 20,
	},
	buttonsGroup: {
		flexDirection: 'row',
		justifyContent: 'space-between',

	},
})
