import { useRoute } from '@react-navigation/native'
import _ from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import {
	appEvents,
	colors,
	gcService,
	PrimaryHeader,
	ScreenLayout,
	useNav,
} from '~modules/common'
import { Loader } from '~modules/common/components/elements/loader.element'
import { SearchFormControll } from '~modules/common/components/form-control/search-form-controll'
import { selectRecipes } from '~modules/store/recipes/selector'
import { RecilesList } from '../components'
import { recipesService } from '../service'
import { IRecipe } from '../typing'
import { UserRouteKey } from '~modules/root/typing'

export const RecipesScreen = () => {
	const { params }: any = useRoute()
	const nav = useNav()
	const { data } = useSelector(selectRecipes)
	const [isLoading, setIsLoading] = useState(false)
	const [searchString, setSearchString] = useState<string>('')
	const loadRecipe = async () => {
		setIsLoading(true)
		try {
			await recipesService.loadRecipesByCategory(params.categoryId)
			setIsLoading(false)
		} catch (error) {
			console.log('error', error)
		}
	}

	useEffect(() => {
		loadRecipe()
	}, [params.categoryId])

	const swipeRef: Array<any> = []
	let prevOpenedRow
	const falseDeletePlant = (id: number) => {
		prevOpenedRow = swipeRef[id]
		if (prevOpenedRow && prevOpenedRow === swipeRef[id]) {
			prevOpenedRow.close()
		}
	}
	const memoFilteringRecipe = useMemo(() => {
		if (data) {
			const fitlterList = data.filter((it: IRecipe) =>
				it.name.toLowerCase().includes(searchString),
			)
			return fitlterList
		}
	}, [searchString, data])

	const removeRecipe = async (categoryId: string, id: string) => {
		try {
			await recipesService.removeRecipe(categoryId, id)
		} catch (error) {
			console.log('error remove category')
		}
	}

	const updateFavorite = async (id: string, isFavorite: boolean) => {
		if (!isFavorite) {
			await recipesService.updateFavorite(id, false)
		} else await recipesService.updateFavorite(id, true)
	}

	const alertRemoveRecipe = (categoryId: string, id: string) => {
		appEvents.emit('alert', {
			onPress: async () => removeRecipe(categoryId, id),
			btnText: 'Ok',
			icon: 'trash',
			buttonType: 'primary',
			message: 'Are you sure delete recipe?',
			onPressCancelBtn: () => {},
		})
	}

	const editRecipe = (id: string) => {
		gcService.set('recipeId', id)
		nav.navigate(UserRouteKey.EditorRecipe, { id })
	}
	if (isLoading) return <Loader />
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
			<SearchFormControll
				value={searchString}
				onChange={setSearchString}
				placeholder="Search ..."
				horrizontalPadding={16}
				mb={20}
			/>

			<RecilesList
				updateFavorite={updateFavorite}
				swipeRef={swipeRef}
				list={memoFilteringRecipe}
				openEditor={_.noop}
				goDetailRecipe={editRecipe}
				removeRecipe={alertRemoveRecipe}
			/>
		</ScreenLayout>
	)
}
