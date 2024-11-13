import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import fonts from '../../Utils/fonts';
import {useNavigation} from '@react-navigation/native';

import ButtonComponent from '../../Components/Button';
import ButtonOutline from '../../Components/ButtonOutlined';
import {
  Apple,
  AppleWhite,
  ArrowLeft,
  Closered,
  Eye,
  Google,
} from '../../Assets/svg';
import colors from '../../Utils/colors';
import {ThemeContext} from '../../Components/themeContext';

import {useAuth} from '../../Context/AuthContext';
import {LoginUser, LoginUserWithGoogle} from '../../Services/User/UserServices';

//login google
import {GoogleSignin} from '@react-native-google-signin/google-signin';
//login apple
import appleAuth from '@invertase/react-native-apple-authentication';
import Geolocation from '@react-native-community/geolocation';
export default function Login() {
  const navigation = useNavigation();
  const [text, settext] = useState('');
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);
  const {theme, isDarkMode} = useContext(ThemeContext);

  const {login} = useAuth();
  const handleOptionPress = (field: any, value: any) => {
    setFormLogin(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;

        // Actualiza los valores de latitud y longitud en el formulario
        handleOptionPress('latitude', latitude);
        handleOptionPress('longitude', longitude);
      },
      error => {
        console.error(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        }
      });
    } else {
      getCurrentLocation();
    }
  }, []);

  //apple
  async function onPressAppleLogin() {
    try {
      console.log('Before entering.. ');
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL],
      });
      console.log('AppleAuthRequestResponse -- ', appleAuthRequestResponse);
      login();
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
      const Login = LoginUserWithGoogle(
        userInfo.user.email,
        idToken,
        formLogin.latitude,
        formLogin.longitude,
      )
      if ((await Login) === true) {
        //navigation.navigate('ProfileCreate')
        console.log('LOGIN');
        
        login();
      } else {
        setError(true);
      }
      console.log('name: ' + userInfo.user.name);
      console.log('email: ' + userInfo.user.email);
      console.log('photoUrl: ' + userInfo.user.photo);
      console.log('token: ' + idToken);
     // login();
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

  const [secureTextEntry, setSecureTextEntry] = useState(true);

  // Función para alternar el estado de secureTextEntry
  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const [formLogin, setFormLogin] = useState({
    email: '',
    password: '',
    latitude: '', //
    longitude: '', //
  });

  const handleChangeLogin = (id: string, text: string) => {
    // Creamos una copia del estado actual del formulario
    const updatedFormLogin = {...formLogin};

    // Para otros campos, simplemente actualizamos su valor con 'text'
    updatedFormLogin[id] = text;
    // Actualizamos el estado del formulario con los nuevos valores
    setFormLogin(updatedFormLogin);
  };

  const validateEmail = (email: any): boolean => {
    const correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const correoValido = correoRegex.test(email);
    console.log(correoValido ? 'Correo válido' : 'Correo inválido');
    return correoValido;
  };

  const validatePassword = (password: any): boolean => {
    const contrasenaRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // Example regex: at least one number, one lowercase and one uppercase letter, at least 8 characters
    const contrasenaValido = contrasenaRegex.test(password);
    console.log(contrasenaValido ? 'Pass válido' : 'Pass inválido');
    console.log('Password:', password);
    return contrasenaValido;
  };

  const ValidateForm = async () => {
    //navigation.navigate('ListA');
    const isEmailValid = validateEmail(formLogin.email);
    const isPasswordValid = validatePassword(formLogin.password);

    // Si ambas validaciones son verdaderas, no hay errores
    if (isEmailValid && isPasswordValid) {
      console.log('TODO BIEN');
      console.log(formLogin);
      //RegisterUser(name, last_name, phone, birthdate, email, password)
      const Login = LoginUser(
        formLogin.email,
        formLogin.password,
        formLogin.latitude,
        formLogin.longitude,
      );
      if ((await Login) === true) {
        //navigation.navigate('ProfileCreate')
        console.log('LOGIN');
        
        login();
      } else {
        setError(true);
      }
    } else {
      setError2(true);
    }
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
            padding: 10,
            borderRadius: 24,
            position: 'absolute',
            top: '9%',
            left: '-2%',
            zIndex: 10,
          }}
          onPress={() => navigation.goBack()}>
          <ArrowLeft color={theme.text} />
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
          <Text style={[fonts.H3, {marginBottom: 10, color: theme.text}]}>
            Get on The List
          </Text>
          <Text style={[fonts.B1, {marginBottom: 20, color: theme.text}]}>
            Live first, date second.
          </Text>

          <View style={{width: '100%'}}>
            <TextInput
              style={[
                formLogin.email !== ''
                  ? styles.codeInputWithDigit
                  : styles.codeInputWithoutDigit,
                {
                  borderWidth: 1,
                  fontSize: 14,
                  borderRadius: 20,
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  backgroundColor: theme.placeholder,
                  color: theme.text,
                },
              ]}
              placeholder="User name"
              placeholderTextColor={theme.textDisable}
              value={formLogin.email}
              onChangeText={text => handleChangeLogin('email', text)}

              //value={formEmpresa.years}
              //onChangeText={(text) => handleChangeText('years', text)}
            />

            <View style={{marginVertical: 8}} />

            <View style={{position: 'relative', marginVertical: 8}}>
              <TextInput
                style={[
                  formLogin.password !== ''
                    ? styles.codeInputWithDigit
                    : styles.codeInputWithoutDigit,
                  {
                    borderWidth: 1,
                    fontSize: 14,
                    borderRadius: 20,
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    backgroundColor: theme.placeholder,
                    color: theme.text,
                  },
                ]}
                placeholder="Password"
                placeholderTextColor={theme.textDisable}
                value={formLogin.password}
                onChangeText={text => handleChangeLogin('password', text)}
                secureTextEntry={secureTextEntry}
                //value={formEmpresa.years}
                //onChangeText={(text) => handleChangeText('years', text)}
              />
              <TouchableOpacity
                onPress={toggleSecureTextEntry}
                style={{position: 'absolute', right: 10, top: '30%'}}>
                <Eye />
              </TouchableOpacity>
            </View>

            <View style={{marginVertical: 8}} />
          </View>

          {error && (
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 0,
                marginTop: -8,
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                alignSelf: 'flex-start',
              }}>
              <View style={{justifyContent: 'flex-start', marginTop: -8}}>
                <Closered />
              </View>
              <View style={{marginLeft: 4, marginBottom: 4}}>
                <Text style={styles.errorText}>User not found</Text>
              </View>
            </View>
          )}
          {error2 && (
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 0,
                marginTop: -8,
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                alignSelf: 'flex-start',
              }}>
              <View style={{justifyContent: 'flex-start', marginTop: -8}}>
                <Closered />
              </View>
              <View style={{marginLeft: 4}}>
                <Text style={styles.errorText}>
                  Invalid email format or pass incorrect
                </Text>
              </View>
            </View>
          )}

          <ButtonComponent
            onPress={
              () => ValidateForm()
              //handlePress()
            }
            text={'Login'}
            colors={colors.primary.medium}
            colorText={colors.neutral.white}
          />

          <View style={{alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 18,
              }}>
              <TouchableOpacity
                style={{marginLeft: 4}}
                onPress={() => navigation.navigate('recovery')}>
                <Text style={[fonts.Btn, {color: colors.primary.medium}]}>
                  Forgot your password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <View style={styles.containerDivider}>
              {/* Divisor izquierdo */}
              <View style={styles.divider} />
              {/* Texto "or" */}
              <Text style={[styles.orText, {color: colors.neutral.medium}]}>
                Or
              </Text>
              {/* Divisor derecho */}
              <View style={styles.divider} />
            </View>

            <ButtonOutline
              onPress={() => onPressAppleLogin()}
              text={'Login with Apple'}
              colors={colors.secondary.dark}
              showSvgBack={isDarkMode ? <AppleWhite /> : <Apple />}
            />
            <ButtonOutline
              onPress={() =>
                onGoogleButtonPress().then(() =>
                  console.log('Signed in with Google!'),
                )
              }
              text={'Login with Google'}
              colors={colors.secondary.dark}
              showSvgBack={<Google />}
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
  },
  bottomContainer: {
    backgroundColor: colors.neutral.white,
    height: '77%',
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
  codeInputWithDigit: {
    borderColor: colors.neutral.dark,
  },
  codeInputWithoutDigit: {
    borderColor: colors.neutral.medium,
  },
  errorText: {
    color: 'red',
    marginTop: -8,
    marginBottom: 10,
  },
});
