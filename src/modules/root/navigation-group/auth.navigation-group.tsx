import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {SignInScreen} from '../../auth';

const Stack = createStackNavigator();

export const AuthNavigationGroup = () => {
  return (
    <Stack.Navigator
      initialRouteName="auth"
      screenOptions={{headerShown: false}}>
      <Stack.Screen component={SignInScreen} name="auth" />
    </Stack.Navigator>
  );
};
  