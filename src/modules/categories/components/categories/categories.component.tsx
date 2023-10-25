import React, { FC, useCallback } from 'react'
import {
	Dimensions,
	FlatList,
	ListRenderItem,
	StyleSheet,
	View,
} from 'react-native'
import { ICategory } from '~modules/categories/typing'
import { ListEmptyComponent } from '~modules/common'
import { Category } from '../category'

interface IProps {
	list: ICategory[]
	openEditor: (id?: string) => void
	removeCategory: (id: string) => void
	goDetailCategory: (id: string) => void
}
export const Categories: FC<IProps> = ({
	list,
	openEditor,
	removeCategory,
	goDetailCategory,
}) => {
	const renderItem: ListRenderItem<ICategory> = useCallback(
		({ item: it }: any) => {
			return (
				<Category
					editCategory={() => openEditor(it.id)}
					deleteCategory={() => removeCategory(it.id)}
					onPress={() => goDetailCategory(it.id)}
					label={it.name}
					style={styles.item}
				/>
			)
		},
		[list],
	)
	return (
		<View>
			<FlatList
				// style={{ flex: 1 }}
				scrollEnabled={true}
				data={list}
				renderItem={renderItem}
				keyExtractor={item => String(item.id)}
				horizontal={false}
				numColumns={2}
				columnWrapperStyle={styles.columnContainer}
				ListEmptyComponent={ListEmptyComponent}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	item: {
		maxWidth: Dimensions.get('window').width / 2,
		flex: 0.47,
		marginBottom: Dimensions.get('window').width * 0.05,
	},
	columnContainer: {
		justifyContent: 'space-between',
		paddingHorizontal: Dimensions.get('window').width * 0.05,
	},
})
