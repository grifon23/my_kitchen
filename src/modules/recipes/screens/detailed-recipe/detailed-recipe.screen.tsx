import { useRoute } from '@react-navigation/native'
import React, { useEffect, useMemo, useState } from 'react'
import {
	colors,
	PrimaryHeader,
	ScreenLayout,
	Txt,
	useNav,
} from '~modules/common'
import { recipesService } from '~modules/recipes/service'
import { IRecipe } from '~modules/recipes/typing'
import { StyleSheet, View } from 'react-native'
import { PreviewIngradient } from '~modules/ingradients/components'
import { DetailedHeader } from '~modules/recipes/components'

export const DetailedRecipeScreen = () => {
	const nav = useNav()
	const { params }: any = useRoute()
	const [recipe, setRecipe] = useState<IRecipe>(null)

	const loadRecipe = async (id: string) => {
		try {
			const resp: any = await recipesService.getDetailedRecipe(id)
			setRecipe(resp)
		} catch (error) {
			console.log('error', error)
		}
	}

	useEffect(() => {
		if (!params?.id) return
		loadRecipe(params?.id)
	}, [params])

	const inradients = useMemo(() => {
		if (!recipe?.ingradients) return []
		return (
			<>
				{recipe?.ingradients.map(it => {
					return (
						<PreviewIngradient
							name={it.name}
							count={it.count}
							metric={it.metric}
						/>
					)
				})}
			</>
		)
	}, [params, recipe])
	return (
		<ScreenLayout
			headerComponent={
				<DetailedHeader
					isFavorite={false}
					shareRecipe={() => {}}
					updateFavorite={() => {}}
					changeRating={() => {}}
				/>
			}>
			<View>
				<Txt mod="es">Description</Txt>
				<Txt mod="md">{recipe?.description}</Txt>
			</View>
			<View>{inradients}</View>
		</ScreenLayout>
	)
}

const styles = StyleSheet.create({})
