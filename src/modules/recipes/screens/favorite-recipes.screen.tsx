import _ from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import {
	appEvents,
	colors,
	PrimaryHeader,
	ScreenLayout,
	Txt,
	useNav,
} from '~modules/common'
import { Loader } from '~modules/common/components/elements/loader.element'
import { SearchFormControll } from '~modules/common/components/form-control/search-form-controll'
import { selectFavoriteRecipes } from '~modules/store/favorite/selector'
import { RecilesList } from '../components'
import { recipesService } from '../service'
import { IRecipe } from '../typing'
import { UserRouteKey } from '~modules/root/typing'

export const FavoriteRecipes = () => {
	const nav = useNav()
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

	const removeFromFavorines = async (
		categoryId: string,
		id: string,
		index: number,
	) => {
		try {
			await recipesService.updateFavorite(id, false)
			falseDeletePlant(index)
		} catch (error) {
			console.log('error remove category')
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

	const alertRemoveRecipe = (
		categoryId: string,
		id: string,
		index: number,
	) => {
		appEvents.emit('alert', {
			onPress: async () => removeFromFavorines(categoryId, id, index),
			btnText: 'Ok',
			icon: 'trash',
			buttonType: 'primary',
			message: 'Are you sure delete recipe?',
			onPressCancelBtn: () => {},
		})
	}

	const goDetailedRecipe = (id: string) =>
		nav.navigate(UserRouteKey.DetailedRecipe, { id })

	if (isLoading) return <Loader />

	return (
		<ScreenLayout
			horizontalPadding={0}
			needScroll={false}
			headerComponent={
				<PrimaryHeader
					label="Favorite recipes"
					leftIcon="left-open-big"
					colorLeftIcon={colors.secondaryTxt}
					onPressLeftIcon={() => nav.navigate(UserRouteKey.Settings)}
				/>
			}>
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
				goDetailRecipe={goDetailedRecipe}
				removeRecipe={alertRemoveRecipe}
			/>
		</ScreenLayout>
	)
}
