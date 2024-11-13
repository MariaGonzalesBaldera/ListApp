import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import fonts from '../../Utils/fonts'
import { useNavigation } from '@react-navigation/native';

import ButtonComponent from '../../Components/Button'
import colors from '../../Utils/colors';

export default function Complete() {
  const navigation = useNavigation()

  return (
    <ImageBackground
      source={require('../../Assets/img/ballon.png')} // Ruta de la imagen de fondo
      style={styles.backgroundImage}
      resizeMode="cover" // Ajuste de la imagen de fondo
    >
      <View style={styles.container}>
        {/* Imagen encima del ImageBackground */}
        
        <Text style={[fonts.H3, {marginBottom:10, color:colors.neutral.white}]}>You're on</Text>
        <Image
          source={require('../../Assets/img/logoalist.png')} // Ruta de la imagen encima
          style={styles.centeredImage}
        />
        
        {/* Espacio en blanco con las puntas superiores redondeadas */}
        {/* Contenido adicional debajo */}
        <View style={styles.bottomContainer}>
          <Text style={[fonts.S1, {marginBottom:24, color: colors.neutral.white, textAlign:'center'}]}>Please, complete your profile to find your perfect match.</Text>
          <View style={styles.buttonContainer}>

          <ButtonComponent 
              onPress={() => navigation.navigate('Welcome')} 
              text={'Get your matches'} 
              colors={colors.primary.medium}
             
              />
              <ButtonComponent 
              onPress={() => navigation.navigate('Welcome')} 
              text={'Explore A*List perkse'} 
              colors={colors.neutral.white}
              black={true}
             
              />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '75%', // Espacio arriba del 15%
  },
  centeredImage: {
    resizeMode:'contain',
  },
  whiteSpace: {
    backgroundColor: colors.neutral.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',


  },
  bottomContainer: {
    backgroundColor: 'transparent',
    height:'40%',
    width:'100%',
    paddingHorizontal:24,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 15,

  },
  bottomText: {
    marginBottom: 20,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',

  },
  buttonText: {
    color: colors.neutral.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

