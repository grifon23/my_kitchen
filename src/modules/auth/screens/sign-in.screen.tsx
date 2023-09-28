import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import {
	appEvents,
	Button,
	colors,
	LinkTxt,
	ScreenLayout,
	Txt,
	TxtInput,
	useForm,
	useNav,
} from '~modules/common'
import { AuthRouteKey } from '~modules/root/typing/enums/route-key.enum'
import { SignInForm } from '../components'
import { ISignInForm } from '../typing'
import { signInValidator } from '../validators'
import { authApiService } from '../api'
import { exeptionsConfig } from '../config'

export const SignInScreen = () => {
	const form = useForm<ISignInForm>({}, signInValidator)
	const nav = useNav()

	const resetForm = () => form.setForm({ email: null, password: null })

	const resetErrors = () =>
		form.setFormErrors({
			email: null,
			password: null,
		})

	const submit = async () => {
		try {
			await authApiService.signIn(form.values)
			resetErrors()
			resetForm()
		} catch (error: any) {
			error.name = ''
			const message = exeptionsConfig[error?.toString()]
			if (message) {
				appEvents.emit('alert', {
					onPress: () => {},
					buttonType: 'primary',
					btnText: 'Close',
					message: message,
					icon: 'cancel-1',
					colorIcon: colors.errorTxt,
				})
			}
		}
	}

	return (
		<ScreenLayout viewStyle={styles.container} bottomSafeArea={true}>
			<View style={styles.formContainer}>
				<Txt style={styles.label} mod="xl" color={colors.primary}>
					Sign in
				</Txt>

				<SignInForm
					values={form.values}
					onChange={form.setFormField}
					errors={form.errors}
				/>
			</View>

			<View>
				<Button
					onPress={() => form.onSubmit(submit)}
					mod="primary"
					txtContent="Sign In"
					style={{ width: 200 }}
				/>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						marginVertical: 20,
					}}>
					<Txt>Dont have account go to </Txt>
					<LinkTxt onPress={() => nav.navigate(AuthRouteKey.SignUp)}>
						Sign Up
					</LinkTxt>
				</View>
			</View>
		</ScreenLayout>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		width: '100%',
		paddingHorizontal: 20,
	},
	formContainer: { flex: 1, justifyContent: 'center' },
	label: { textAlign: 'center', marginBottom: 60 },
})