import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Login from '../Screens/NoUser/Login';
import Welcome from '../Screens/NoUser/Welcome'
import Register from '../Screens/NoUser/Register';
import Create from '../Screens/NoUser/Create'
import Detail from '../Screens/NoUser/Details'
import ListA from '../Screens/NoUser/ListA';
import ProfileCreate from '../Screens/NoUser/ProfileCreate'
import Alist from '../Screens/NoUser/Alist'
import RecoveryPassword from '../Screens/NoUser/RecoveryPassword'
import RecoveryInput from '../Screens/NoUser/recovery/recoveryinput'
//Payment
import TypeMethod from '../Screens/NoUser/payment/Typemethod';
import CodeType from '../Screens/NoUser/payment/CodeType'
import CardType from '../Screens/NoUser/payment/CardType';
import Selection from '../Screens/NoUser/Data'


 export default function LoginStack() {
  return (
    <Stack.Navigator initialRouteName='Welcome'>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false}}/>
      <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false}}/>
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false}}/>
      <Stack.Screen name="Create" component={Create} options={{ headerShown: false}}/>
      <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false}}/>
      <Stack.Screen name="ListA" component={ListA} options={{ headerShown: false}}/>
      <Stack.Screen name="ProfileCreate" component={ProfileCreate} options={{ headerShown: false}}/>
      <Stack.Screen name="Alist" component={Alist} options={{ headerShown: false}}/>
      <Stack.Screen name="recovery" component={RecoveryPassword} options={{ headerShown: false}}/>
      <Stack.Screen name="Recoveryinput" component={RecoveryInput} options={{ headerShown: false}}/>

      <Stack.Screen name="typemethod" component={TypeMethod} options={{ headerShown: false}}/>
      <Stack.Screen name="codetype" component={CodeType} options={{ headerShown: false}}/>
      <Stack.Screen name="cardtype" component={CardType} options={{ headerShown: false}}/>

      <Stack.Screen name="selection" component={Selection} options={{ headerShown: false}}/>



    </Stack.Navigator>
  );
}