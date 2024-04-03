import React from 'react'
import { Button, GradientButton, ScreenLayout, useNav } from '~modules/common'
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
					source={require('../../../assets/images/Logo.png')}
					style={{ height: '25%', width: '50%' }}
				/>
			</View>

			<View>
				<Button
					txtContent="Login"
					onPress={() => nav.navigate(AuthRouteKey.SignIn)}
					mod="outline"
					style={{ marginBottom: 20 }}
				/>
			</View>
			<GradientButton
				txtContent="Sign up"
				onPress={() => nav.navigate(AuthRouteKey.SignUpStack)}
			/>
		</ScreenLayout>
	)
}
