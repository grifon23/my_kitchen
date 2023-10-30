import _ from 'lodash'
import React, { FC, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { accountService } from '~modules/acount/service'
import {
	appEvents,
	Button,
	colors,
	messageToast,
	PrimaryHeader,
	RemoteImage,
	ScreenLayout,
	useForm,
	useNav,
} from '~modules/common'
import { openGalleryPicker } from '~modules/common/service'
import {
	AuthRouteKey,
	UserRouteKey,
} from '~modules/root/typing/enums/route-key.enum'
import { selectAccount } from '~modules/store/account/selector'
import { AccountForm } from '../components'
import { IAccountForm } from '../typing'
import { accountFormValidate } from '../validations'

export const AccountScreen: FC = () => {
	const form = useForm<IAccountForm>({}, accountFormValidate)
	const nav = useNav()
	const { data } = useSelector(selectAccount)
	const [file, setFile] = useState(null)

	const onChoseImageFromLibbrary = async () => {
		try {
			const { assets } = await openGalleryPicker()
			if (assets === undefined) {
				return
			} else {
				setFile({ ...file, ['avatar']: assets[0] })
				form.setFormField('avatar', assets[0].uri)
			}
		} catch (error) {
			console.log('error', error)
		}
	}

	const resetForm = () =>
		form.setForm({
			email: 'email.com.',
			name: null,
			dateOfBirth: null,
			gender: null,
			avatar: null,
		})

	const resetErrors = () =>
		form.setFormErrors({
			email: 'email.com.',
			name: null,
			dateOfBirth: null,
			gender: null,
			avatar: null,
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

	const uploadAvatar = async () => {
		if (!file.backgroundImg) {
			return
		} else {
			await accountService.uploadAvatar(file.backgroundImg)
			console.error('ifghlij;')
		}
	}

	const saveMainInfo = async () => {
		try {
			await uploadAvatar()
			await accountService.updateAccountInfo(form.values)
			messageToast('success', 'Account update successfully')
		} catch (error) {
			console.log('Save main info', error)
		}
	}

	return (
		<ScreenLayout
			scrollStyle={styles.container}
			bottomSafeArea={false}
			needScroll={true}
			horizontalPadding={20}
			headerComponent={<PrimaryHeader label="Profile" />}>
			<View style={styles.formContainer}>
				<TouchableOpacity
					onPress={onChoseImageFromLibbrary}
					style={styles.image}>
					<RemoteImage
						source={require('~assets/images/user.png')}
						styleImg={{
							height: 200,
							width: 200,
							marginHorizontal: 8,
						}}
					/>
				</TouchableOpacity>
				<AccountForm
					values={form.values}
					onChange={form.setFormField}
					errors={form.errors}
					email={data.email}
				/>
			</View>
			<View style={styles.buttonsGroup}>
				<Button
					onPress={() => form.onSubmit(saveMainInfo)}
					mod="primary"
					txtContent="Save"
					style={styles.btn}
				/>
				<Button
					onPress={() => nav.navigate(UserRouteKey.MyProducts)}
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
	image: {
		justifyContent: 'center',
		alignItems: 'center',
	},
})
