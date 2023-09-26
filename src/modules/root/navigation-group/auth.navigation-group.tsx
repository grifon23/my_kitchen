import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import { SignInScreen, SignUpScreen } from '../../auth'
import { UIKitScreen } from './../../common/ua-kit/screens/ui-kit.screen'
import { AuthRouteKey } from '../typing/enums/route-key.enum'

const Stack = createStackNavigator()

export const AuthNavigationGroup = () => {
	return (
		<Stack.Navigator
			initialRouteName="auth"
			screenOptions={{ headerShown: false }}>
			<Stack.Screen component={SignInScreen} name={AuthRouteKey.SignIn} />
			<Stack.Screen component={SignUpScreen} name={AuthRouteKey.SignUp} />
		</Stack.Navigator>
	)
}
  