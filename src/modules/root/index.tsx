import React, { useMemo } from 'react'

import { AuthNavigationGroup, UserNavigationGroup } from './navigation-group'
import { AlertWidget } from '~modules/common'
import { NavGroupKey } from './typing'
import { RootLoadingScreen } from './screens'
import { useSelector } from 'react-redux'
import { selectNavGroup } from '~modules/store/navigation/selector'

const modules = {
	[NavGroupKey.Auth]: <AuthNavigationGroup />,
	[NavGroupKey.User]: <UserNavigationGroup />,
	[NavGroupKey.Loading]: <RootLoadingScreen />,
}

export const Navigation = () => {
	const activeModule = useSelector(selectNavGroup)
	const navigation = useMemo(() => modules[activeModule], [activeModule])
	return (
		<>
			{navigation}
			<AlertWidget />
		</>
	)
}
