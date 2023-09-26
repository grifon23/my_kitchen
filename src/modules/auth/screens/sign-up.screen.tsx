import React from 'react'
import { StyleSheet, View } from 'react-native'
import {
	Button,
	colors,
	LinkTxt,
	ScreenLayout,
	Txt,
	useForm,
} from '~modules/common'
import { useNav } from '~modules/common/components/hooks'
import { AuthRouteKey } from '~modules/root/typing/enums/route-key.enum'
import { SignUpForm } from '../components/sign-up-form.component'
import { ISignUpForm } from '../typing'
import { signUpValidator } from '../validators'

export const SignUpScreen = () => {
	const form = useForm<ISignUpForm>({}, signUpValidator)
	const nav = useNav()

	const submit = async () => {
		try {
			console.log('submit form', form.values)
		} catch (error) {
			console.log('error submit', error)
		}
	}
	console.log('error', form.errors)
	return (
		<ScreenLayout viewStyle={styles.container} bottomSafeArea={true}>
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
		paddingHorizontal: 20,
	},
	formContainer: { flex: 1, justifyContent: 'center' },
	label: { textAlign: 'center', marginBottom: 60 },
})
