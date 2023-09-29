import React from 'react'
import { colors, ScreenLayout, Txt } from '~modules/common'

export const ComingSoonScreen = () => {
	return (
		<ScreenLayout
			viewStyle={{ alignItems: 'center', justifyContent: 'center' }}>
			<Txt mod="xl" color={colors.primary}>
				Coming Soon
			</Txt>
		</ScreenLayout>
	)
}
