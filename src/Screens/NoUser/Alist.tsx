import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import fonts from '../../Utils/fonts'
import { useNavigation } from '@react-navigation/native';

import ButtonComponent from '../../Components/Button'
import ButtonOutline from '../../Components/ButtonOutlined';
import { Close } from '../../Assets/svg';
import colors from '../../Utils/colors';

import { useAuth } from '../../Context/AuthContext';
import { ThemeContext } from '../../Components/themeContext';

export default function ProfileCreate() {
  const navigation = useNavigation()
  const { theme } = useContext(ThemeContext);
  const { auth, login } = useAuth();

  const handlePress = () => {
    login()
  };

  const handlePressMeet = async () => {
    try {
      // Realiza el login
      await login();

      // Luego navega a la pantalla 'dailylist' dentro de MeetStack si está autenticado
      {/* if (auth) {
        navigation.navigate('MeetStack', {
          screen: 'dailylist',
        });
      } else {
        console.error("Authentication failed. Navigation not allowed.");
      } */}
    } catch (error) {
      console.error('Login failed:', error);
      // Aquí puedes manejar el error o mostrar un mensaje al usuario
    }
  };
  
  return (
    <ImageBackground
      source={require('../../Assets/img/alista.png')} // Ruta de la imagen de fondo
      style={styles.backgroundImage}
      resizeMode="cover" // Ajuste de la imagen de fondo
    >
      <View style={styles.container}>
        {/* Imagen encima del ImageBackground */}


        <TouchableOpacity style={{backgroundColor: theme.background, padding: 10, borderRadius: 24, position:'absolute', top: '12%', right: '-8%', zIndex:10}} 
        onPress={() => handlePress()}>
            <Close color={theme.text}/>
        </TouchableOpacity>


        <Text style={[fonts.H3, {marginBottom:10, color:colors.neutral.white}]}>You're on</Text>

        <Image
          source={require('../../Assets/img/logoalist.png')} // Ruta de la imagen encima
          style={styles.centeredImage}
        />
        
        {/* Espacio en blanco con las puntas superiores redondeadas */}
        {/* Contenido adicional debajo  <Text style={[fonts.S1, {marginBottom:24, color: colors.neutral.white, textAlign:'center'}]}>Please, complete your profile to find your perfect match.</Text> */}
        <View style={styles.bottomContainer}>
         
          <View style={styles.buttonContainer}>

          <ButtonComponent 
              onPress={() => handlePressMeet()} 
              text={'Get your matches'} 
              colors={colors.primary.medium}
              colorText={colors.neutral.white}
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
    height:'20%',
    width:'100%',
    paddingHorizontal:24,
    borderRadius: 20,
    padding: 0,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,

  },
  bottomText: {
    marginBottom: 20,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    width: '100%',

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

