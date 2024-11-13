import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


import MyEvents from '../Screens/User/Events/MyEvents';
import Detailevent from '../Screens/User/Events/DetailEvent';
import MyTickets from '../Screens/User/Events/MyTickets';
import Events from '../Screens/User/Events/Events'; 
import Filter from '../Screens/User/Events/Filters'
import Assistants from '../Screens/User/Events/Assistants';


export default function EventsStack() {
  return (
    <Stack.Navigator initialRouteName='events'>
      <Stack.Screen name="events" component={Events} options={{ headerShown: false}}/>
      <Stack.Screen name="myevents" component={MyEvents} options={{ headerShown: false, tabBarVisible: false }}/>
      <Stack.Screen name="detailevent" component={Detailevent} options={{ headerShown: false , tabBarVisible: false }}/>
      <Stack.Screen name="mytickets" component={MyTickets} options={{ headerShown: false, tabBarVisible: false }}/>
      <Stack.Screen name="filter" component={Filter} options={{ headerShown: false, tabBarVisible: false }}/>
      <Stack.Screen name="assistants" component={Assistants} options={{ headerShown: false, tabBarVisible: false }}/>
      

    

    </Stack.Navigator>
  );
}
