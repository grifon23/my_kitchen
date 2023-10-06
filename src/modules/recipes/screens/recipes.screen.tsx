import { useRoute } from '@react-navigation/native'
import _ from 'lodash'
import React, { useState } from 'react'
import {
	colors,
	PrimaryHeader,
	ScreenLayout,
	Txt,
	useNav,
} from '~modules/common'
import { RecilesList } from '../components'

export const RecipesScreen = () => {
	const { params }: any = useRoute()
	const [recipes, setrecipes] = useState([
		{ id: 1, name: 'recipe 1' },
		{ id: 2, name: 'recipe 2' },
		{ id: 2, name: 'recipe 2' },
		{ id: 2, name: 'recipe 2' },
		{ id: 2, name: 'recipe 2' },
		{ id: 2, name: 'recipe 2' },
		{ id: 2, name: 'recipe 2' },
		{ id: 2, name: 'recipe 2' },
		{ id: 2, name: 'recipe 2' },
		{ id: 2, name: 'recipe 2' },
		{ id: 2, name: 'recipe 2' },
	])

	const nav = useNav()

	const swipeRef: Array<any> = []
	let prevOpenedRow
	const falseDeletePlant = (id: number) => {
		prevOpenedRow = swipeRef[id]
		if (prevOpenedRow && prevOpenedRow === swipeRef[id]) {
			prevOpenedRow.close()
			// setPopup({
			// 	show: false,
			// 	plant: null,
			// })
		}
	}
	const swipeOpenPopup = (item: any) => {}

	return (
		<ScreenLayout
			horizontalPadding={0}
			needScroll={false}
			headerComponent={
				<PrimaryHeader
					label="Recipes"
					leftIcon="left-open-big"
					colorLeftIcon={colors.secondaryTxt}
					onPressLeftIcon={() => nav.goBack()}
				/>
			}>
			<Txt>Recipes list {params.categoryId}</Txt>
			<RecilesList
				swipeRef={swipeRef}
				list={recipes}
				openEditor={_.noop}
				goDetailRecipe={_.noop}
				removeRecipe={_.noop}
			/>
		</ScreenLayout>
	)
}
