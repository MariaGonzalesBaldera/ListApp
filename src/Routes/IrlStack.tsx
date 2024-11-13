import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Dailylist from './../Screens/User/DailyList';
import Match from './../Screens/User/Match';
import IRL from './../Screens/User/IRL/Irl'
import Filters from '../Screens/User/IRL/Filters';



 export default function LoginStack() {
  return (
    <Stack.Navigator initialRouteName='irl'>
      <Stack.Screen name="irl" component={IRL} options={{ headerShown: false }}/>
      <Stack.Screen name="filtersirl" component={Filters} options={{ headerShown: false }}/>


    </Stack.Navigator>
  );
}