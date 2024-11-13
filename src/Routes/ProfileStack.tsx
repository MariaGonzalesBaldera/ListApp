import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import MeetIndex from '../Screens/User/Meet/MeetIndex';
import Swipe from '../Screens/User/Meet/Swipe'
import Dailylist from './../Screens/User/Meet/DailyList';
import Match from './../Screens/User/Meet/Match';

import Profile from '../Screens/User/Profile/Profile';
import EditProfile from '../Screens/User/Profile/EditProfile';
import AccountSettings from '../Screens/User/Profile/AccountSettings';
import Apparence from '../Screens/User/Profile/Apparence';
import Security from '../Screens/User/Profile/Security';

//Security 
import FAQ from '../Screens/User/Profile/Security/FAQ';
import Legal from '../Screens/User/Profile/Security/Legal';

//Settings
import Blocked from '../Screens/User/Profile/Settings/Blocked';
import BlockedBy from '../Screens/User/Profile/Settings/BlockedBy';

import EmailChange from '../Screens/User/Profile/Settings/Emailchange';
import PasswordChange from '../Screens/User/Profile/Settings/PasswordChange';
import NotificationsSettings from '../Screens/User/Profile/Settings/NotificationSettings';

import DeleteAccount from '../Screens/User/Profile/Settings/DeleteAccount';


import EditInfo from '../Screens/User/Profile/Edit/EditInfo';
import EditInterest from '../Screens/User/Profile/Edit/EditInterest';
import EditTyperela from '../Screens/User/Profile/Edit/EditTyperela';
import EditPhotos from '../Screens/User/Profile/Edit/Editphotos';
import EditFilter from '../Screens/User/Profile/Edit/EditFilter';
import Editprompts from '../Screens/User/Profile/Edit/Editprompts'
import EditOrder from '../Screens/User/Profile/Edit/EditOrder';

import Subscriptions from '../Screens/User/Profile/Settings/Subscriptions'
import Subsdel from '../Screens/User/Profile/Settings/SubsDelete'
import SubsChange from '../Screens/User/Profile/Settings/SubsChange'
import TypeMethod from '../Screens/User/Profile/Settings/Typemethod';
import CodeType from '../Screens/User/Profile/Settings/CodeType';
import CardType from '../Screens/User/Profile/Settings/CardType';
import Contact from '../Screens/User/Profile/Settings/contact';
import ChangeSubs from '../Screens/User/Profile/ChangeSubs';
import Upgrade from '../Screens/User/Profile/Upgrade';

import EditPhoto from '../Screens/User/Profile/EditPhoto'
import Preview from '../Screens/User/Profile/Preview';
import Selection from '../Screens/NoUser/Data'






 export default function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName='profile'>
      <Stack.Screen name="profile" component={Profile} options={{ headerShown: false}}/>
       <Stack.Screen name="editprofile" component={EditProfile} options={{ headerShown: false, tabBarVisible: false}}/>
       <Stack.Screen name="accountsettings" component={AccountSettings} options={{ headerShown: false, tabBarVisible: false}}/>
       <Stack.Screen name="apparence" component={Apparence} options={{ headerShown: false, tabBarVisible: false}}/>
       <Stack.Screen name="security" component={Security} options={{ headerShown: false, tabBarVisible: false}}/>

       <Stack.Screen name="faq" component={FAQ} options={{ headerShown: false, tabBarVisible: false}}/>
       <Stack.Screen name="legal" component={Legal} options={{ headerShown: false, tabBarVisible: false}}/>

       <Stack.Screen name="blocked" component={Blocked} options={{ headerShown: false, tabBarVisible: false}}/>
       <Stack.Screen name="blockedby" component={BlockedBy} options={{ headerShown: false, tabBarVisible: false}}/>

       <Stack.Screen name="emailch" component={EmailChange} options={{ headerShown: false, tabBarVisible: false}}/>
       <Stack.Screen name="passwordch" component={PasswordChange} options={{ headerShown: false, tabBarVisible: false}}/>
       <Stack.Screen name="notifications" component={NotificationsSettings} options={{ headerShown: false, tabBarVisible: false}}/>
       <Stack.Screen name="delete" component={DeleteAccount} options={{ headerShown: false, tabBarVisible: false}}/>

       <Stack.Screen name="editinfo" component={EditInfo} options={{ headerShown: false, tabBarVisible: false}}/>
       <Stack.Screen name="editinterest" component={EditInterest} options={{ headerShown: false, tabBarVisible: false}}/>
       <Stack.Screen name="edittype" component={EditTyperela} options={{ headerShown: false, tabBarVisible: false}}/>
       <Stack.Screen name="editphotos" component={EditPhotos} options={{ headerShown: false, tabBarVisible: false}}/>
       <Stack.Screen name="editfilter" component={EditFilter} options={{ headerShown: false, tabBarVisible: false}}/>
       <Stack.Screen name="editprompts" component={Editprompts} options={{ headerShown: false, tabBarVisible: false}}/>
       <Stack.Screen name="editorder" component={EditOrder} options={{ headerShown: false, tabBarVisible: false}}/>

       <Stack.Screen name="subscriptions" component={Subscriptions} options={{ headerShown: false, tabBarVisible: false}}/>
       <Stack.Screen name="subsdel" component={Subsdel} options={{ headerShown: false, tabBarVisible: false}}/>
       <Stack.Screen name="subsch" component={SubsChange} options={{ headerShown: false, tabBarVisible: false}}/>

       <Stack.Screen name="type" component={TypeMethod} options={{ headerShown: false, tabBarVisible: false}}/>
       <Stack.Screen name="typecode" component={CodeType} options={{ headerShown: false, tabBarVisible: false}}/>
       <Stack.Screen name="cardtype" component={CardType} options={{ headerShown: false, tabBarVisible: false}}/>
       <Stack.Screen name="contact" component={Contact} options={{ headerShown: false, tabBarVisible: false}}/>

       <Stack.Screen name="changesubs" component={ChangeSubs} options={{ headerShown: false, tabBarVisible: false}}/>
       <Stack.Screen name="upgradex" component={Upgrade} options={{ headerShown: false, tabBarVisible: false}}/>

       <Stack.Screen name="editphoto" component={EditPhoto} options={{ headerShown: false, tabBarVisible: false}}/>

       <Stack.Screen name="preview" component={Preview} options={{ headerShown: false, tabBarVisible: false}}/>
       <Stack.Screen name="selection" component={Selection} options={{ headerShown: false}}/>




    </Stack.Navigator>
  );
}