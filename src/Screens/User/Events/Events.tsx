import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Close, Filter, Lupa, Ticket} from '../../../Assets/svg';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import Card from '../../../Components/Events/Cards/CardEvent'; // Import the Card component
import colors from '../../../Utils/colors';
import {GetFilteredEvents} from '../../../Services/Events/Events';
import {ThemeContext} from '../../../Components/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Events() {
  const navigation = useNavigation();

  const [filteredData, setFilteredData] = useState([]); // Estado para los resultados filtrados

  const [searchText, setSearchText] = useState('');

  const [events, setEvents] = useState([]);
  const [list, setList] = useState([]);
  const [local, setLocal] = useState([]);
  const {theme} = useContext(ThemeContext);

  useEffect(() => {
    const fetchEvents = async () => {
      let parsedValues = null;

      try {
        const storedValues = await AsyncStorage.getItem('@eventFilter');
        if (storedValues !== null) {
          parsedValues = JSON.parse(storedValues);
          console.log('Valores recuperados:', parsedValues);
          
        } else {
          console.log('No hay valores guardados');
        }
     
        const data = await GetFilteredEvents(parsedValues); 
        

        if (Array.isArray(data)) {
          setEvents(data);
          setList(data.filter(event => event.is_exclusive === true));
          setLocal(data.filter(event => event.is_exclusive === false));
        } else {
          console.error('Data fetched is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []); // El array vacío [] hace que useEffect se ejecute solo una vez cuando el componente se monta.


  const [selectedMenu, setSelectedMenu] = useState('all');

  useEffect(() => {
    const searchInData = () => {
      let dataToFilter: any[] = [];

      switch (selectedMenu) {
        case 'all':
          dataToFilter = Array.isArray(events) ? events : [];
          break;
        case 'list':
          dataToFilter = Array.isArray(list) ? list : [];
          break;
        case 'local':
          dataToFilter = Array.isArray(local) ? local : [];
          break;
        default:
          dataToFilter = [];
      }

      const filtered = dataToFilter.filter(
        event =>
          event?.title?.toLowerCase().includes(searchText.toLowerCase()) ||
          event?.location?.toLowerCase().includes(searchText.toLowerCase()),
      );

      setFilteredData(filtered);
    };

    searchInData();
  }, [searchText, selectedMenu, events, list, local]);

  const handleClearSearch = () => {
    setSearchText(''); // Limpia el texto de búsqueda
    setFilteredData([]); // Opcional: Si deseas limpiar los resultados filtrados
  };

  const renderContent = () => {
    if (selectedMenu === 'all') {
      return (
        <ScrollView style={{paddingTop: 20, paddingHorizontal: 20}}>
          {filteredData.map(event => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('detailevent', {event, isExclusive: false})
              }>
              <Card
                key={event.id}
                title={event.title}
                date={event.date}
                subtitle={event.is_exclusive}
                location={event.location}
                imageSrc={event.image}
                hour={event.start_time}
                price={event.price}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    }
    if (selectedMenu === 'list') {
      return (
        <ScrollView style={{paddingTop: 20, paddingHorizontal: 20}}>
          {list.map(event => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('detailevent', {event, isExclusive: false})
              }>
              <Card
                key={event.id}
                title={event.title}
                date={event.date}
                subtitle={event.is_exclusive}
                location={event.location}
                imageSrc={event.image}
                hour={event.start_time}
                price={event.price}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    }
    if (selectedMenu === 'local') {
      return (
        <ScrollView style={{paddingTop: 20, paddingHorizontal: 20}}>
          {local.map(event => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('detailevent', {event, isExclusive: false})
              }>
              <Card
                key={event.id}
                title={event.title}
                date={event.date}
                subtitle={event.is_exclusive}
                location={event.location}
                imageSrc={event.image}
                hour={event.start_time}
                price={event.price}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    } else {
      return (
        <Text style={{color: colors.neutral.darkest}}>Past Events Content</Text>
      );
    }
  };

  ///////get values filter/////////
  /////////////////////////////////
  const getCheckboxValues = async () => {
    try {
      const storedValues = await AsyncStorage.getItem('@eventFilter');
      if (storedValues !== null) {
        const parsedValues = JSON.parse(storedValues);
        console.log('Valores recuperados:', parsedValues);
        const events = await GetFilteredEvents(parsedValues);        
        console.log('Eventos filtrados:', events);
        setEvents(events)

      } else {
        console.log('No hay valores guardados');
      }
    } catch (error) {
      console.error('Error al recuperar los valores:', error);
    }
  };
  
  useFocusEffect(
    React.useCallback(() => {
      getCheckboxValues();
    }, []),
  );
  
 
  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <SafeAreaView />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 25,
          paddingVertical: 12,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('myevents')}>
          <Ticket color={theme.tertiary} />
        </TouchableOpacity>
        <View style={[styles.container2, {backgroundColor: theme.placeholder}]}>
          <TextInput
            style={[styles.input,{color:theme.text}]}
            placeholder="Search..."
            placeholderTextColor={'#A8A8A8'}
            value={searchText}
            onChangeText={setSearchText}
          />

          {searchText.length === 0 && (
            <TouchableOpacity style={styles.iconContainer2}>
              <Lupa color={'#A8A8A8'} />
            </TouchableOpacity>
          )}
          {searchText.length > 0 && (
            <TouchableOpacity
              onPress={handleClearSearch}
              style={styles.iconContainer2}>
              <Close color={theme.text}/>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('filter')}>
          <Filter color={theme.text} />
        </TouchableOpacity>
      </View>
      <View
        style={styles.menuContainer} // Aplica el estilo para la vista horizontal
      >
        <TouchableOpacity
          style={[
            styles.menuItem,
            selectedMenu === 'all' && styles.selectedMenuItem,
          ]}
          onPress={() => setSelectedMenu('all')}>
          <Text
            style={[
              styles.menuText,
              {color: theme.text},
              selectedMenu === 'all' && styles.selectedMenuText,
            ]}>
            {'           '}
            All{'           '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.menuItem,
            selectedMenu === 'list' && styles.selectedMenuItem,
          ]}
          onPress={() => setSelectedMenu('list')}>
          <Text
            style={[
              styles.menuText,
              {color: theme.text},
              selectedMenu === 'list' && styles.selectedMenuText,
            ]}>
            {'     '}
            List events{'     '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.menuItem,
            selectedMenu === 'local' && styles.selectedMenuItem,
          ]}
          onPress={() => setSelectedMenu('local')}>
          <Text
            style={[
              styles.menuText,
              {color: theme.text},
              selectedMenu === 'local' && styles.selectedMenuText,
            ]}>
            {'     '}
            Local events{'    '}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.contentContainer,{backgroundColor:theme.backgroundChat}]}>{renderContent()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  menuItem: {
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  selectedMenuItem: {
    borderBottomColor: colors.primary.medium,
  },
  menuText: {
    fontSize: 16,
    fontWeight:"500"
  },
  selectedMenuText: {
    color: colors.primary.medium,
  },
  contentContainer: {
    flex: 1,
  },

  //

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

  divider: {
    borderBottomColor: '#E5E6E8',
    borderBottomWidth: 1,
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: 5,
    marginHorizontal: 10,
    width: '80%',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  iconContainer2: {
    padding: 10,
  },
});
