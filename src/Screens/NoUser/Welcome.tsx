import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useContext} from 'react';
import fonts from '../../Utils/fonts';
import {useNavigation} from '@react-navigation/native';

import ButtonComponent from '../../Components/Button';
import ButtonOutline from '../../Components/ButtonOutlined';
import {ArrowLeft} from '../../Assets/svg';
import colors from '../../Utils/colors';
import {ThemeContext} from '../../Components/themeContext';

export default function Welcome() {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);

  return (
    <ImageBackground
      source={require('../../Assets/img/bg.png')} // Ruta de la imagen de fondo
      style={styles.backgroundImage}
      resizeMode="cover" // Ajuste de la imagen de fondo
    >
      <View style={styles.container}>
        {/* Imagen encima del ImageBackground */}
        <Image
          source={require('../../Assets/img/logow.png')} // Ruta de la imagen encima
          style={styles.centeredImage}
        />
        {/* Espacio en blanco con las puntas superiores redondeadas */}
        <View style={styles.whiteSpace} />
        {/* Contenido adicional debajo */}
        <View
          style={[styles.bottomContainer, {backgroundColor: theme.background}]}>
          <Text style={[fonts.H7, {marginBottom: 10, color: theme.text}]}>
            Get on The List
          </Text>
          <Text style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
            Welcome to dating IRL
          </Text>
          <View style={styles.buttonContainer}>
            <ButtonComponent
              onPress={() => navigation.navigate('Login')}
              text={'Login'}
              colors={colors.primary.medium}
              colorText={colors.neutral.white}
            />
            <ButtonComponent
              onPress={() => navigation.navigate('Create')}
              text={'Create a profile'}
              colors={theme.text}
              colorText={theme.background}
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
    paddingTop: '15%', // Espacio arriba del 15%
  },
  centeredImage: {
    resizeMode: 'contain',
    marginTop: '45%',
  },
  whiteSpace: {
    backgroundColor: colors.neutral.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
  },
  bottomContainer: {
    // backgroundColor: colors.neutral.white,
    height: Platform.OS === 'android' ? '35%' : '32%',
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  bottomText: {
    marginBottom: 20,
  },
  buttonContainer: {
    justifyContent: 'center',
    width: '100%',
    height: '60%',
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
