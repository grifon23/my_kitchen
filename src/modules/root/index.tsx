import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AuthNavigationGroup} from './navigation-group';
import { AlertWidget } from '~modules/common'

export const Navigation = () => {
	return (
		<>
			<NavigationContainer>
				<AuthNavigationGroup />
			</NavigationContainer>
			<AlertWidget />
		</>
	)
}
