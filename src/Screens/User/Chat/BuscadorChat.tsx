import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import {ArrowLeft, Close, Lupa} from '../../../Assets/svg'; // Asegúrate de importar estos íconos correctamente
import colors from '../../../Utils/colors';
import {useNavigation} from '@react-navigation/native';
import {ThemeContext} from '../../../Components/themeContext';

type LocationType = {
  photos: any;
  formatted_address: any;
  rating: any;
  longitude: number;
  latitude: number;
  geometry: {
    location: {
      lat: never;
      lng: never;
      latitude: number;
      longitude: number;
    };
  };
  name: string;
};

const BuscadorRS = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [locations, setLocations] = useState<Array<LocationType>>([]);
  const [filteredLocations, setFilteredLocations] = useState<
    Array<LocationType>
  >([]);
  const [userLocation, setUserLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({latitude: null, longitude: null});
  const {theme} = useContext(ThemeContext);

  useEffect(() => {
    const filtered = locations.filter(
      location =>
        location?.user?.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredLocations(filtered);
  }, [searchText, locations]);

  const handleClearSearch = () => {
    setSearchText('');
  };

  // Datos ficticios de los chats
  const chats = [
    {
      id: '1',
      imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
      name: 'Jane Doe',
      lastMessage: 'Hola, ¿cómo estás?',
      lastMessageTime: '10:30 AM',
      unreadMessages: 2,
    },
    {
      id: '2',
      imageUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
      name: 'Jane Doe 2',
      lastMessage: '¡Hola! Todo bien, gracias.',
      lastMessageTime: 'Yesterday',
      unreadMessages: 0,
    },
    {
      id: '3',
      imageUrl: 'https://randomuser.me/api/portraits/women/7.jpg',
      name: 'Jane Doe 3',
      lastMessage: 'Hola, ¿cómo estás?',
      lastMessageTime: '10:30 AM',
      unreadMessages: 2,
    },
    {
      id: '4',
      imageUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
      name: 'Jane Doe 4',
      lastMessage: '¡Hola!',
      lastMessageTime: 'Yesterday',
      unreadMessages: 0,
    },
    {
      id: '5',
      imageUrl: 'https://randomuser.me/api/portraits/women/15.jpg',
      name: 'Jane Doe 5',
      lastMessage: '¿Qué tal?',
      lastMessageTime: '10:45 AM',
      unreadMessages: 1,
    },
    {
      id: '6',
      imageUrl: 'https://randomuser.me/api/portraits/women/18.jpg',
      name: 'Jane Doe 6',
      lastMessage: 'Nos vemos luego.',
      lastMessageTime: 'Monday',
      unreadMessages: 0,
    },
    {
      id: '7',
      imageUrl: 'https://randomuser.me/api/portraits/women/20.jpg',
      name: 'Jane Doe 7',
      lastMessage: '¡Feliz cumpleaños!',
      lastMessageTime: 'Tuesday',
      unreadMessages: 3,
    },
    {
      id: '8',
      imageUrl: 'https://randomuser.me/api/portraits/women/21.jpg',
      name: 'Jane Doe 8',
      lastMessage: '¿Dónde estás?',
      lastMessageTime: '2:00 PM',
      unreadMessages: 0,
    },
    {
      id: '9',
      imageUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
      name: 'Jane Doe 9',
      lastMessage: 'Estoy en camino.',
      lastMessageTime: '3:30 PM',
      unreadMessages: 1,
    },
    {
      id: '10',
      imageUrl: 'https://randomuser.me/api/portraits/women/23.jpg',
      name: 'Jane Doe 10',
      lastMessage: 'Llámame cuando puedas.',
      lastMessageTime: '4:00 PM',
      unreadMessages: 2,
    },
    {
      id: '11',
      imageUrl: 'https://randomuser.me/api/portraits/women/24.jpg',
      name: 'Jane Doe 11',
      lastMessage: '¿Qué opinas?',
      lastMessageTime: '5:00 PM',
      unreadMessages: 0,
    },
    {
      id: '12',
      imageUrl: 'https://randomuser.me/api/portraits/women/25.jpg',
      name: 'Jane Doe 12',
      lastMessage: '¡Claro!',
      lastMessageTime: '5:30 PM',
      unreadMessages: 1,
    },
    {
      id: '13',
      imageUrl: 'https://randomuser.me/api/portraits/women/26.jpg',
      name: 'Jane Doe 13',
      lastMessage: 'Vamos a la playa.',
      lastMessageTime: '6:00 PM',
      unreadMessages: 0,
    },
    {
      id: '14',
      imageUrl: 'https://randomuser.me/api/portraits/women/27.jpg',
      name: 'Jane Doe 14',
      lastMessage: 'No puedo ahora.',
      lastMessageTime: '7:00 PM',
      unreadMessages: 2,
    },
    {
      id: '15',
      imageUrl: 'https://randomuser.me/api/portraits/women/28.jpg',
      name: 'Jane Doe 15',
      lastMessage: '¡Te extraño!',
      lastMessageTime: '8:00 PM',
      unreadMessages: 0,
    },
    {
      id: '16',
      imageUrl: 'https://randomuser.me/api/portraits/women/29.jpg',
      name: 'Jane Doe 16',
      lastMessage: 'Hablamos luego.',
      lastMessageTime: '9:00 PM',
      unreadMessages: 1,
    },
    {
      id: '17',
      imageUrl: 'https://randomuser.me/api/portraits/women/30.jpg',
      name: 'Jane Doe 17',
      lastMessage: '¡Nos vemos pronto!',
      lastMessageTime: '10:00 PM',
      unreadMessages: 0,
    },
    {
      id: '18',
      imageUrl: 'https://randomuser.me/api/portraits/women/31.jpg',
      name: 'Jane Doe 18',
      lastMessage: 'Buenas noches.',
      lastMessageTime: '11:00 PM',
      unreadMessages: 2,
    },
    {
      id: '19',
      imageUrl: 'https://randomuser.me/api/portraits/women/32.jpg',
      name: 'Jane Doe 19',
      lastMessage: 'Hasta mañana.',
      lastMessageTime: '11:30 PM',
      unreadMessages: 0,
    },
    {
      id: '20',
      imageUrl: 'https://randomuser.me/api/portraits/women/33.jpg',
      name: 'Jane Doe 20',
      lastMessage: 'Cuidate.',
      lastMessageTime: '12:00 AM',
      unreadMessages: 1,
    },
  ];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <SafeAreaView />
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'center',
            padding: 16,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft color={theme.text} />
          </TouchableOpacity>
          <View style={styles.container2}>
            <TextInput
              style={[styles.input, {color: theme.text}]}
              placeholder="Search..."
              placeholderTextColor="#A8A8A8"
              value={searchText}
              onChangeText={setSearchText}
            />
            {searchText.length === 0 && (
              <TouchableOpacity style={styles.iconContainer2}>
                <Lupa />
              </TouchableOpacity>
            )}
            {searchText.length > 0 && (
              <TouchableOpacity
                onPress={handleClearSearch}
                style={styles.iconContainer2}>
                <Close />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {searchText.length > 0 && (
          <ScrollView style={{marginTop: 10}}>
            {filteredChats.map(chat => (
              <View key={chat.id}>
                <View style={styles.chatContainer}>
                  <Image
                    source={{uri: chat.imageUrl}}
                    style={styles.profileImage}
                  />
                  <View style={styles.chatContent}>
                    <Text
                      style={[styles.name, {color: colors.neutral.darkest}]}>
                      {chat.name}
                    </Text>
                    <Text
                      style={[
                        styles.message,
                        {fontWeight: chat.unreadMessages > 0 ? '700' : '400'},
                      ]}>
                      {chat.lastMessage}
                    </Text>
                  </View>
                  <View style={styles.metaData}>
                    <Text style={styles.time}>{chat.lastMessageTime}</Text>
                    {chat.unreadMessages > 0 && (
                      <View style={styles.unreadContainer}>
                        <Text style={styles.unreadCount}>
                          {chat.unreadMessages}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.divider} />
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.neutral.white,
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 12,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    height: 80,
  },
  iconContainer: {
    marginRight: 'auto',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.primary.blueDark,
    flex: 10,
  },
  divider: {
    borderBottomColor: '#E5E6E8',
    borderBottomWidth: 1,
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 24,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    width: '90%',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: '600',
    // color: colors.neutral.darkest
  },
  iconContainer2: {
    padding: 10,
  },
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  chatContent: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    color: '#666',
  },
  metaData: {
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 12,
    color: '#999',
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
});

export default BuscadorRS;
