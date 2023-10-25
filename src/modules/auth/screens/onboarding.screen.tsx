import React from 'react'
import { Button, ScreenLayout, useNav } from '~modules/common'
import { Image, View } from 'react-native'
import { AuthRouteKey } from '~modules/root/typing/'
export const OnboardingScreen = () => {
	const nav = useNav()
	return (
		<ScreenLayout
			horizontalPadding={20}
			viewStyle={{
				justifyContent: 'space-between',
			}}
			bottomSafeArea={true}>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<Image
					source={require('../../../assets/images/myKitche.png')}
					style={{ height: '35%', width: '90%' }}
				/>
			</View>

			<View>
				<Button
					txtContent="Login"
					onPress={() => nav.navigate(AuthRouteKey.SignIn)}
					mod="outline"
					style={{ marginBottom: 20 }}
				/>

				<Button
					txtContent="Sign up"
					onPress={() => nav.navigate(AuthRouteKey.SignUp)}
					mod="primary"
				/>
			</View>
		</ScreenLayout>
	)
}
