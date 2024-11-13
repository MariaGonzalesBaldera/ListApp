import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';
import fonts from '../../Utils/fonts';
import {useNavigation} from '@react-navigation/native';

import ButtonOutline from '../../Components/ButtonOutlined';
import {Apple, ArrowLeft, Google, AppleWhite} from '../../Assets/svg';
import colors from '../../Utils/colors';
import {ThemeContext} from '../../Components/themeContext';

import {useAuth} from '../../Context/AuthContext';

//login google
import {GoogleSignin} from '@react-native-google-signin/google-signin';
//login apple
import appleAuth from '@invertase/react-native-apple-authentication';

export default function Login() {
  const navigation = useNavigation();
  const {theme, isDarkMode} = useContext(ThemeContext);

  const {login} = useAuth();

    //apple
    async function onPressAppleLogin() {
      try {
        console.log('Before entering.. ');
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL],
        });
        console.log('AppleAuthRequestResponse -- ', appleAuthRequestResponse);
        login()
        /* const credential =  await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
       if (credential ===  appleAuth.State.AUTHORIZED) {
        console.log('AppleAuthRequestResponse -- ', appleAuthRequestResponse)
       }*/
      } catch (error) {
        console.log('error -- ', error);
      }
    }
    GoogleSignin.configure({
      webClientId:
        '1068621979148-1p4j5b781leq0iiqqs77dke0dtskussp.apps.googleusercontent.com',
      iosClientId:
        '1068621979148-71qg8selti9rrq2d9fqtcl5vr7fnrpv8.apps.googleusercontent.com',
    });
  
    async function onGoogleButtonPress() {
      try {
        console.log('press');
        await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
        const userInfo = await GoogleSignin.signIn();
        const {idToken} = await GoogleSignin.signIn();
        console.log('name: ' + userInfo.user.name);
        console.log('email: ' + userInfo.user.email);
        console.log('photoUrl: ' + userInfo.user.photo);
        console.log('token: ' + idToken);
        login();
      } catch (error) {
        console.error('Error during Google sign-in:', error);
      }
    }
    async function onGoogleSignOut() {
      try {
        await GoogleSignin.signOut();
        console.log('User signed out successfully');
      } catch (error) {
        console.error('Error during Google sign-out:', error);
      }
    }

  const handlePress = () => {
    login();
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
          source={require('../../Assets/img/logow.png')} // Ruta de la imagen encima
          style={styles.centeredImage}
        />
        {/* Espacio en blanco con las puntas superiores redondeadas */}
        <View style={styles.whiteSpace} />
        {/* Contenido adicional debajo */}
        <View
          style={[styles.bottomContainer, {backgroundColor: theme.background}]}>
          <Text style={[fonts.H3, {marginBottom: 20, color: theme.text}]}>
            Create a profile
          </Text>

          <View style={styles.buttonContainer}>
            <ButtonOutline
              onPress={() => navigation.navigate('Register')}
              text={'Continue with Email'}
              colors={colors.primary.medium}
            />
            
            <ButtonOutline 
              onPress={() => onPressAppleLogin()} 
              text={'Continue with Apple'}
              colors={colors.secondary.dark}
              showSvgBack={isDarkMode ? <AppleWhite /> : <Apple />}
            />
            <ButtonOutline 
              onPress={() => onGoogleButtonPress()}  //.then(() => console.log('Signed in with Google!'))d
              text={'Continue with Google'}
              colors={colors.secondary.dark}
              showSvgBack={<Google/>}
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
                Already have a profile?
              </Text>
              <TouchableOpacity
                style={{marginLeft: 4}}
                onPress={() => navigation.navigate('Login')}
                //onPress={() => handlePress()}
              >
                <Text style={[fonts.Btn, {color: colors.primary.medium}]}>
                  {' '}
                  Log in
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
    resizeMode: 'contain',
    marginTop: '35%',
  },
  whiteSpace: {
    backgroundColor: colors.neutral.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomContainer: {
    height: '48%',
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
});
