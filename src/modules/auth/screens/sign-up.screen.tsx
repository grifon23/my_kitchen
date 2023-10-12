import React from 'react'
import { StyleSheet, View } from 'react-native'
import {
	appEvents,
	Button,
	colors,
	LinkTxt,
	ScreenLayout,
	Txt,
	useForm,
	useNav,
} from '~modules/common'
import { AuthRouteKey } from '~modules/root/typing/enums/route-key.enum'
import { SignUpForm } from '../components/sign-up-form.component'
import { exeptionsConfig } from '../config'
import { ISignUpForm } from '../typing'
import { signUpValidator } from '../validators'
import { authService } from '../services'

export const SignUpScreen = () => {
	const form = useForm<ISignUpForm>({}, signUpValidator)
	const nav = useNav()

	const resetForm = () =>
		form.setForm({ email: null, password: null, confirmPassword: null })

	const resetErrors = () =>
		form.setFormErrors({
			email: null,
			password: null,
			confirmPassword: null,
		})

	const submit = async () => {
		try {
			await authService.signUp(form.values)
			resetForm()
			resetErrors()
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
		<ScreenLayout
			scrollStyle={styles.container}
			bottomSafeArea={true}
			needScroll={true}
			horizontalPadding={20}>
			<View style={styles.formContainer}>
				<Txt style={styles.label} mod="xl" color={colors.primary}>
					Sign Up
				</Txt>

				<SignUpForm
					values={form.values}
					onChange={form.setFormField}
					errors={form.errors}
				/>
			</View>

			<View>
				<Button
					onPress={() => form.onSubmit(submit)}
					mod="primary"
					txtContent="Create account"
				/>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						marginVertical: 20,
					}}>
					<Txt>You have account go to </Txt>
					<LinkTxt onPress={() => nav.navigate(AuthRouteKey.SignIn)}>
						Sign In
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
		flexGrow: 1,
	},
	formContainer: { flex: 1, justifyContent: 'center' },
	label: { textAlign: 'center', marginBottom: 60 },
})
