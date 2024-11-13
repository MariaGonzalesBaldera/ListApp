import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import OlderHeader from '../../../Components/ChatComponents/Headers/OlderHeader';
import colors from '../../../Utils/colors';
import {
  ArrowLeft,
  Chavron,
  Legal,
  Faq,
  Contact,
} from '../../../Assets/svg';
import {useNavigation} from '@react-navigation/native';
import HeaderUser from '../../../Components/HeaderUser';
import fonts from '../../../Utils/fonts';
import ButtonComponent from '../../../Components/Button';

import Juan from '../../../Assets/img/juan.png';
import CircularProgress from '../../../Components/CircularProgress';
import {ThemeContext} from '../../../Components/themeContext';

export default function Security() {
  const [showEndMessage, setShowEndMessage] = useState(false);
  const {theme,isDarkMode} = useContext(ThemeContext);

  const user = {
    id: '1',
    imageUrl: Juan,
    name: 'Juan',
    lastMessage: 'Hola, ¿cómo estás?',
    lastMessageTime: '10:30 AM',
    unreadMessages: 2,
    verify: true,
  };

  const chats = [
    {
      id: '1',
      imageUrl: <Faq color={theme.text}/>,
      name: 'FAQ’s / Safety tips',
      goTo: 'faq',
      lastMessageTime: '10:30 AM',
      unreadMessages: 2,
      verify: true,
    },
    {
      id: '2',
      imageUrl: <Contact color={theme.text}/>,
      name: 'Contact us',
      goTo: 'contact',
      lastMessageTime: 'Yesterday',
      unreadMessages: 0,
      verify: false,
    },
    {
      id: '3',
      imageUrl: <Legal color={theme.text}/>,
      name: 'Legal pages',
      goTo: 'legal',
      lastMessageTime: '10:30 AM',
      unreadMessages: 2,
      verify: false,
    },
  ];

  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <SafeAreaView />
      <HeaderUser
        text="Security & privacy"
        svg={<ArrowLeft color={theme.text} />}
        onPress={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false} // Oculta la barra de desplazamiento vertical
        showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento horizontal, si es necesario
        style={{paddingHorizontal: 24, paddingTop: 20}}>
        {chats.map((chat, index) => (
          <View key={chat.id}>
            <TouchableOpacity
              onPress={() => navigation.navigate(chat.goTo)}
              style={styles.chatContainer}>
              <View style={styles.profileImage}>{chat.imageUrl}</View>
              <View style={[styles.chatContent, {marginTop: 4}]}>
                <Text style={[styles.name, fonts.H5, {color: theme.text}]}>
                  {chat.name}
                </Text>
              </View>
              <View style={styles.metaData}>
                <Chavron color={theme.text}/>
              </View>
            </TouchableOpacity>
            {index < chats.length - 1 && <View style={[styles.divider,{backgroundColor: isDarkMode ? '#2F2F2F' : '#E6E6E6'}]} />}
          </View>
        ))}
        <View
          style={[
            styles.divider,
            {backgroundColor: isDarkMode ? '#2F2F2F' : '#E6E6E6'},
          ]}
        />
      </ScrollView>
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
    color: colors.neutral.darkest,
  },
  divider: {
    height: 1,
    marginVertical: 2,
  },
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginVertical: 6,
  },
  ProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  profileImage: {
    borderRadius: 25,
    marginRight: 10,
  },
  profileImage2: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
