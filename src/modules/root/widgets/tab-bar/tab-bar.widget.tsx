import React, { FC } from 'react'
import { TabBarComponent } from '~modules/root/components'
interface IProps {
	state: { index: number; routeNames: string[] }
	navigate: (routeName: string) => void
}
export const TabBarWidget: FC<IProps> = ({ state, navigate }) => {
	const onPressItem = (index: number, routeName: string) => {
		if (state.index !== index) navigate(routeName)
	}
	return (
		<TabBarComponent
			activeIndex={state.index}
			onPressItem={onPressItem}
			items={state.routeNames}
		/>
	)
}
