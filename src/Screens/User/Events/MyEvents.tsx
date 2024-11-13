import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import HeaderUser from '../../../Components/HeaderUser';
import {ArrowLeft} from '../../../Assets/svg';
import {useNavigation} from '@react-navigation/native';

import Card from '../../../Components/Events/Cards/CardEvent'; // Import the Card component
import colors from '../../../Utils/colors';
import {GetMyEvents} from '../../../Services/Events/Events';
import {ThemeContext} from '../../../Components/themeContext';

export default function MyEvents() {
  const navigation = useNavigation();
  const [myevents, setMyevents] = useState([]);
  const [mytickets, setMytickets] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await GetMyEvents();

        // Mapea solo los objetos 'event' dentro de 'data'
        const mappedEvents = data.data.map(item => item.event);
        const mappedTickets= data.data.map(item => item.tickets);

        setMyevents(mappedEvents);
        setMytickets(mappedTickets)
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);



  const [selectedMenu, setSelectedMenu] = useState('upcoming');
  const {theme} = useContext(ThemeContext);

  const renderContent = () => {
    if (selectedMenu === 'upcoming') {
      return (
        <ScrollView style={{paddingTop: 20, paddingHorizontal: 20,backgroundColor:theme.backgroundChat}}>
           {myevents.map((event, index) => {
      const tickets = mytickets[index]; // Obtener el ticket correspondiente al evento, puede ser undefined
      return (
        <TouchableOpacity
          key={event.id}
          onPress={() => {
            // Verifica si el ticket existe y pásalo solo si está disponible
            navigation.navigate('detailevent', {
              event,
              isExclusive: true,
              ...(tickets && { tickets }), // Solo agrega 'ticket' si está definido
            });
          }}
        >
          <Card
            title={event.title}
            date={event.date}
            subtitle={event.is_exclusive}
            location={event.location}
            imageSrc={event.image}
            hour={event.start_time}
            price={event.price}
          />
        </TouchableOpacity>
      );
    })}

        </ScrollView>
      );
    } else {
      return (
        <Text style={{color: theme.text}}>Past Events Content</Text>
      );
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <HeaderUser
        text="My events"
        svg={<ArrowLeft color={theme.text} />}
        onPress={() => navigation.goBack()}
      />
      <View style={[styles.menuContainer, {backgroundColor: theme.background}]}>
        <TouchableOpacity
          style={[
            styles.menuItem,
            selectedMenu === 'upcoming' && styles.selectedMenuItem,
          ]}
          onPress={() => setSelectedMenu('upcoming')}>
          <Text
            style={[
              {fontSize: 16, color: theme.text},
              selectedMenu === 'upcoming' && styles.selectedMenuText,
            ]}>
            Upcoming Events
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.menuItem,
            selectedMenu === 'past' && styles.selectedMenuItem,
          ]}
          onPress={() => setSelectedMenu('past')}>
          <Text
            style={[
              {fontSize: 16, color: theme.text},
              selectedMenu === 'past' && styles.selectedMenuText,
            ]}>
            Past Events
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>{renderContent()}</View>
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
  },
  selectedMenuText: {
    color: colors.primary.medium,
  },
  contentContainer: {
    flex: 1,
  },
});
