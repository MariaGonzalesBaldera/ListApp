import React, {useContext, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute, NavigationContainer, useNavigation} from '@react-navigation/native';
import {Text, View} from 'react-native';
import {
  ArrowLeft,
  ChatOn,
  Chatoff,
  Eventsoff,
  Eventson,
  Irloff,
  Irlon,
  Meetoff,
  Meeton,
  Profileoff,
  Profileon,
} from '../Assets/svg/index';
import colors from '../Utils/colors';

import IrlStack from './IrlStack';
import MeetStack from './MeetStack';
import EventsStack from './EventsStack';
import ChatStack from './ChatStack';
import ProfileStack from './ProfileStack';
import LoginStack from './LoginStack';
import {useAuth} from '../Context/AuthContext';
import {ThemeContext} from '../Components/themeContext';

import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const {theme} = useContext(ThemeContext);


  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.background,
        },
        tabBarActiveBackgroundColor: theme.background,
        tabBarInactiveBackgroundColor: theme.background,
      }}>
      <Tab.Screen
        name="IrlStack"
        component={IrlStack}
        options={({route}) => ({
          tabBarIcon: ({focused, color, size}) => (
            <View style={{alignItems: 'center'}}>
              {focused ? (
                <Irlon width={size} height={size} color={color} />
              ) : (
                <Irloff width={size} height={size} color={color} />
              )}
              <Text
                style={{
                  color: focused ? colors.primary.medium : colors.neutral.dark,
                  fontSize: 11,
                }}>
                IRL
              </Text>
            </View>
          ),
          tabBarStyle: getTabBarVisibility(route),
        })}
      />
      <Tab.Screen
        name="MeetStack"
        component={MeetStack}
        options={({route}) => ({
          tabBarIcon: ({focused, color, size}) => (
            <View style={{alignItems: 'center'}}>
              {focused ? (
                <Meeton width={size} height={size} color={color} />
              ) : (
                <Meetoff
                  width={size}
                  height={size}
                  color={colors.neutral.dark}
                />
              )}
              <Text
                style={{
                  color: focused ? colors.primary.medium : colors.neutral.dark,
                  fontSize: 11,
                }}>
                Meet
              </Text>
            </View>
          ),
          tabBarStyle: getTabBarVisibility(route),
        })}
      />
      <Tab.Screen
        name="EventsStack"
        component={EventsStack}
        options={({route}) => ({
          tabBarIcon: ({focused, color, size}) => (
            <View style={{alignItems: 'center'}}>
              {focused ? (
                <Eventson width={size} height={size} color={color} />
              ) : (
                <Eventsoff
                  width={size}
                  height={size}
                  color={colors.neutral.dark}
                />
              )}
              <Text
                style={{
                  color: focused ? colors.primary.medium : colors.neutral.dark,
                  fontSize: 11,
                }}>
                Events
              </Text>
            </View>
          ),
          tabBarStyle: getTabBarVisibility(route),
        })}
      />
      <Tab.Screen
        name="ChatStack"
        component={ChatStack}
        options={({route}) => ({
          tabBarIcon: ({focused, color, size}) => (
            <View style={{alignItems: 'center'}}>
              {focused ? (
                <ChatOn width={size} height={size} color={color} />
              ) : (
                <Chatoff
                  width={size}
                  height={size}
                  color={colors.neutral.dark}
                />
              )}
              <Text
                style={{
                  color: focused ? colors.primary.medium : colors.neutral.dark,
                  fontSize: 11,
                }}>
                Chat
              </Text>
            </View>
          ),
          tabBarStyle: getTabBarVisibility(route),
        })}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={({route}) => ({
          tabBarIcon: ({focused, color, size}) => (
            <View style={{alignItems: 'center'}}>
              {focused ? (
                <Profileon width={size} height={size} color={color} />
              ) : (
                <Profileoff
                  width={size}
                  height={size}
                  color={colors.neutral.dark}
                />
              )}
              <Text
                style={{
                  color: focused ? colors.primary.medium : colors.neutral.dark,
                  fontSize: 11,
                }}>
                Profile
              </Text>
            </View>
          ),
          tabBarStyle: getTabBarVisibility(route),
        })}
      />
    </Tab.Navigator>
  );
};

const getTabBarVisibility = (route: any) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? '';

  const hiddenRoutes = [
    'editprofile',
    'accountsettings',
    'apparence',
    'security',
    'faq',
    'legal',
    'blocked',
    'blockedby',
    'emailch',
    'passwordch',
    'notifications',
    'delete',
    'editinfo',
    'editinterest',
    'edittype',
    'editphotos',
    'editfilter',
    'editprompts',
    'editorder',
    'subscriptions',
    'subsdel',
    'subsch',
    'type',
    'typecode',
    'cardtype',
    'contact',
    'changesubs',
    'upgradex',
    'dailylist',
    'match',
    'myevents',
    'detailevent',
    'mytickets',
    'filter',
    'assistants',
    'messaging',
    'detailmsg',
    'EditPhoto',
    'rematch',
    'filtersirl',
  ];

  if (hiddenRoutes.includes(routeName)) {
    return {display: 'none'};
  }

  return {display: 'flex'};
};

const Navigation = () => {
  const { auth, login } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        login(); // Llama a la función login si hay un token
      } else {
        navigation.navigate('Login'); // Cambia esto según el nombre de tu stack de login
      }
    };

    checkToken(); // Verifica el token al cargar el componente
  }, [login, navigation]);

  return auth ? <TabNavigator /> : <LoginStack />;
};

export default Navigation;
