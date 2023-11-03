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
			needScroll={true}
			headerComponent={
				<DetailedHeader
					nameRecipe={recipe?.name}
					isFavorite={false}
					shareRecipe={() => {}}
					changeRating={() => {}}
				/>
			}>
			<View style={{ marginBottom: 30 }}>
				<Txt mod="lg" style={{ fontWeight: '500', marginBottom: 20 }}>
					Ingradients
				</Txt>
				<View>{inradients}</View>
			</View>

			<View>
				<Txt mod="lg" style={{ fontWeight: '500', marginBottom: 20 }}>
					Description
				</Txt>
				<Txt mod="md">{recipe?.description}</Txt>
			</View>
		</ScreenLayout>
	)
}

const styles = StyleSheet.create({})
