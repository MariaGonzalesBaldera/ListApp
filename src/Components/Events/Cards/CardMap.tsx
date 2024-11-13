import React, { useContext } from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Calendar, Clock, Coin, Map} from '../../../Assets/svg';
import fonts from '../../../Utils/fonts';
import colors from '../../../Utils/colors';
import { ThemeContext } from '../../themeContext';

interface CardEventProps {
  title: string;
  subtitle: boolean;
  date: string;
  hour: any;
  price: any;
  location: string;
  imageSrc: string;
}
  
  const CardMap = ({
    title,
  subtitle,
  date,
  location,
  imageSrc,
  hour,
  price,
}: CardEventProps) => {
  const {theme,isDarkMode} = useContext(ThemeContext);
    // Removemos todas las comas de la cadena de fecha
    const cleanedDate = date.replace(/,/g, '');

    // Dividimos la cadena de fecha limpia en partes usando el espacio como delimitador
    const dateParts = cleanedDate.split(' ');
  
    // Obtenemos el mes (segunda palabra) y el día (tercera palabra)
    const month = dateParts[1];
    const day = dateParts[2]; // No es necesario eliminar coma aquí porque ya la removimos
  
    // Combinamos mes y día para el formato final
    const formattedDate = `${month} ${day}`;

  return (
    
    <View style={[styles.card, {backgroundColor: theme.background}]}>
      <Image source={{uri: imageSrc}} style={styles.cardImage} />
      <View style={styles.cardDetails}>
        <Text
          style={[styles.cardTitle, fonts.H5, {color: theme.text}]}>
          {title}
        </Text>
        { subtitle === true ? (<Text
        style={[
          styles.cardSubtitle,
          fonts.B3,
          {color: colors.secondary.dark},
        ]}>
        The list exclusive event
      </Text>) : (<Text
        style={[
          styles.cardSubtitle,
          fonts.B3,
          {color: colors.secondary.dark},
        ]}>
        
      </Text>)}
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', justifyContent:'center', alignContent:'center', alignSelf:'center', alignItems:'center', marginBottom: 4}}>
            <Calendar color={theme.text}/>
            <Text style={[styles.cardDate, {color: theme.text}]}>
              {formattedDate}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent:'center', alignContent:'center', alignSelf:'center', alignItems:'center', marginLeft: 8, marginBottom: 4}}>
            <Clock color={theme.text}/>
            <Text style={[styles.cardDate, {color: theme.text}]}>
              {hour}
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Map color={theme.text}/>
          <Text style={[styles.cardLocation, {color: theme.text}]}>
          {location.length > 14 ? `${location.slice(0, 14)}...` : location}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Coin color={theme.text}/>
          <Text style={[styles.cardLocation, {color: colors.primary.medium}]}>
            ${price}
          </Text>
          <View
            style={{
              backgroundColor: isDarkMode?colors.secondary.darkest:colors.secondary.lighest,
              paddingHorizontal: 12,
              paddingVertical: 0,
              borderRadius: 20,
              marginVertical: 2,
              marginLeft: 8,
            }}>
            <Text
              style={[fonts.C2B, {color:isDarkMode? colors.secondary.light : colors.secondary.dark, fontSize: 10}]}>
              SAVE 60%
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden', // Ensure the rounded corners are applied correctly
  },
  cardImage: {
    width: 90,
    height: 140,
    marginRight: 16,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    resizeMode: 'cover',
  },
  cardDetails: {
    flex: 1,
    paddingRight: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 16,
    marginBottom: 14,
  },
  cardDate: {
    fontSize: 14,
  },
  cardLocation: {
    fontSize: 14,
    marginLeft:4
  },
});

export default CardMap;
