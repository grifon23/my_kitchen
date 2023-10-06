import { useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import {
	colors,
	PrimaryHeader,
	ScreenLayout,
	SwipableRow,
	Txt,
	useNav,
} from '~modules/common'
import { Recipe } from '../components'

export const RecipesScreen = () => {
	const { params }: any = useRoute()
	const [recipes, setrecipes] = useState([{ id: 1 }, { id: 2 }])

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
			needScroll={true}
			headerComponent={
				<PrimaryHeader
					label="Recipes"
					leftIcon="left-open-big"
					colorLeftIcon={colors.secondaryTxt}
					onPressLeftIcon={() => nav.goBack()}
				/>
			}>
			<Txt>Recipes list {params.categoryId}</Txt>
			<SwipableRow
				swipeRef={swipeRef}
				item={{ id: 1 }}
				openPopup={() => {}}>
				<Recipe name="Lecho" onPress={() => {}} />
			</SwipableRow>

			<SwipableRow
				swipeRef={swipeRef}
				item={{ id: 2 }}
				openPopup={() => {}}>
				<Recipe name="Lecho" onPress={() => {}} />
			</SwipableRow>

			<SwipableRow
				swipeRef={swipeRef}
				item={{ id: 3 }}
				openPopup={() => {}}>
				<Recipe name="Lecho" onPress={() => {}} />
			</SwipableRow>
			<SwipableRow
				swipeRef={swipeRef}
				item={{ id: 4 }}
				openPopup={() => {}}>
				<Recipe name="Lecho" onPress={() => {}} />
			</SwipableRow>
		</ScreenLayout>
	)
}
