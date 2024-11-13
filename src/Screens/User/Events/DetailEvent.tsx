import { View, Text, Image, Button, SafeAreaView, StyleSheet, Share, ScrollView, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import fonts from '../../../Utils/fonts';
import colors from '../../../Utils/colors';
import { ArrowLeft, CalendarXl, Clockxl, External, Mapxl, ShareXl, Users } from '../../../Assets/svg';
import Counter from '../../../Components/Events/Counter';
import HeaderUser from '../../../Components/HeaderUser';
import ButtonComponent from '../../../Components/Button'

import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../../Components/themeContext';

const DetailEvent = ({ route }: any) => {
  const { event, isExclusive, tickets } = route.params;
  const navigation = useNavigation()
  const {theme} = useContext(ThemeContext);

  const isFull = true // Cambiar si el evento está lleno
  console.log('EVENT', event)

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Hola, este es un mensaje para compartir!',
      });
  
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Compartido con actividad específica
          console.log('Compartido con: ', result.activityType);
        } else {
          // Compartido
          console.log('Compartido');
        }
      } else if (result.action === Share.dismissedAction) {
        // Cancelado
        console.log('Compartir cancelado');
      }
    } catch (error: any) {
      console.error('Error al compartir: ', error.message);
    }
  };

  return (
    <View style={{flex:1, backgroundColor:theme.background}}>
      {/* Header */}
      <SafeAreaView/>

      <HeaderUser svg={<ArrowLeft color={theme.text}/>} svg2={<ShareXl color={theme.text} />} onPress={() => navigation.reset({
        index: 0,
        routes: [{ name: 'EventsStack' }]
      })}
 onPress2={() => onShare()} />
        {/* Aquí puedes agregar el contenido de tu header */}
        
      <ScrollView 
         showsVerticalScrollIndicator={false} // Oculta la barra de desplazamiento vertical
         showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento horizontal, si es necesario
      >

      {/* Imagen */}
      <Image source={{ uri: event.image }} style={styles.cardImage} />

      <View style={{marginTop: 10, paddingHorizontal: 20}}>
        <Text style={[fonts.H6, {color: theme.text}]}>{event.title}</Text>
        {event.is_exclusive ? <Text style={[fonts.B3, {color: colors.secondary.dark, paddingVertical: 5}]}>The list exclusive event</Text> : <></>}
        <Text style={[fonts.B1, {lineHeight: 24, color: theme.text }]}>{event.description}</Text>
        { event.url ?  <TouchableOpacity onPress={() => { console.log('Click')}} style={{flexDirection:'row', marginTop:12, marginBottom:10,  justifyContent:'flex-end', alignContent:'flex-end', alignItems:'center', alignSelf:'flex-end'}}>
            <External color={theme.text}/>
          <Text style={{marginLeft:4, color: colors.primary.medium}}>Visit the page</Text>
          </TouchableOpacity> : <></>}
       
          <View style={styles.divider} />
        <View>
        <View style={{flexDirection:'row', marginTop:10, justifyContent:'space-between', backgroundColor: colors.primary.lighest, paddingVertical: 14, paddingHorizontal:16, borderRadius: 12}}>
            
            <Text style={{fontSize: 24, fontWeight: '700', color: colors.neutral.darkest}}>Price:</Text>

            <Text style={{fontSize: 24, fontWeight: '700',color: colors.neutral.darkest}}>${event.price}</Text>


        </View>  
          <View style={{flexDirection:'row', marginTop:20}}>
            <CalendarXl color={theme.text}/>
            <Text style={{marginLeft:4, color: theme.text }}>{event.date}</Text>
          </View>
          <View style={{flexDirection:'row', marginTop:12}}>
            <Clockxl color={theme.text}/>
            <Text style={{marginLeft:4, color:  theme.text}}>{event.start_time} - {event.end_time}</Text>
          </View>
          <View style={{flexDirection:'row', marginTop:12}}>
            <Mapxl color={theme.text}/>
          <Text style={{marginLeft:4, color: theme.text }}>{event.location}</Text>
          </View>
          <View style={{flexDirection:'row', marginTop:12}}>
            <View style={{flexDirection:'row'}}>
              <Users color={theme.text}/>
              <Text style={{marginLeft:4, color: colors.secondary.dark}}>104 users</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text style={{marginLeft:4, color: theme.text }}>*</Text>
              <Text style={{marginLeft:4, color: colors.secondary.dark}}>2 matchs</Text>
            </View>
            
          </View>
        </View>

        <View style={styles.divider} />

        <View style={{marginBottom: '16%'}}>
          <View style={{flexDirection:'row', marginTop:20}}>
            <Text style={[fonts.H4,{marginLeft:4, color:  theme.text}]}>Event Detail</Text>
          </View>
          <View style={{flexDirection:'row', marginTop:12}}>
            <Text style={[fonts.H5,{marginLeft:4, color: theme.text }]}>Music</Text>
          </View>
          <View style={{flexDirection:'row', marginTop:12}}>
            <Text style={{marginLeft:4, color:  theme.text }}>- Concerts</Text>
          </View>
          <View style={{flexDirection:'row', marginTop:12}}>
            <Text style={[fonts.H5,{marginLeft:4, color: theme.text }]}>Social</Text>
          </View>
          <View style={{flexDirection:'row', marginTop:12}}>
            <Text style={{marginLeft:4, color:  theme.text}}>- Beer festival</Text>
          </View>
          <View style={{flexDirection:'row', marginTop:12}}>
            <Text style={[fonts.H5,{marginLeft:4, color:  theme.text}]}>Community and Charity:</Text>
          </View>
          <View style={{flexDirection:'row', marginTop:12}}>
            <Text style={{marginLeft:4, color:  theme.text}}>- Fundraising</Text>
          </View>
          
        </View>

        <View style={{marginBottom: '30%'}}/>

       
      </View>
      </ScrollView>

      {isExclusive ? (
        <View style={{
          position: 'absolute',
          bottom: 12,
          left: 0,
          right: 0,
          padding: 10,
        }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('mytickets', {event, tickets})}
            style={{
              backgroundColor: colors.primary.medium,
              alignItems: 'center',
              paddingVertical: 12,
              borderRadius: 20,
              paddingHorizontal: 30,
            }}
          >
            <Text style={[fonts.Btn, { color: colors.neutral.white }]}>See my tickets</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('assistants', {event, tickets})}
            style={{
              backgroundColor: colors.neutral.darkest,
              alignItems: 'center',
              paddingVertical: 12,
              borderRadius: 20,
              paddingHorizontal: 30,
              marginTop: 10,
            }}
          >
            <Text style={[fonts.Btn, { color: colors.neutral.white }]}>See The List</Text>
          </TouchableOpacity>
        </View>
      ) : event.is_exclusive ? (
        <View style={{
          position: 'absolute',
          bottom: 16,
          left: 0,
          right: 0,
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
          <Counter />

          <View style={{
            backgroundColor: colors.primary.medium,
            alignItems: 'center',
            paddingVertical: 12,
            borderRadius: 20,
            paddingHorizontal: 30,
          }}>
            <Text style={[fonts.Btn, { color: colors.neutral.white }]}>Grab your Ticket</Text>
          </View>
        </View>
      ) : <View style={{paddingHorizontal: 20, bottom: 20}}>
      

      <ButtonComponent 
          onPress={() => console.log('aaaa')} 
          text={'I Will Go!'} 
          colors={colors.primary.medium}
          black={false}
         
          />
          {/* 
           <ButtonComponent 
          onPress={() => console.log('aaabbba')} 
          text={'Explore A*List perks'} 
          colors={colors.neutral.darkest}
          black={false}
         
          />
          */}
         
     
    </View>}

      

    
    </View>
  );
};

export default DetailEvent;

const styles = StyleSheet.create({
  cardImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  divider: {
    height: 1, // Altura del divisor
    backgroundColor: colors.neutral.light, // Color gris claro
    marginVertical: 10, // Espaciado vertical alrededor del divisor
  },
});