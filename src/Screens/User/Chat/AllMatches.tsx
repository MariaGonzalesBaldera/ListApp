import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AllMatchesHeader from '../../../Components/ChatComponents/Headers/AllMatchesHeader';
import colors from '../../../Utils/colors';
import fonts from '../../../Utils/fonts';
import {useNavigation} from '@react-navigation/native';
import {ThemeContext} from '../../../Components/themeContext';
import { Matches } from '../../../Services/Messaging/MessagingServices';

export default function AllMatches() {

  const [Matchs, setMatchs] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {

      try {
        const data = await Matches(); 
        console.log(data)
        setMatchs(data)

      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []); // El array vacío [] hace que useEffect se ejecute solo una vez cuando el componente se monta.

  
  const chats = [
    {
      id: '1',
      imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
      name: 'Jane Doe',
      lastMessage: 'Hola, ¿cómo estás?',
      lastMessageTime: '10:30 AM',
      unreadMessages: 2,
      verify: true,
    },
    {
      id: '2',
      imageUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
      name: 'Jane Doe 2',
      lastMessage: '¡Hola! Todo bien, gracias.',
      lastMessageTime: 'Yesterday',
      unreadMessages: 0,
      verify: false,
    },
    {
      id: '3',
      imageUrl: 'https://randomuser.me/api/portraits/women/7.jpg',
      name: 'Jane Doe 3',
      lastMessage: 'Hola, ¿cómo estás?',
      lastMessageTime: '10:30 AM',
      unreadMessages: 2,
      verify: false,
    },
    {
      id: '4',
      imageUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
      name: 'Jane Doe 4',
      lastMessage: '¡Hola!',
      lastMessageTime: 'Yesterday',
      unreadMessages: 0,
      verify: true,
    },
    {
      id: '5',
      imageUrl: 'https://randomuser.me/api/portraits/women/15.jpg',
      name: 'Jane Doe 5',
      lastMessage: '¿Qué tal?',
      lastMessageTime: '10:45 AM',
      unreadMessages: 1,
      verify: true,
    },
    {
      id: '6',
      imageUrl: 'https://randomuser.me/api/portraits/women/18.jpg',
      name: 'Jane Doe 6',
      lastMessage: 'Nos vemos luego.',
      lastMessageTime: 'Monday',
      unreadMessages: 0,
      verify: false,
    },
  ];

  const navigation = useNavigation();
  const {theme, isDarkMode} = useContext(ThemeContext);

  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <SafeAreaView />
      <AllMatchesHeader
        onPress={() => navigation.goBack()}
        onPress2={() => navigation.navigate('buscadorrs')}
      />
      <ScrollView style={{paddingHorizontal: 20, paddingTop: 20}}>
        <View
          style={[
            styles.divider,
            {backgroundColor: isDarkMode ? '#2F2F2F' : '#E6E6E6'},
          ]}
        />
        {Matchs.map((chat, index) => (
          <View key={chat.id}>
            <View style={styles.chatContainer}>
              <Image
                  source={{
                    uri: chat.profile_image ? chat.profile_image : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
                  }}
                  style={styles.profileImage}
              />
              <View style={styles.chatContent}>
                <Text style={[styles.name, fonts.B2, {color: theme.text}]}>
                  {chat.name}
                </Text>
                <Text style={[styles.name, {marginLeft: 4, color: theme.text}]}>
                  {chat.is_new_match === true ? (
                    <View
                      style={{
                        backgroundColor: isDarkMode
                          ? colors.secondary.darkest
                          : colors.secondary.lighest,
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        borderRadius: 10,
                        marginTop: 3,
                      }}>
                      <Text
                        style={[
                          {
                            color: isDarkMode
                              ? colors.secondary.light
                              : colors.secondary.dark,
                            fontSize: 8,
                            fontWeight: '700',
                          },
                        ]}>
                        New Match
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                </Text>
              </View>
              <View style={styles.metaData}>
                <Text style={{color: isDarkMode ? '#8F8F8F' : '#A8A8A8'}}>
                  Today
                </Text>
              </View>
            </View>
            { index < chats.length - 1 && (
              <View
                style={[
                  styles.divider,
                  {backgroundColor: isDarkMode ? '#2F2F2F' : '#E6E6E6'},
                ]}
              />
            )}
          </View>
        ))}

        {/* <View
          style={[
            styles.divider,
            {backgroundColor: isDarkMode ? '#2F2F2F' : '#E6E6E6'},
          ]}
        />*/}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  chatContent: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  name: {
    marginBottom: 5,
  },
  message: {
    color: 'gray',
  },
  metaData: {
    alignItems: 'flex-end',
  },
  time: {},
  unreadCount: {
    backgroundColor: colors.secondary.medium,
    color: 'black',
    paddingHorizontal: 5,
    paddingVertical: 2,
    fontSize: 12,
    marginTop: 5,
    borderRadius: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 2,
  },
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});
