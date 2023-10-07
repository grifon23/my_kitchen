import React, { FC, useCallback } from 'react'
import { FlatList, ListRenderItem, StyleSheet } from 'react-native'
import { ListEmptyComponent, SwipableRow } from '~modules/common'
import { IRecipe } from '~modules/recipes/typing'
import { Recipe } from '../recipe/recipe.component'

interface IProps {
	list: any[]
	openEditor: (id?: string) => void
	removeRecipe: (id: string) => void
	goDetailRecipe: (id: string) => void
	swipeRef: any
}
export const RecilesList: FC<IProps> = ({
	list,
	openEditor,
	removeRecipe,
	goDetailRecipe,
	swipeRef,
}) => {
	const renderItem: ListRenderItem<IRecipe> = useCallback(
		({ item: it }) => {
			return (
				<SwipableRow
					key={it.id}
					swipeRef={swipeRef}
					item={{ id: 4 }}
					openPopup={() => removeRecipe(it.id)}>
					<Recipe
						style={styles.item}
						name={it.name}
						onPress={() => {}}
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
