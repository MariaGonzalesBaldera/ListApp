import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Chatindex from '../Screens/User/Chat/Chatindex';
import OlderChats from '../Screens/User/Chat/OlderChats';
import AllMatches from '../Screens/User/Chat/AllMatches';
import BuscadorRS from '../Screens/User/Chat/BuscadorChat';
import Messaging from '../Screens/User/Chat/Messaging';
import DetailProfilemsg from '../Screens/User/Chat/DetailProfilemsg';
import Experimental from '../Screens/User/Chat/Experimental';


export default function ChatStack() {
  return (
    <Stack.Navigator initialRouteName='chatindex'>
      
      <Stack.Screen name="chatindex" component={Chatindex} options={{ headerShown: false}}/>
      <Stack.Screen name="olderchats" component={OlderChats} options={{ headerShown: false}}/>
      <Stack.Screen name="allmatches" component={AllMatches} options={{ headerShown: false}}/>
      <Stack.Screen name="buscadorrs" component={BuscadorRS} options={{ headerShown: false}}/>
      <Stack.Screen name="messaging" component={Messaging} options={{ headerShown: false, tabBarVisible: false }}/>
      <Stack.Screen name="detailmsg" component={DetailProfilemsg} options={{ headerShown: false, tabBarVisible: false }}/>
      <Stack.Screen name="experimental" component={Experimental} options={{ headerShown: false, tabBarVisible: false }}/>

    </Stack.Navigator>
  );
}
