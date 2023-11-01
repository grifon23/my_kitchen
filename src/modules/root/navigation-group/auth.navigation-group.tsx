import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { OnboardingScreen, SignInScreen, SignUpScreen } from '../../auth'
import { AuthRouteKey, SignUpRouteKey } from '../typing/enums/route-key.enum'
import { AccountEditScreen } from '~modules/account'
import { MyProductScreen } from '~modules/products/screens'

const Stack = createStackNavigator()
const SignUpStack = createStackNavigator()

export const AuthNavigationGroup = () => {
	return (
		<Stack.Navigator
			initialRouteName={AuthRouteKey.Onboarding}
			screenOptions={{ headerShown: false }}>
			<Stack.Screen
				component={OnboardingScreen}
				name={AuthRouteKey.Onboarding}
			/>
			<Stack.Screen component={SignInScreen} name={AuthRouteKey.SignIn} />
			<Stack.Screen
				component={SignUpNavigator}
				name={AuthRouteKey.SignUpStack}
			/>
		</Stack.Navigator>
	)
}

export const SignUpNavigator = () => {
	return (
		<SignUpStack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName={SignUpRouteKey.SignUp}>
			<SignUpStack.Screen
				name={SignUpRouteKey.SignUp}
				component={SignUpScreen}
			/>
			<SignUpStack.Screen
				name={SignUpRouteKey.Account}
				component={AccountEditScreen}
			/>
			<SignUpStack.Screen
				name={SignUpRouteKey.MyProducts}
				component={MyProductScreen}
			/>
		</SignUpStack.Navigator>
	)
}
