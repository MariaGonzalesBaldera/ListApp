import React, { useState } from 'react';
import { View, Text, Image, SafeAreaView, StyleSheet, Share, ScrollView, TouchableOpacity } from 'react-native';
import fonts from '../../../Utils/fonts';
import colors from '../../../Utils/colors';
import { AddCalendar, ArrowLeft, CalendarXl, Clockxl, Mapxl, Wallet } from '../../../Assets/svg';
import HeaderUser from '../../../Components/HeaderUser';
import QRGenerator from '../../../Components/QRGenerator';
import { useNavigation } from '@react-navigation/native';
import PurchaseEvent from '../../../Components/Purchase/PurchaseEvent';

import Upgradex from '../../../Assets/img/upgrade.png';
import Upgradexa from '../../../Components/Upgradexa';

const Upgrade = () => {
  const navigation = useNavigation();

  const [showPurchaseEvent, setShowPurchaseEvent] = useState(false);

  const handlePurchase = () => {
    setShowPurchaseEvent(true);
  };


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
      console.error('Error al compartir: ', error.message);
    }
  };

  const tickets = [
    {
      id: '1',
      title: 'Título del evento 1',
      subtitle: 'The list exclusive event 1',
      date: 'Tuesday, May 14, 2024',
      time: '5:00 - 8:00 PM',
      location: 'Latin Disco Chicago 1',
      orderId: '0000987654321',
      refId: 'NCD 01',
      imageUri: 'https://dummyimage.com/300x500/000/fff&text=Event+1',
    },
    {
      id: '2',
      title: 'Título del evento 2',
      subtitle: 'The list exclusive event 2',
      date: 'Wednesday, June 20, 2024',
      time: '6:00 - 9:00 PM',
      location: 'Latin Disco Chicago 2',
      orderId: '0000987654322',
      refId: 'NCD 02',
      imageUri: 'https://dummyimage.com/300x500/000/fff&text=Event+2',
    },
    {
      id: '3',
      title: 'Título del evento 3',
      subtitle: 'The list exclusive event 3',
      date: 'Thursday, July 15, 2024',
      time: '7:00 - 10:00 PM',
      location: 'Latin Disco Chicago 3',
      orderId: '0000987654323',
      refId: 'NCD 03',
      imageUri: 'https://dummyimage.com/300x500/000/fff&text=Event+3',
    },
  ];

  return (
    <View style={{ flex: 1 }}>
    
        <Upgradexa img={Upgradex} name=", Juan" text="Night circus disco party" />
   
    </View>


  );
};

export default Upgrade;

const styles = StyleSheet.create({
  horizontalScrollView: {
    paddingHorizontal: 20,
  },
  ticketContainer: {
    backgroundColor: colors.neutral.white,
    borderRadius: 20,
    marginTop: 20,
    marginRight: 10,
    paddingBottom: 20,
    width: 350, // Puedes ajustar este valor según tus necesidades
    marginBottom:100
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
    backgroundColor: colors.neutral.darkest,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    paddingHorizontal: 30,
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
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
});
