import _ from 'lodash'
import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import {
	Button,
	PrimaryHeader,
	RemoteImage,
	ScreenLayout,
	useNav,
} from '~modules/common'
import { UserRouteKey } from '~modules/root/typing/enums/route-key.enum'
import { selectAccount } from '~modules/store/account/selector'
import { TextRow } from '../components'
import { GendersEnum } from '../typing'

export const AccountScreen: FC = () => {
	const nav = useNav()
	const { data } = useSelector(selectAccount)
	const { email, name,  } = data

	return (
		<ScreenLayout
			scrollStyle={styles.container}
			bottomSafeArea={false}
			needScroll={true}
			horizontalPadding={20}
			headerComponent={<PrimaryHeader label="Profile" />}>
			<View style={styles.formContainer}>
				<View style={styles.image}>
					<RemoteImage
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
				<TextRow label="Gender" value={GendersEnum.Female} />
				<TextRow label="Date of Birthday" value={'20.10.2001'} />
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
