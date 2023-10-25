import { useRoute } from '@react-navigation/native'
import React from 'react'
import { PrimaryHeader, ScreenLayout, colors, useNav } from '~modules/common'
import { IngradientsListForm } from '~modules/ingradients/components'

export const IngradientsRecipeScreen = () => {
	const { params }: any = useRoute()
	const nav = useNav()
	return (
		<ScreenLayout
			needScroll={true}
			scrollStyle={{ flexGrow: 1 }}
			headerComponent={
				<PrimaryHeader
					label="Ingradients recipe"
					leftIcon="left-open-big"
					colorLeftIcon={colors.secondaryTxt}
					onPressLeftIcon={() => nav.goBack()}
				/>
			}>
			<IngradientsListForm ingradients={params?.ingradients} />
		</ScreenLayout>
	)
}
