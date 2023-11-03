import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
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
import { SignInForm } from '../components'
import { ISignInForm } from '../typing'
import { signInValidator } from '../validators'
import { exeptionsConfig } from '../config'
import { authService } from '../services'

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
			await authService.signIn(form.values)
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

	const signInWithGoogle = async () => {
		try {
			await authService.signInWithGoogle()
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
					Sign in
				</Txt>

				<SignInForm
					values={form.values}
					onChange={form.setFormField}
					errors={form.errors}
				/>
			</View>
			<View style={styles.buttonsGroup}>
				<Button
					onPress={() => form.onSubmit(submit)}
					mod="primary"
					txtContent="Login"
					style={styles.btn}
				/>
				<Button
					onPress={signInWithGoogle}
					mod="outline"
					txtContent="Login with Google"
					style={styles.btn}
					icon="google"
					iconColor={colors.primary}
				/>
			</View>

			<View style={styles.linkContainer}>
				<Txt>Dont have account go to </Txt>
				<LinkTxt onPress={() => nav.navigate(AuthRouteKey.SignUpStack)}>
					Sign Up
				</LinkTxt>
			</View>
		</ScreenLayout>
	)
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		justifyContent: 'space-between',
	},
	formContainer: { flexGrow: 1, justifyContent: 'center' },
	label: { textAlign: 'center', marginBottom: 60 },
	linkContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 20,
	},
	btn: {
		marginBottom: 20,
		width: '100%',
	},
	buttonsGroup: {
		alignItems: 'center',
	},
})
