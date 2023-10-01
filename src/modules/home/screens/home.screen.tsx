import React from 'react'
import { PrimaryHeader, ScreenLayout } from '~modules/common'
import { Categories, Category } from '../components'
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
	return (
		<ScreenLayout
			horizontalPadding={0}
			needScroll={true}
			headerComponent={
				<PrimaryHeader
					label="Categories"
					style={{ marginBottom: 30 }}
				/>
			}>
			<Categories list={mockData} />
		</ScreenLayout>
	)
}
