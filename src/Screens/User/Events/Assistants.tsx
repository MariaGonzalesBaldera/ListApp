import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import OlderHeader from '../../../Components/ChatComponents/Headers/OlderHeader';
import colors from '../../../Utils/colors';
import {ArrowLeft, BtnSend, Close, Messaging, Wine} from '../../../Assets/svg';
import {useNavigation} from '@react-navigation/native';
import HeaderUser from '../../../Components/HeaderUser';
import fonts from '../../../Utils/fonts';
import {ThemeContext} from '../../../Components/themeContext';
import { GetAssistants, SendInvitation } from '../../../Services/Events/Events';

export default function Assistants({route}: any) {
  const [showEndMessage, setShowEndMessage] = useState(false);
  const [Assistants, setAssistants] = useState([])
  const { event, tickets, optionBefore } = route.params;

  const sendInvitation = async (userId: any) => {
    const data = await SendInvitation(tickets[0].id, userId);
    console.log(data)
  }

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await GetAssistants(event.id);
        console.log('Data Assistants', data)
        setAssistants(data);
      
      } catch (error) {
        console.error('Error fetching Assistants:', error);
      }
    };

    fetchEvents();
  }, []);

  const chats = [
    {
      id: '1',
      imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
      name: 'Jane Doe, 28',
      lastMessage: 'Hola, ¿cómo estás?',
      lastMessageTime: '10:30 AM',
      unreadMessages: 2,
      verify: true,
    },
    {
      id: '2',
      imageUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
      name: 'Jane Doe, 33',
      lastMessage: '¡Hola! Todo bien, gracias.',
      lastMessageTime: 'Yesterday',
      unreadMessages: 0,
      verify: false,
    },
    {
      id: '3',
      imageUrl: 'https://randomuser.me/api/portraits/women/7.jpg',
      name: 'Jane Doe, 40',
      lastMessage: 'Hola, ¿cómo estás?',
      lastMessageTime: '10:30 AM',
      unreadMessages: 2,
      verify: false,
    },
    {
      id: '4',
      imageUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
      name: 'Jane Doe, 21',
      lastMessage: '¡Hola!',
      lastMessageTime: 'Yesterday',
      unreadMessages: 0,
      verify: true,
    },
    {
      id: '5',
      imageUrl: 'https://randomuser.me/api/portraits/women/15.jpg',
      name: 'Jane Doe, 25',
      lastMessage: '¿Qué tal?',
      lastMessageTime: '10:45 AM',
      unreadMessages: 1,
      verify: true,
    },
    {
      id: '6',
      imageUrl: 'https://randomuser.me/api/portraits/women/18.jpg',
      name: 'Jane Doe, 28',
      lastMessage: 'Nos vemos luego.',
      lastMessageTime: 'Monday',
      unreadMessages: 0,
      verify: false,
    },
    {
      id: '7',
      imageUrl: 'https://randomuser.me/api/portraits/women/7.jpg',
      name: 'Jane Doe, 40',
      lastMessage: 'Hola, ¿cómo estás?',
      lastMessageTime: '10:30 AM',
      unreadMessages: 2,
      verify: false,
    },
    {
      id: '8',
      imageUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
      name: 'Jane Doe, 21',
      lastMessage: '¡Hola!',
      lastMessageTime: 'Yesterday',
      unreadMessages: 0,
      verify: true,
    },
    {
      id: '9',
      imageUrl: 'https://randomuser.me/api/portraits/women/15.jpg',
      name: 'Jane Doe, 25',
      lastMessage: '¿Qué tal?',
      lastMessageTime: '10:45 AM',
      unreadMessages: 1,
      verify: true,
    },
    {
      id: '10',
      imageUrl: 'https://randomuser.me/api/portraits/women/18.jpg',
      name: 'Jane Doe, 28',
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
      <HeaderUser
        text={optionBefore === '1'?  "Share with":"Assistants" }
        svg={<ArrowLeft color={theme.text} />}
        onPress={() => navigation.goBack()}
      />
      <Text
        style={[
          styles.unreadCount,
          fonts.B1,
          {
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 20,
            color:theme.text
          },
        ]}>
         {Assistants.length} people
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false} // Oculta el indicador de scroll vertical
        showsHorizontalScrollIndicator={false} // Oculta el indicador de scroll horizontal
        style={{paddingHorizontal: 20, paddingTop: 20}}>
        <View
          style={[
            styles.divider,
            {backgroundColor: isDarkMode ? '#2F2F2F' : '#E6E6E6'},
          ]}
        />
        {Assistants.map((assistant, index) => (
        <View key={`${index}-${assistant.id}`}>  
          <View style={styles.chatContainer}>
            <Image
              source={{ uri: assistant.user.profile_image ? assistant.user.profile_image : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',

               }} 
              style={styles.profileImage}
            />
            <View style={styles.chatContent}>
              <Text
                style={[
                  styles.name,
                  fonts.H5,
                  { color: theme.text },
                ]}>
                {assistant.user.name} 
              </Text>
            </View>
            {
              optionBefore !== '1' && (
                <TouchableOpacity
                style={styles.metaData}
                onPress={() =>
                  navigation.navigate('ChatStack', { screen: 'messaging' })
                }>
                <Wine />
              </TouchableOpacity>      
              )              
            }
            <TouchableOpacity
              style={styles.metaData}
              onPress={ () => {
                if (optionBefore === '1') {
                  sendInvitation(assistant?.user_id)
                  navigation.goBack()
                } else {
                  console.log('starting chatstack')
                  navigation.navigate('ChatStack', { screen: 'messaging' })
                }              
              }

              }>
              {optionBefore === '1' ? <BtnSend /> :  <Messaging /> }
            </TouchableOpacity>
          </View>
          {index < Assistants.length - 1 && (
            <View
              style={[
                styles.divider,
                { backgroundColor: isDarkMode ? '#2F2F2F' : '#E6E6E6' },
              ]}
            />
          )}
        </View>
      ))}
        <View
          style={[
            styles.divider,
            {backgroundColor: isDarkMode ? '#2F2F2F' : '#E6E6E6'},
          ]}
        />
        <View style={{paddingBottom: 40}} />
      </ScrollView>

      {showEndMessage && (
        <>
          <View style={styles.overlay}>
            <View
              style={{height: '8%', backgroundColor: colors.neutral.white}}
            />
            <HeaderUser
              text="Assistants"
              svg={<ArrowLeft />}
              onPress={() => navigation.goBack()}
            />
            <View style={styles.centeredView}>
              <Text
                style={[
                  styles.mainText,
                  fonts.H2,
                  {color: colors.neutral.darkest},
                ]}>
                Unlock the list
              </Text>
              <Text
                style={[
                  styles.subtitle,
                  fonts.B1,
                  {color: colors.neutral.darkest},
                ]}>
                And find out who will attend this event
              </Text>
              <TouchableOpacity
                style={styles.upgradeButton}
                onPress={() => navigation.navigate('UpgradePlan')}>
                <Text
                  style={[
                    styles.upgradeText,
                    fonts.Btn,
                    {color: colors.neutral.darkest},
                  ]}>
                  Upgrade my plan
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  chatContent: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {
    color: 'gray',
  },
  metaData: {
    alignItems: 'flex-end',
  },
  time: {
    color: 'gray',
  },
  unreadContainer: {
    backgroundColor: colors.secondary.light,
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
    fontWeight: 'bold', 
  },
  divider: {
    height: 1,
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

  //

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    shadowColor: colors.neutral.darkest,
  },
  svg: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    color: colors.neutral.darkest,
  },
  container: {
    padding: 16,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',

    padding: 20,
    borderRadius: 20,
  },
  mainText: {
    color: colors.neutral.white,
    marginBottom: 10,
  },
  subtitle: {
    color: colors.neutral.white,
    marginBottom: 20,
    paddingHorizontal: 50,
    textAlign: 'center',
  },
  upgradeButton: {
    backgroundColor: colors.primary.medium,
    paddingVertical: 10,
    paddingHorizontal: 90,
    borderRadius: 20,
  },
  upgradeText: {
    color: colors.neutral.white,
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    height: '100%',
    zIndex: 10,
  },
});
