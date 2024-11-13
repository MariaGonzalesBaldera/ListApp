import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useContext, useState} from 'react';
import fonts from '../../Utils/fonts';
import {useNavigation} from '@react-navigation/native';

import ButtonComponent from '../../Components/Button';
import ButtonOutline from '../../Components/ButtonOutlined';
import TextIn from '../../Components/Input';
import {Apple, AppleWhite, ArrowLeft, Google, Mail} from '../../Assets/svg';
import colors from '../../Utils/colors';

import {useAuth} from '../../Context/AuthContext';
import {ThemeContext} from '../../Components/themeContext';

export default function Recovery() {
  const navigation = useNavigation();
  const [text, settext] = useState('');

  const {theme, isDarkMode} = useContext(ThemeContext);

  const {login} = useAuth();

  const handlePressMail = () => {
    navigation.navigate('Recoveryinput', {type: 'mail'});
  };

  const handlePressPhone = () => {
    navigation.navigate('Recoveryinput', {type: 'phone'});
  };

  return (
    <ImageBackground
      source={require('../../Assets/img/bg.png')} // Ruta de la imagen de fondo
      style={styles.backgroundImage}
      resizeMode="cover" // Ajuste de la imagen de fondo
    >
      <View style={styles.container}>
        {/* Imagen encima del ImageBackground */}
        <TouchableOpacity
          style={{
            backgroundColor: theme.background,
            padding: 10,
            borderRadius: 24,
            position: 'absolute',
            top: '9%',
            left: '-2%',
            zIndex: 10,
          }}
          onPress={() => navigation.goBack()}>
          <ArrowLeft color={theme.text}/>
        </TouchableOpacity>

        <Image
          tintColor={theme.background}
          source={require('../../Assets/img/logow.png')} // Ruta de la imagen encima
          style={styles.centeredImage}
        />
        {/* Espacio en blanco con las puntas superiores redondeadas */}
        <View style={styles.whiteSpace} />
        {/* Contenido adicional debajo */}
        <View
          style={[styles.bottomContainer, {backgroundColor: theme.background}]}>
          <Text style={[fonts.H3, {marginBottom: 10, color: theme.text}]}>
            Recover your password
          </Text>
          <Text style={[fonts.B1, {marginBottom: 20, color: theme.text}]}>
            write an email or phone number.
          </Text>

          <ButtonComponent
            onPress={() => handlePressMail()}
            text={'Mail'}
            colors={colors.primary.medium}
            colorText={colors.neutral.white}
          />

          <ButtonComponent
            onPress={() => handlePressPhone()}
            text={'Phone number'}
            colors={theme.text}
            colorText={theme.background}
          />

          <View style={styles.containerDivider}>
            {/* Divisor izquierdo */}
            <View style={[styles.divider, {backgroundColor: theme.tertiary}]} />
            {/* Texto "or" */}
            <Text style={[styles.orText, {color: theme.tertiary}]}>
              Or register
            </Text>
            {/* Divisor derecho */}
            <View style={[styles.divider, {backgroundColor: theme.tertiary}]} />
          </View>

          <View style={styles.buttonContainer}>
            <ButtonOutline
              onPress={() => navigation.navigate('Create')}
              text={'Login with Google'}
              colors={colors.secondary.dark}
              showSvgBack={<Google />}
            />

            <ButtonOutline
              onPress={() => navigation.navigate('Create')}
              text={'Login with Apple'}
              colors={colors.secondary.dark}
              showSvgBack={isDarkMode ? <AppleWhite /> : <Apple />}
            />
          </View>

          <View style={{alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 18,
              }}>
              <Text style={[fonts.B1, {color: theme.text}]}>
                Not a member yet?
              </Text>
              <TouchableOpacity
                style={{marginLeft: 4}}
                onPress={() => navigation.navigate('Create')}>
                <Text style={[fonts.Btn, {color: colors.primary.medium}]}>
                  {' '}
                  Create a profile
                </Text>
              </TouchableOpacity>
            </View>
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
    resizeMode: 'center',
    marginTop: '8%',
  },
  whiteSpace: {
    backgroundColor: colors.neutral.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
  },
  bottomContainer: {
    backgroundColor: colors.neutral.white,
    height: '65%',
    width: '100%',
    paddingHorizontal: 24,
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

  containerDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  orText: {
    marginHorizontal: 10, // Espacio horizontal alrededor del texto
    fontSize: 16, // Tamaño del texto
    fontWeight: 'bold', // Negrita
  },
});
