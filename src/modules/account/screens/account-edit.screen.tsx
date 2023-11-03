import _ from 'lodash'
import React, { FC, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { accountService } from '~modules/account/service'
import { authService } from '~modules/auth/services'
import {
	Button,
	Loader,
	messageToast,
	PrimaryHeader,
	RemoteImage,
	ScreenLayout,
	useForm,
	useNav,
} from '~modules/common'
import { openGalleryPicker } from '~modules/common/service'
import { UserRouteKey } from '~modules/root/typing/enums/route-key.enum'
import { selectAccount } from '~modules/store/account/selector'
import { AccountForm } from '../components'
import { IAccountForm } from '../typing'
import { accountFormValidate } from '../validations'

interface IProps {
	onPressLeftIcon?: () => void
}

export const AccountEditScreen: FC<IProps> = ({ onPressLeftIcon }) => {
	const { data, isLoading } = useSelector(selectAccount)
	const { avatar, name, dateOfBirth, gender, uuid } = data
	const nav = useNav()
	const form = useForm<IAccountForm>(
		{ avatar, name, dateOfBirth, gender },
		accountFormValidate,
	)
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

	const saveMainInfo = async () => {
		try {
			
			if (file?.avatar) {
				const downloadImgUrl = await accountService.uploadAvatar(
					`${file.avatar.fileName}_avatar.jpg`,
					file.avatar.uri,
				)
				await authService.updateAccountInfo({
					...form.values,
					avatar: downloadImgUrl,
					uuid: uuid,
				})
				
			} else {
				await authService.updateAccountInfo({
					...form.values,
					uuid: uuid,
				})
			}
			messageToast('success', 'Account update successfully')
		} catch (error: any) {
			console.log('Save main info', error)
			messageToast('error', error.message)
		}
	}

	if (isLoading) return <Loader />
	return (
		<ScreenLayout
			scrollStyle={styles.container}
			bottomSafeArea={false}
			needScroll={true}
			horizontalPadding={20}
			headerComponent={
				<PrimaryHeader
					label="EditProfile"
					onPressLeftIcon={
						onPressLeftIcon ? onPressLeftIcon : () => nav.goBack()
					}
					leftIcon="left-open-big"
				/>
			}>
			<View style={styles.formContainer}>
				<TouchableOpacity
					onPress={onChoseImageFromLibbrary}
					style={styles.image}>
					<RemoteImage
						url={
							form.values.avatar
								? form.values.avatar
								: file?.avatar.uri
						}
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
