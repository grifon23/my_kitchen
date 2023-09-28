import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { UIKitScreen } from './../../common/ua-kit/screens/ui-kit.screen'
import { UserRouteKey } from '../typing/enums/route-key.enum'

const Stack = createStackNavigator()

export const UserNavigationGroup = () => {
	return (
		<Stack.Navigator
			initialRouteName={UserRouteKey.Home}
			screenOptions={{ headerShown: false }}>
			<Stack.Screen component={UIKitScreen} name={UserRouteKey.Home} />
		</Stack.Navigator>
	)
}
