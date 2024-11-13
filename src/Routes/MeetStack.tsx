import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import MeetIndex from '../Screens/User/Meet/MeetIndex';
import Swipe from '../Screens/User/Meet/Swipe'
import Dailylist from './../Screens/User/Meet/DailyList';
import Match from './../Screens/User/Meet/Match';
import Rematch from '../Screens/User/Meet/Rematch';



 export default function MeetStack() {
  return (
    <Stack.Navigator initialRouteName='swipe'>
      <Stack.Screen name="meetindex" component={MeetIndex} options={{ headerShown: false}}/>
      <Stack.Screen name="swipe" component={Swipe} options={{ headerShown: false}}/>
      <Stack.Screen name="dailylist" component={Dailylist} options={{ headerShown: false, tabBarVisible: false}}/>
      <Stack.Screen name="match" component={Match} options={{ headerShown: false , tabBarVisible: false}}/>
      <Stack.Screen name="rematch" component={Rematch} options={{ headerShown: false , tabBarVisible: false}}/>


    </Stack.Navigator>
  );
}