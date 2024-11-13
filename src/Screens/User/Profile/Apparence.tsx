import React, { useContext, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ArrowLeft, Engranaje, PencilProf } from '../../../Assets/svg';
import { useNavigation } from '@react-navigation/native';
import HeaderUser from '../../../Components/HeaderUser';
import fonts from '../../../Utils/fonts';
import RadioButton from '../../../Components/RadioButton';
import { ThemeContext } from '../../../Components/themeContext';
import colors from '../../../Utils/colors';

export default function Apparence() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [selectedOption, setSelectedOption] = useState<string | null>('3');

  const handleSelectOption = (id: string) => {
    if (id === selectedOption) {
      return; // No hace nada si la opción ya está seleccionada
    }
    setSelectedOption(id);
    if (id === '1') {
      toggleTheme('light');
    } else if (id === '2') {
      toggleTheme('dark');
    } else {
      toggleTheme('ligth');
    }
  };

  const chats = [
    {
      id: '1',
      imageUrl: <PencilProf />,
      name: 'Light mode',
      lastMessage: 'Theme will always be in light mode',
      lastMessageTime: '10:30 AM',
      unreadMessages: 2,
      verify: true,
    },
    {
      id: '2',
      imageUrl: <Engranaje />,
      name: 'Dark mode',
      lastMessage: 'Theme will always be in dark mode',
      lastMessageTime: 'Yesterday',
      unreadMessages: 0,
      verify: false,
    },
    {
      id: '3',
      imageUrl: <Engranaje />,
      name: 'Automatic',
      lastMessage: 'Theme will follow the operating system theme',
      lastMessageTime: '10:30 AM',
      unreadMessages: 2,
      verify: false,
    },
  ];

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}> 
      <SafeAreaView />
      <HeaderUser text='Apparence' svg={<ArrowLeft color={theme.text}/>} onPress={() => navigation.goBack()} />

      <ScrollView style={{ paddingHorizontal: 24, paddingTop: 20 }}>
        <View style={styles.divider} />
        {chats.map((chat, index) => (
          <View key={chat.id}>
            <View style={styles.chatContainer}>
              <View style={[styles.chatContent, { marginTop: 4 }]}>
                <Text style={[styles.name, fonts.H5, { color: theme.text }]}>{chat.name}</Text>
                <Text style={[styles.name, fonts.B5, { color: theme.text }]}>{chat.lastMessage}</Text>
              </View>
              <RadioButton
                key={chat.id}
                selected={selectedOption === chat.id}
                onPress={() => handleSelectOption(chat.id)}
                label=""
              />
            </View>
            {index < chats.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
        <View style={styles.divider} />
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
    backgroundColor: '#ccc',
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
});
