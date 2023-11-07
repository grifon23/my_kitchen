import React, { useEffect, useState } from 'react'
import { Loader, PrimaryHeader, ScreenLayout, Txt } from '~modules/common'
import { DashboardRecipeList } from '~modules/recipes/components'
import { recipesService } from '~modules/recipes/service'

export const DashboardRecipesScreen = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [recipes, setRecipes] = useState([])

	const loadRecipes = async () => {
		setIsLoading(true)
		try {
			const resp = await recipesService.loadRecipesDashboard()
			setRecipes(resp)
		} catch (error) {
			console.log('error load recipe wall', error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		loadRecipes()
	}, [])

	if (isLoading) {
		return <Loader />
	}

	return (
		<ScreenLayout
			headerComponent={<PrimaryHeader label="Dashboard recipes" />}
			needScroll={false}>
			<DashboardRecipeList
				reload={loadRecipes}
				isLoading={isLoading}
				goDetailed={() => {}}
				recipes={recipes}
			/>
		</ScreenLayout>
	)
}
