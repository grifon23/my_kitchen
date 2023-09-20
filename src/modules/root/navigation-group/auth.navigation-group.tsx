import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {SignInScreen} from '../../auth';
import { UIKitScreen } from './../../common/ua-kit/screens/ui-kit.screen'

const Stack = createStackNavigator()

export const AuthNavigationGroup = () => {
	return (
		<Stack.Navigator
			initialRouteName="auth"
			screenOptions={{ headerShown: false }}>
			<Stack.Screen component={UIKitScreen} name="auth" />
		</Stack.Navigator>
	)
}
  