import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainScreen, DriverScreen} from '@src/screens';
import {get} from 'lodash';

const Stack = createNativeStackNavigator();

const titleHeader = (route: any) => {
  const driverId = get(route, ['params', 'driverId'], '');
  const title = get(route, ['params', 'title'], driverId);
  return title;
};

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        // headerShown: false,
        animation: 'slide_from_right',
        orientation: 'portrait',
      }}>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{title: 'Drivers List'}}
      />
      <Stack.Screen
        name="Driver"
        component={DriverScreen}
        options={({route}) => ({
          title: titleHeader(route),
        })}
      />
    </Stack.Navigator>
  );
};

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};
