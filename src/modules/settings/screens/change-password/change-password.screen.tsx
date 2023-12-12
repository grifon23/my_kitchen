import React, { FC, useState } from 'react'
import _ from 'lodash'
import {
	$size,
	Button,
	colors,
	Icon,
	PrimaryHeader,
	ScreenLayout,
	TxtInput,
	useForm,
	useNav,
} from '~modules/common'
import { changePasswordService } from '~modules/settings/services'
import { IChangePasswordForm } from '~modules/settings/typing'
import { changePasswordValidator } from '~modules/settings/validators'
import { StyleSheet, View } from 'react-native'
import Toast from 'react-native-toast-message'

export const ChangePasswordScreen: FC = () => {
	const nav = useNav()
	const [showPassword, setShowPassword] = useState(false)
	const togglePassword = () => setShowPassword(prev => !prev)
	const { values, errors, ...form } = useForm<IChangePasswordForm>(
		{},
		changePasswordValidator,
	)

	const onFailure = (message: string) => {
		Toast.show({
			type: 'error',
			text1: message,
		})
	}
	const onSuccess = () => {
		nav.goBack()
		Toast.show({
			type: 'success',
			text1: 'Success',
		})
	}

	const submit = async () => {
		try {
			await changePasswordService.changePassword(
				values.currentPassword,
				values.newPassword,
			)
			onSuccess()
		} catch (error: any) {
			onFailure(`Invalid previous password, ${error.message}`)
		}
	}

	return (
		<ScreenLayout
			horizontalPadding={16}
			needScroll={true}
			viewStyle={{ flexGrow: 1 }}
			headerComponent={<PrimaryHeader label="Change password" />}>
			<View style={styles.container}>
				<View style={styles.inputsContainer}>
					<TxtInput
						label="Write Previous Password"
						inputProps={{ secureTextEntry: showPassword }}
						value={values.currentPassword}
						onChange={val =>
							form.setFormField('currentPassword', val)
						}
						styleContainer={{ marginBottom: 24 }}
						error={errors.currentPassword}
						placeholder={'Password'}
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
						label="Password"
						placeholder="Enter password"
						value={values.newPassword}
						onChange={val => form.setFormField('newPassword', val)}
						error={errors?.newPassword}
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
						value={values.confirmPassword}
						onChange={val =>
							form.setFormField('confirmPassword', val)
						}
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
				<Button
					onPress={() => form.onSubmit(submit)}
					mod="primary"
					txtContent="Change password"
				/>
			</View>
		</ScreenLayout>
	)
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		paddingTop: 48,
	},
	link: {
		marginBottom: $size(32),
	},
	inputsContainer: {
		marginBottom: $size(32),
	},
})
