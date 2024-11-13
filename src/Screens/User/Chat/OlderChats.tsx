import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import OlderHeader from '../../../Components/ChatComponents/Headers/OlderHeader';
import colors from '../../../Utils/colors';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ThemeContext} from '../../../Components/themeContext';
import { GetChats } from '../../../Services/Messaging/MessagingServices';
import fonts from '../../../Utils/fonts';

export default function OlderChats() {
  const [Chats, setChats] = useState([])

  const fetchChats = async () => {
    try {
      const data = await GetChats();
      console.log('CHATSSSS', data.data);
      if (data.status === true) {
        setChats(data.data);
      }
      
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchChats();

  }, []);
  useFocusEffect(
    useCallback(() => {
      
      fetchChats();
    }, [])
  );


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

  const handleMessagingMatches = (id) => {
    navigation.navigate('messaging', { id });
    console.log("ID "+ id);
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <SafeAreaView />
      <OlderHeader
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
        {Chats.length > 0 ? (
              Chats.map((chat, index) => (
                <>
                  <TouchableOpacity
                    key={chat?.chat_with.user?.id}
                    onPress={() => handleMessagingMatches(chat?.chat_with.user?.id)}>
                    <View style={styles.chatContainer}>
                      <Image
                        source={{uri: chat?.chat_with.user?.profile_image}}
                        style={styles.profileImage}
                      />
                       <View style={styles.chatContent}>
                        <Text style={[styles.name, {color: theme.text, justifyContent:'center', alignContent: 'center', alignItems:'center'}]}>
                          {chat?.chat_with.user?.name} {' '}
                          {chat.chat_with?.is_new_match === true ? (
                            <View style={[styles.newBadge2,{
                              backgroundColor: isDarkMode
                                ? colors.secondary.darkest
                                : colors.secondary.lighest,
                            
                            }]}>
                              <Text
                                style={[
                                  styles.newBadgeText,
                                  {
                                    color: isDarkMode
                                      ? colors.secondary.light
                                      : colors.secondary.dark,
                                     
                                  },
                                ]}>
                                New Match
                              </Text>
                            </View>
                          ) : null}
                        </Text>
                        <Text
                          style={
                            {
                              color:theme.tertiary,
                              fontWeight:
                                chat.last_message.is_read === false ? '700' : '400',
                            }
                        }>
                          {chat?.last_message?.you === true ? 'You:' : ''} {chat?.last_message?.message}
                        </Text>
                      </View>
                      <View style={styles.metaData}>
                        <Text
                          style={[
                            styles.time,
                            {
                              fontWeight:
                              chat.last_message.is_read === false ? '700' : '400',
                            },
                          ]}>
                          {new Date(chat.last_message.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                        </Text>
                        {chat.last_message.is_read === false && (
                          <View style={[styles.unreadContainer,{backgroundColor:isDarkMode?colors.secondary.dark:colors.secondary.light}]}>
                            <Text style={[styles.unreadCount,{color:theme.text}]}>
                              1
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                    {index < chats.length - 1 && (
                      <View style={[styles.divider,{backgroundColor: isDarkMode ? '#2F2F2F' : '#E6E6E6'}]} />
                    )}
                  </TouchableOpacity>
                </>
              ))
            ) : (
              <View style={styles.noChatsContainer}>
                <Text style={[styles.noChatsText, fonts.H1,{color:theme.text}]}>
                  You don't have any chat
                </Text>
              </View>
            )}
        
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  roundedImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 10,
  },

  chatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  chatContent: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {
    // color: 'red',
  },
  metaData: {
    alignItems: 'flex-end',
  },
  time: {
    color: 'gray',
  },
  unreadContainer: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 10,
    minWidth: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  unreadCount: {
    fontSize: 10,
    fontWeight: 'bold'
  },
  divider: {
    height: 1,
    marginVertical: 2,
  },
  newBadge: {
    position: 'absolute',
    top: 70,
    left: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    zIndex: 3,
  },
  newBadge2: {
    paddingHorizontal: 9,
    borderRadius: 20,
    zIndex: 3,
  },
  newBadgeText: {
    fontSize: 8,
    fontWeight: '700',
  },
  noChatsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40%',
  },
  noChatsText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

