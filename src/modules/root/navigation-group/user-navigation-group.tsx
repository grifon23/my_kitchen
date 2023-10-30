import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { UserRouteKey } from '../typing/enums/route-key.enum'
import { TabBarWidget } from '../widgets'
import { CategoriesScreen } from '~modules/categories'
import {
	EditorRecipeScreen,
	FavoriteRecipes,
	IngradientsRecipeScreen,
	RecipesScreen,
} from '~modules/recipes'
import { SettingsScreen } from '~modules/settings/screens'
import { MyProductScreen } from '~modules/products/screens'
import { ComingSoonScreen } from '../screens'
import { AccountEditScreen } from '~modules/acount'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
const HomeStack = createStackNavigator()
const UserSettingsStack = createStackNavigator()
const CreateAccountStack = createStackNavigator()

const HomeStackNavigator = () => {
	return (
		<HomeStack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName={UserRouteKey.Home}>
			<HomeStack.Screen
				name={UserRouteKey.Home}
				component={CategoriesScreen}
			/>
			<HomeStack.Screen
				name={UserRouteKey.Recipes}
				component={RecipesScreen}
			/>
		</HomeStack.Navigator>
	)
}

const UserTabNavigator = () => (
	<Tab.Navigator
		screenOptions={{ headerShown: false }}
		initialRouteName={UserRouteKey.Tabs}
		tabBar={({ state, navigation }) => (
			<TabBarWidget state={state} navigate={navigation.navigate} />
		)}>
		<Tab.Screen
			name={UserRouteKey.HomeStack}
			component={HomeStackNavigator}></Tab.Screen>
		<Tab.Screen
			name={UserRouteKey.Favorite}
			component={FavoriteRecipes}></Tab.Screen>
		<Tab.Screen
			name={UserRouteKey.EditorRecipe}
			component={EditorRecipeScreen}></Tab.Screen>
		<Tab.Screen
			name={UserRouteKey.Generate}
			component={ComingSoonScreen}></Tab.Screen>
		<Tab.Screen
			name={UserRouteKey.Settings}
			component={UserSettingsNavigator}></Tab.Screen>
	</Tab.Navigator>
)

const UserSettingsNavigator = () => {
	return (
		<UserSettingsStack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName={UserRouteKey.Settings}>
			<UserSettingsStack.Screen
				name={UserRouteKey.Settings}
				component={SettingsScreen}
			/>

			<UserSettingsStack.Screen
				name={UserRouteKey.MyProducts}
				component={MyProductScreen}
			/>
			<UserSettingsStack.Screen
				name={UserRouteKey.Account}
				component={AccountEditScreen}
			/>
		</UserSettingsStack.Navigator>
	)
}

export const CreateAccountNavigator = () => {
	return (
		<CreateAccountStack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName={UserRouteKey.Account}>
			<CreateAccountStack.Screen
				name={UserRouteKey.Account}
				component={AccountEditScreen}
			/>
			<CreateAccountStack.Screen
				name={UserRouteKey.MyProducts}
				component={MyProductScreen}
			/>
		</CreateAccountStack.Navigator>
	)
}
export const UserNavigationGroup = () => {
	return (
		<Stack.Navigator
			initialRouteName={UserRouteKey.Tabs}
			screenOptions={{ headerShown: false }}>
			<Stack.Screen
				component={UserTabNavigator}
				name={UserRouteKey.Tabs}
			/>
		</Stack.Navigator>
	)
}
