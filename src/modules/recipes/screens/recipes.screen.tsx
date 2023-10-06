import { useRoute } from '@react-navigation/native'
import React from 'react'
import {
	colors,
	PrimaryHeader,
	ScreenLayout,
	Txt,
	useNav,
} from '~modules/common'

export const RecipesScreen = () => {
	const { params }: any = useRoute()
	const nav = useNav()
	return (
		<ScreenLayout
			headerComponent={
				<PrimaryHeader
					label="Recipes"
					leftIcon="left-open-big"
					colorLeftIcon={colors.secondaryTxt}
					onPressLeftIcon={() => nav.goBack()}
				/>
			}>
			<Txt>Recipes list {params.categoryId}</Txt>
		</ScreenLayout>
	)
}
