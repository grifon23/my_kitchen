import _ from 'lodash'
import React, { FC, useCallback } from 'react'
import { FlatList, ListRenderItem, StyleSheet } from 'react-native'
import { ListEmptyComponent, SwipableRow } from '~modules/common'
import { IRecipe } from '~modules/recipes/typing'
import { Recipe } from '../recipe/recipe.component'

interface IProps {
	list: any[]
	openEditor: (id: string, index: number) => void
	removeRecipe: (id: string, categoryId: string, inde?: number) => void
	goDetailRecipe: (id: string) => void
	swipeRef: any
	updateFavorite?: (id: string, isFavorite?: boolean) => void
	isFavoriteList?: boolean
}
export const RecilesList: FC<IProps> = ({
	list,
	openEditor,
	removeRecipe,
	goDetailRecipe,
	swipeRef,
	updateFavorite,
	isFavoriteList,
}) => {
	const renderItem: ListRenderItem<IRecipe> = useCallback(
		({ item: it, index }) => {
			return (
				<SwipableRow
					openEdit={() => openEditor(it.id, index)}
					key={it.id}
					swipeRef={swipeRef}
					itemIndex={index}
					openPopup={() => removeRecipe(it.categoryId, it.id, index)}>
					<Recipe
						isFavoriteItem={isFavoriteList}
						updateFavorite={updateFavorite}
						style={styles.item}
						item={it}
						onPress={() => goDetailRecipe(it.id)}
					/>
				</SwipableRow>
			)
		},
		[list],
	)

	return (
		<FlatList
			style={{ flex: 1 }}
			contentContainerStyle={styles.container}
			scrollEnabled={true}
			data={list}
			renderItem={renderItem}
			keyExtractor={item => String(item.id)}
			horizontal={false}
			ListEmptyComponent={ListEmptyComponent}
		/>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
	},
	item: {
		marginBottom: 20,
	},
})
