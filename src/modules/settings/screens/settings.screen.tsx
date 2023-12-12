import React, { FC } from 'react'
import _ from 'lodash'
import { MenuList, PrimaryHeader, ScreenLayout, useNav } from '~modules/common'
import { appEvents } from '~modules/common/events'
import { UserRouteKey } from '~modules/root/typing'
import { menuListConfig } from '~modules/settings/config'
import { authService } from '~modules/auth/services'

export const SettingsScreen: FC = () => {
	const nav = useNav()

	const openLogOutConfirm = () => {
		appEvents.emit('alert', {
			onPress: async () => await authService.logOut(),
			btnText: 'Ok',
			icon: 'logout',
			buttonType: 'primary',
			message: 'Are you sure want to Log out?',
			onPressCancelBtn: () => {},
		})
	}

	const openNextVersionAlert = () => {
		appEvents.emit('alert', {
			onPress: () => {},
			btnText: 'Close',
			icon: 'info',
			buttonType: 'primary',
			message: 'These settings will be available in the next version',
		})
	}

	const logout = () => {
		openLogOutConfirm()
	}
	const aboutUs = () => nav.navigate(UserRouteKey.AboutUs)
	const shareUs = () => {
		openNextVersionAlert()
	}
	const connectGoogle = () => {
		openNextVersionAlert()
	}
	const passwordChange = () => nav.navigate(UserRouteKey.ChangePassword)

	const favoriteRecipe = () => {
		nav.navigate(UserRouteKey.Favorite)
	}
	const account = () => {
		nav.navigate(UserRouteKey.Account)
	}
	const menuConfig = menuListConfig({
		logout,
		aboutUs,
		shareUs,
		connectGoogle,
		passwordChange,
		favoriteRecipe,
		account,
	})
	return (
		<ScreenLayout
			horizontalPadding={16}
			needScroll={true}
			viewStyle={{ flexGrow: 1 }}
			headerComponent={<PrimaryHeader label="Settings" />}>
			<MenuList items={menuConfig} />
		</ScreenLayout>
	)
}
