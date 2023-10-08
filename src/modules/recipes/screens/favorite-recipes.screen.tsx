import _ from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import {
	appEvents,
	colors,
	PrimaryHeader,
	ScreenLayout,
	Txt,
} from '~modules/common'
import { Loader } from '~modules/common/components/elements/loader.element'
import { SearchFormControll } from '~modules/common/components/form-control/search-form-controll'
import { selectFavoriteRecipes } from '~modules/store/favorite/selector'
import { RecilesList } from '../components'
import { recipesService } from '../service'
import { IRecipe } from '../typing'

export const FavoriteRecipes = () => {
	const { data: favorites } = useSelector(selectFavoriteRecipes)
	const [isLoading, setIsLoading] = useState(false)
	const [searchString, setSearchString] = useState<string>('')
	const loadFavoriteRecipes = async () => {
		setIsLoading(true)
		try {
			await recipesService.loadFavoriteRecipe()
			setIsLoading(false)
		} catch (error) {
			console.log('error')
		}
	}
	useEffect(() => {
		loadFavoriteRecipes()
	}, [])

	const swipeRef: Array<any> = []
	let prevOpenedRow
	const falseDeletePlant = (id: number) => {
		prevOpenedRow = swipeRef[id]
		if (prevOpenedRow && prevOpenedRow === swipeRef[id]) {
			prevOpenedRow.close()
		}
	}
	const memoFilteringRecipe = useMemo(() => {
		if (favorites) {
			const fitlterList = favorites.filter((it: IRecipe) =>
				it.name.toLowerCase().includes(searchString),
			)
			return fitlterList
		}
	}, [searchString, favorites])

	if (isLoading) return <Loader />

	const removeFromFavorines = async (categoryId: string, id: string) => {
		await recipesService.removeRecipe(categoryId, id)
		await recipesService.loadFavoriteRecipe()
	}

	const alertRemoveRecipe = (categoryId: string, id: string) => {
		appEvents.emit('alert', {
			onPress: async () => removeFromFavorines(categoryId, id),
			btnText: 'Ok',
			icon: 'trash',
			buttonType: 'primary',
			message: 'Are you sure delete recipe?',
			onPressCancelBtn: () => {},
		})
	}
	return (
		<ScreenLayout
			horizontalPadding={0}
			needScroll={false}
			headerComponent={<PrimaryHeader label="Favorite recipes" />}>
			<SearchFormControll
				value={searchString}
				onChange={setSearchString}
				placeholder="Search ..."
				horrizontalPadding={16}
				mb={20}
			/>

			<RecilesList
				isFavoriteList={true}
				swipeRef={swipeRef}
				list={memoFilteringRecipe}
				openEditor={_.noop}
				goDetailRecipe={_.noop}
				removeRecipe={alertRemoveRecipe}
			/>
		</ScreenLayout>
	)
}
