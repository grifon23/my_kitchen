import React, { FC, useCallback } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { ListRenderItem } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import { IDashboardRecipeItem } from '~modules/recipes/typing'
import { DashboardRecipeItem } from '../dashboard-recipe-item'

interface IProps {
	recipes: any[]
	isLoading: boolean
	goDetailed: (id: string) => void
	reload: () => void
}
export const DashboardRecipeList: FC<IProps> = ({
	recipes,
	isLoading,
	goDetailed,
	reload,
}) => {
	const renderItem: ListRenderItem<IDashboardRecipeItem> = useCallback(
		({ item, index }) => {
			return (
				<DashboardRecipeItem
					style={styles.items}
					name={item.name}
					description={item.description}
					onPress={() => goDetailed(item.id)}
					countComments={5 + index * (2 + index * 3)}
				/>
			)
		},
		[recipes],
	)

	const keyExtractor = useCallback((item: IDashboardRecipeItem) => {
		return item.id
	}, [])

	return (
		<FlatList
			data={recipes}
			renderItem={renderItem}
			keyExtractor={keyExtractor}
			showsVerticalScrollIndicator={false}
			refreshControl={
				<RefreshControl
					onRefresh={reload}
					refreshing={isLoading}
					title="Pull to refresh"
					tintColor="#fff"
					titleColor="#fff"
				/>
			}
		/>
	)
}

const styles = StyleSheet.create({
	list: {},
	items: { marginBottom: 20 },
})
