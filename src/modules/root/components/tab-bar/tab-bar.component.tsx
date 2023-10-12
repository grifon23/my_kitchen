import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { ActionBtnAtom, TabBarItemAtom } from './atoms'
import { tabBarIconsConfig } from '~modules/root/config'
import { UserRouteKey } from '~modules/root/typing'
import { colors } from '~modules/common'
interface ITabBarProps {
	items: string[]
	onPressItem: (index: number, routeName: string) => void
	activeIndex: number
}
export const TabBarComponent = (props: ITabBarProps) => {
	const items = props.items.map((route: any, index) => {
		const isActive = props.activeIndex === index
		const onPress = () => props.onPressItem(index, route)
		if (UserRouteKey.CreateRecipe === route) {
			return <ActionBtnAtom key={`${route}-${index}`} />
		}
		return (
			<TabBarItemAtom
				key={`${route}-${index}`}
				isActive={isActive}
				onPress={onPress}
				iconName={tabBarIconsConfig[route] as string}
			/>
		)
	})
	return <View style={styles.container}>{items}</View>
}
const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'flex-start',
		backgroundColor: colors.secondary,
		zIndex: 999,
		paddingTop: 5,
		borderTopWidth: StyleSheet.hairlineWidth,
		borderTopColor: colors.lightPrimary,
	},
})
