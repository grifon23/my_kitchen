import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AuthNavigationGroup} from './navigation-group';

export const Navigation = () => {
  return (
    <NavigationContainer>
      <AuthNavigationGroup />
    </NavigationContainer>
  );
};
