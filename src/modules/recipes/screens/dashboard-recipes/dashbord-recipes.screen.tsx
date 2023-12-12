import React, { useEffect, useState } from 'react'
import {
	Loader,
	PrimaryHeader,
	ScreenLayout,
	Txt,
	useNav,
} from '~modules/common'
import { DashboardRecipeList } from '~modules/recipes/components'
import { recipesService } from '~modules/recipes/service'
import { IDashboardRecipeItem, IRecipe } from '~modules/recipes/typing'
import { UserRouteKey } from '~modules/root/typing'

export const DashboardRecipesScreen = () => {
	const nav = useNav()
	const [isLoading, setIsLoading] = useState(false)
	const [recipes, setRecipes] = useState<IDashboardRecipeItem[]>([])

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

	const goDetailedRecipe = (id: string) => {
		nav.navigate(UserRouteKey.DashboardDetailed, { id })
	}
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
				goDetailed={goDetailedRecipe}
				recipes={recipes}
			/>
		</ScreenLayout>
	)
}
