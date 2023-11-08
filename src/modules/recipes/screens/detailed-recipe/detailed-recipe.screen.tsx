import { useRoute } from '@react-navigation/native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
	$size,
	colors,
	Loader,
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
import Share from 'react-native-share'
import ViewShot from 'react-native-view-shot'

export const DetailedRecipeScreen = () => {
	const nav = useNav()
	const { params }: any = useRoute()
	const [recipe, setRecipe] = useState<IRecipe>(null)
	const [isLoading, setIsLoading] = useState(false)
	const viewShootRef = useRef(null)

	const loadRecipe = async (id: string) => {
		setIsLoading(true)
		try {
			const resp: any = await recipesService.getDetailedRecipe(id)
			setRecipe(resp)
		} catch (error) {
			console.log('error', error)
		} finally {
			setIsLoading(false)
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

	const share = () => {
		if (!viewShootRef) return
		viewShootRef?.current?.capture().then((uri: string) => {
			Share.open({
				url: uri.includes('file') ? uri : `file://${uri}`,
				filename: recipe.name,
				message: 'Share from My kitchen application',
			})
		})
	}

	if (isLoading) {
		return <Loader />
	}

	return (
		<ScreenLayout
			horizontalPadding={0}
			needScroll={true}
			headerComponent={
				<DetailedHeader
					nameRecipe={'Detailed recipe'}
					isFavorite={false}
					shareRecipe={share}
					changeRating={() => {}}
				/>
			}>
			<ViewShot
				ref={viewShootRef}
				options={{
					fileName: 'My kitchen',
					format: 'jpg',
					quality: 0.9,
				}}>
				<View style={styles.shareContainer}>
					<Txt mod="xl" style={styles.title}>
						{recipe?.name}
					</Txt>

					<View style={{ marginBottom: 30 }}>
						<Txt
							mod="lg"
							style={{ fontWeight: '500', marginBottom: 20 }}>
							Ingradients
						</Txt>

						<View>{inradients}</View>
					</View>

					<View>
						<Txt
							mod="lg"
							style={{ fontWeight: '500', marginBottom: 20 }}>
							Description
						</Txt>
						<Txt mod="md">{recipe?.description}</Txt>
					</View>
				</View>
			</ViewShot>
		</ScreenLayout>
	)
}

const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
		fontWeight: '700',
		color: colors.primary,
		opacity: 0.8,
		marginBottom: 20,
	},
	shareContainer: {
		backgroundColor: colors.bgLayout,
		padding: $size(16),
		borderRadius: 10,
	},
})
