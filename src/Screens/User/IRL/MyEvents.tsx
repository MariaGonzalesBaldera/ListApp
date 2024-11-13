import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import HeaderUser from '../../../Components/HeaderUser'
import { ArrowLeft } from '../../../Assets/svg'
import { useNavigation } from '@react-navigation/native';


import Card from '../../../Components/Events/Cards/CardEvent'; // Import the Card component
import colors from '../../../Utils/colors';
import { ThemeContext } from '../../../Components/themeContext';

export default function MyEvents() {
  const navigation = useNavigation();
  const {theme,isDarkMode} = useContext(ThemeContext);
  // Dummy data for the Card component
  const eventData = [
    { 
      id: 1, 
      title: 'Night circus disco party', 
      subtitle: 'The list exclusive evenwwt', 
      date: 'May 14', 
      location: 'Latin Disco Chicago', 
      imageSrc: 'https://dummyimage.com/300x500/000/fff&text=Event+1' 
    },
    { 
      id: 2, 
      title: 'Museum night festival', 
      subtitle: '', 
      date: 'Jun 14', 
      location: 'Central museum', 
      imageSrc: 'https://dummyimage.com/300x500/000/fff&text=Event+2' 
    },
    { 
      id: 3, 
      title: 'Museum night festival ', 
      subtitle: '', 
      date: 'Jun 14', 
      location: 'Central museum',
      imageSrc: 'https://dummyimage.com/300x500/000/fff&text=Event+3' 
    },
  ];

  const MyData = [
    { 
      id: 1, 
      title: 'Night circus disco party', 
      subtitle: 'The list exclusive event', 
      date: 'May 14', 
      location: 'Latin Disco Chicago', 
      imageSrc: 'https://dummyimage.com/300x500/000/fff&text=Event+1' 
    },
    { 
      id: 2, 
      title: 'Museum night festival', 
      subtitle: '', 
      date: 'Jun 14', 
      location: 'Central museum', 
      imageSrc: 'https://dummyimage.com/300x500/000/fff&text=Event+2' 
    },
    { 
      id: 3, 
      title: 'Museum night festival ', 
      subtitle: '', 
      date: 'Jun 14', 
      location: 'Central museum',
      imageSrc: 'https://dummyimage.com/300x500/000/fff&text=Event+3' 
    },
  ];

  const [selectedMenu, setSelectedMenu] = useState('upcoming');

  const renderContent = () => {
    if (selectedMenu === 'upcoming') {
      return (
      <ScrollView style={{ paddingTop: 20,
        paddingHorizontal: 20,backgroundColor:theme.background,}}>
        {eventData.map(event => (
          <TouchableOpacity onPress={() => navigation.navigate('detailevent')}>
            <Card key={event.id} title={event.title} date={event.date} subtitle={event.subtitle} location={event.location} imageSrc={event.imageSrc}/>
          </TouchableOpacity>
          
        ))}

      {MyData.map(event => (
          <TouchableOpacity onPress={() => navigation.navigate('mytickets')}>
            <Card key={event.id} title={event.title} date={event.date} subtitle={event.subtitle} location={event.location} imageSrc={event.imageSrc}/>
          </TouchableOpacity>
          
        ))}
        </ScrollView>);
    } else {
      return <Text style={{color: colors.neutral.darkest}}>Past Events Content</Text>;
    }
  };

  return (
    <View style={{flex:1 ,  backgroundColor: theme.background,}}>
      <HeaderUser text='My events' svg={<ArrowLeft color={theme.text}/>} onPress={() => navigation.goBack()} />
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={[styles.menuItem, selectedMenu === 'upcoming' && styles.selectedMenuItem]}
          onPress={() => setSelectedMenu('upcoming')}
        >
          <Text style={[styles.menuText, selectedMenu === 'upcoming' && styles.selectedMenuText]}>Upcoming Events</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuItem, selectedMenu === 'past' && styles.selectedMenuItem]}
          onPress={() => setSelectedMenu('past')}
        >
          <Text style={[styles.menuText, selectedMenu === 'past' && styles.selectedMenuText]}>Past Events</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>

      
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
   
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.white,
    backgroundColor: colors.neutral.white
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
    color: colors.neutral.darkest,
  },
  selectedMenuText: {
    color: colors.primary.medium,
  },
  contentContainer: {
    backgroundColor: colors.neutral.lighest,
    flex:1
  },
});
