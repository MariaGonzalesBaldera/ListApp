import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, SafeAreaView, StyleSheet, Share, ScrollView, TouchableOpacity } from 'react-native';
import fonts from '../../../Utils/fonts';
import colors from '../../../Utils/colors';
import { AddCalendar, ArrowLeft, BtnSend, CalendarXl, Clockxl, Mapxl, Wallet } from '../../../Assets/svg';
import HeaderUser from '../../../Components/HeaderUser';
import QRGenerator from '../../../Components/QRGenerator';
import { useNavigation } from '@react-navigation/native';
import PurchaseEvent from '../../../Components/Purchase/PurchaseEvent';

import Circus from '../../../Assets/img/circus.jpeg';
import { ThemeContext } from '../../../Components/themeContext';
import { addPassToWallet } from '../../../Services/Wallet/Apple';


const MyTickets = ({route}: any) => {
  const navigation = useNavigation();
  //const route = useRoute(); // Obtén el objeto 'route' usando este hook
  const { event, tickets } = route.params;
  const {theme,isDarkMode} = useContext(ThemeContext);
  const [showPurchaseEvent, setShowPurchaseEvent] = useState(false);
  const handlePurchase = () => {
    setShowPurchaseEvent(true);
  };

  console.log('TICKETS', tickets)
  console.log('EVENT', event)

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Hola, este es un mensaje para compartir!',
      });
  
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Compartido con: ', result.activityType);
        } else {
          console.log('Compartido');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Compartir cancelado');
      }
    } catch (error) {
      console.error('Error al compartir: ', error);
    }
  };

  

  
  const handleAddPass = async (idTicket: string) => {
    addPassToWallet(idTicket)
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error);
      });
  };

  const [selectedMenu, setSelectedMenu] = useState('events');

  const renderContent = () => {
    if (selectedMenu === 'events') {
      return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: theme.backgroundChat }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollView}>
          {tickets?.map(ticket => (
            <View key={ticket.id} style={[styles.ticketContainer,{backgroundColor:theme.background}]}>
              <Image source={{ uri: event.image }} style={styles.ticketImage} /> 
              <View style={styles.ticketContent}>
                <Text style={[fonts.H4 , {color: theme.text,}]}>{event.title}</Text>
                <Text style={[fonts.B3, { color: isDarkMode?colors.secondary.light:colors.secondary.dark, paddingVertical: 5 }]}>{event.is_exclusive ? 'The list exclusive event' : ''}</Text>
                <View>
                  <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <CalendarXl color={theme.text}/>
                    <Text style={{ marginLeft: 4 , color: theme.text}}>{event.date}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <Clockxl color={theme.text}/>
                    <Text style={{ marginLeft: 4, color: theme.text}}>{event.start_time} - {event.end_time} </Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <Mapxl color={theme.text}/>
                    <Text style={{ marginLeft: 4 , color: theme.text}}>{event.location}</Text>
                  </View>
                </View>
                <View style={styles.qrContainer}>
                  <Text style={{color: theme.text}}>Order {ticket.order}</Text>
                  <QRGenerator />
                  <Text style={{color: theme.text}}>Ref: {ticket.ref}</Text>
                  <TouchableOpacity onPress={()=>handleAddPass(ticket.code)}>
                  <View style={[styles.walletButton,{backgroundColor:theme.text}]}>
                    <Wallet/>
                    <Text style={[fonts.Btn, { color: theme.background, marginLeft: 8 }]}>Add to Apple Wallet</Text>
                  </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={{ paddingHorizontal: 20, justifyContent:'center', alignSelf:'center', marginTop: 20 , width:'80%', alignItems:'center'}}>
          <Text style={[fonts.Btn, { color: theme.text }]}>Do you want to invite someone?</Text>
         
        </View>
        <View style={{backgroundColor: colors.primary.lighest, flexDirection:'row', borderRadius: 40, width:'90%', marginBottom: 120,  alignSelf:'center', marginTop: 20 ,justifyContent:'space-between', padding:8}}>
          <View style={{flexDirection:'row', alignContent:'center', alignItems:'center'}}>
          <Text style={[fonts.S1, { color: theme.text, paddingLeft: 8 }]}>Tickets drinks:</Text>
          <Text style={[fonts.S1, { color: colors.primary.medium }]}>{` ${tickets.filter(ticket => ticket.type === 'access').length}`}</Text>
          </View>
          <TouchableOpacity
                      onPress={()=> navigation.navigate('assistants', {event, tickets, optionBefore:'1'})}
             >
                      <BtnSend />
                    </TouchableOpacity>
            </View>
       
      </ScrollView>
      );
    } else {
      return (
        <Text style={{color: theme.text}}>Past Events Content</Text>
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!showPurchaseEvent ? (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
        <SafeAreaView />
        <HeaderUser text='My tickets' svg={<ArrowLeft color={theme.text} />} svg2={<AddCalendar color={theme.text} />} onPress={() => navigation.goBack()} onPress2={() => onShare()} />
        <View style={[styles.menuContainer, {backgroundColor: theme.background}]}>
        <TouchableOpacity
          style={[
            styles.menuItem,
            selectedMenu === 'events' && styles.selectedMenuItem,
          ]}
          onPress={() => setSelectedMenu('events')}>
          <Text
            style={[
              {fontSize: 16, color: theme.text},
              selectedMenu === 'events' && styles.selectedMenuText,
            ]}>
            Tickets events
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.menuItem,
            selectedMenu === 'drinks' && styles.selectedMenuItem,
          ]}
          onPress={() => setSelectedMenu('drinks')}>
          <Text
            style={[
              {fontSize: 16, color: theme.text},
              selectedMenu === 'drinks' && styles.selectedMenuText,
            ]}>
            Tickets drinks
          </Text>
        </TouchableOpacity>
      </View>

          { renderContent() }


        
  
        <View style={[styles.footer,{backgroundColor:theme.backgroundChat}]}>
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={[fonts.H5, { color: theme.text }]}>You have a problem?</Text>
            <Text style={[fonts.B3, { color: theme.text }]}>We’re here if you need us</Text>
          </View>
          <TouchableOpacity style={styles.helpButton} onPress={() => handlePurchase()}>
            <Text style={[fonts.Btn, { color: colors.neutral.white }]}>Help</Text>
          </TouchableOpacity>
        </View>
      </View>
      ) : (
        <PurchaseEvent img={Circus} name=", Juan" text="Night circus disco party" />
      )}
    </View>


  );
};

export default MyTickets;

const styles = StyleSheet.create({
  horizontalScrollView: {
    paddingHorizontal: 20,
  },
  ticketContainer: {
    borderRadius: 20,
    marginTop: 20,
    marginRight: 10,
    paddingBottom: 20,
    width: 330, // Puedes ajustar este valor según tus necesidades
    marginBottom:10
  },
  cardImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  ticketContent: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  qrContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  walletButton: {
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    paddingHorizontal: 40,
    marginTop: 20,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  helpButton: {
    backgroundColor: colors.primary.medium,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 20,
    paddingHorizontal: 30,
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
  ticketImage: {
    width: '100%',
    height: 120, // Ajusta según tus necesidades
    borderTopLeftRadius:20,
    borderTopRightRadius:20
  },
});
