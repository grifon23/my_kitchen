import React from 'react'
import { PrimaryHeader, ScreenLayout, Txt } from '~modules/common'

export const DashboardRecipesScreen = () => {
	return (
		<ScreenLayout
			headerComponent={<PrimaryHeader label="Dashboard recipes" />}>
			<Txt>list public recipes</Txt>
		</ScreenLayout>
	)
}
