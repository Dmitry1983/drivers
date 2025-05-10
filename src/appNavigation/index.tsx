import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as Screens from '@src/screens';
import {get} from 'lodash';

export type RootStackParamList = {
  Main: undefined;
  Driver: {
    driverId: string;
    seasons: string;
  };
  Race: {
    driverId: string;
    title: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type TitleHeader = {
  params: {
    driverId: string;
    title?: string;
  };
};
const titleHeader = (route: TitleHeader) => {
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
        component={Screens.MainScreen}
        options={{title: 'Drivers List'}}
      />
      <Stack.Screen
        name="Driver"
        component={Screens.DriverScreen}
        options={({route}) => ({
          title: titleHeader(route),
        })}
      />
      <Stack.Screen
        name="Race"
        component={Screens.RaceScreen}
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
