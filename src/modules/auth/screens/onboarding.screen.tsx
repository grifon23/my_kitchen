import React from 'react'
import { Button, ScreenLayout } from '~modules/common'
import { View } from 'react-native'
import { useNav } from '~modules/common'
import { AuthRouteKey } from '~modules/root/typing/'
export const OnboardingScreen = () => {
	const nav = useNav()
	return (
		<ScreenLayout>
			<View>
				<Button
					txtContent="Login"
					onPress={() => nav.navigate(AuthRouteKey.SignIn)}
					mod="primary"
				/>

				<Button
					txtContent="Login"
					onPress={() => nav.navigate(AuthRouteKey.SignUp)}
					mod="primary"
				/>
			</View>
		</ScreenLayout>
	)
}
