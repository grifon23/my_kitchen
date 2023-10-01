import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, PrimaryHeader, ScreenLayout } from '~modules/common'
import { Categories, Category, CategoryEditor } from '../components'
import { ICategory } from '../typing'
const mockData: ICategory[] = [
	{ label: 'Soups', id: 1 },
	{ label: 'Hot dishes', id: 2 },
	{ label: 'Deserts', id: 3 },
	{ label: 'Salad', id: 4 },
	{ label: 'Meat', id: 5 },
	{ label: 'Fish', id: 6 },
	{ label: 'Torts', id: 7 },
	{ label: 'Fruits', id: 8 },
	{ label: 'Tasty', id: 9 },
]

export const HomeScreen = () => {
	const [isOpenEditor, setIsOpenEditor] = useState(false)

	const onClose = () => {
		setIsOpenEditor(false)
	}

	const openEditor = () => {
		setIsOpenEditor(true)
	}
	return (
		<>
			<ScreenLayout
				horizontalPadding={0}
				needScroll={false}
				viewStyle={{ flexGrow: 1 }}
				headerComponent={<PrimaryHeader label="Categories" />}>
				<View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
					<Button
						mod="outline"
						onPress={openEditor}
						txtContent="Add category"
					/>
				</View>

				<Categories list={mockData} />
			</ScreenLayout>
			<CategoryEditor isOpen={isOpenEditor} close={onClose} />
		</>
	)
}
