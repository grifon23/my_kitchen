import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { UIKitScreen } from './../../common/ua-kit/screens/ui-kit.screen'
import { UserRouteKey } from '../typing/enums/route-key.enum'
import { ComingSoonScreen } from '../screens'
import { TabBarWidget } from '../widgets'
import { CategoriesScreen } from '~modules/categories'
import { FavoriteRecipes, RecipesScreen } from '~modules/recipes'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
const HomeStack = createStackNavigator()

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
			name={UserRouteKey.CreateRecipe}
			component={ComingSoonScreen}></Tab.Screen>
		<Tab.Screen
			name={UserRouteKey.MyIngredients}
			component={UIKitScreen}></Tab.Screen>
		<Tab.Screen
			name={UserRouteKey.Profile}
			component={ComingSoonScreen}></Tab.Screen>
	</Tab.Navigator>
)

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
