import React, { FC, useCallback } from 'react'
import {
	Dimensions,
	FlatList,
	ListRenderItem,
	StyleSheet,
	View,
} from 'react-native'
import { ListEmptyComponent } from '~modules/common'
import { ICategory } from '~modules/home/typing'
import { Category } from '../category'

interface IProps {
	list: ICategory[]
}
export const Categories: FC<IProps> = ({ list }) => {
	const renderItem: ListRenderItem<ICategory> = useCallback(
		({ item: it }: any) => {
			return (
				<Category
					onPress={() => {
						console.log('press item', it.id)
					}}
					label={it.label}
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
