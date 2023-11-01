import _ from 'lodash'
import moment from 'moment'
import React, { FC, useRef } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Drawer from 'react-native-drawer'
import { useSelector } from 'react-redux'
import {
	Button,
	Loader,
	PrimaryHeader,
	RemoteImage,
	ScreenLayout,
	Txt,
	useNav,
} from '~modules/common'
import { EditorRecipeScreen } from '~modules/recipes'
import { UserRouteKey } from '~modules/root/typing/enums/route-key.enum'
import { selectAccount } from '~modules/store/account/selector'
import { TextRow } from '../components'
import { AccountEditScreen } from './account-edit.screen'

export const AccountScreen: FC = () => {
	const nav = useNav()
	const { data, isLoading } = useSelector(selectAccount)
	const { email, name, dateOfBirth, avatar, gender } = data
	const drawerRef = useRef(null)

	const openDrawer = () => {
		drawerRef.current?.open()
	}
	const closeDrawer = () => {
		drawerRef.current?.close()
	}

	if (isLoading) return <Loader />
	return (
		<Drawer
			side="right"
			ref={drawerRef}
			content={<AccountEditScreen onPressLeftIcon={closeDrawer} />}>
			<ScreenLayout
				scrollStyle={styles.container}
				bottomSafeArea={false}
				needScroll={true}
				horizontalPadding={20}
				headerComponent={
					<PrimaryHeader
						label="Profile"
						onPressLeftIcon={() => nav.goBack()}
						onPressRightIcon={openDrawer}
						rightIcon="pencil"
						leftIcon="left-open-big"
					/>
				}>
				<View style={styles.formContainer}>
					<View style={styles.image}>
						<RemoteImage
							url={avatar}
							source={require('~assets/images/user.png')}
							styleImg={{
								height: 200,
								width: 200,
								marginHorizontal: 8,
							}}
						/>
					</View>
					<TextRow label="Name" value={name} />
					<TextRow label="Email" value={email} />
					<TextRow label="Gender" value={gender} />
					<TextRow
						label="Date of Birthday"
						value={moment(dateOfBirth).format('DD MMMM YYYY')}
					/>
				</View>
				<View style={styles.buttonsGroup}>
					<Button
						onPress={() => nav.navigate(UserRouteKey.MyProducts)}
						mod="outline"
						txtContent="My product"
						style={styles.btn}
					/>
				</View>
			</ScreenLayout>
		</Drawer>
	)
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		justifyContent: 'space-between',
	},
	formContainer: {},
	btn: {
		width: '45%',
		marginBottom: 20,
	},
	buttonsGroup: {
		alignItems: 'center',
	},
	image: {
		justifyContent: 'center',
		alignItems: 'center',
	},
})
