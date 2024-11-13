import React, {useEffect, useContext, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {correoRegex, contrasenaRegex} from '../../Utils/regex';

import Header from '../../Components/Header';
import fonts from '../../Utils/fonts';
import colors from '../../Utils/colors';
import {Checked, Checkpass, Closered} from '../../Assets/svg';
import SelectComponent from '../../Components/select';
import {
  CreateUser,
  LoginUser,
  OtpSend,
  OtpReceive,
} from '../../Services/User/UserServices';
import Geolocation from '@react-native-community/geolocation';
import {ThemeContext} from '../../Components/themeContext';

export default function Register() {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [stage, setStage] = useState(1); // Estado para controlar la etapa del proceso de registro

  const {theme, isDarkMode} = useContext(ThemeContext);

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [selectedCode, setSelectedCode] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null); // Estado para el país seleccionado

  const [code, setCode] = useState(['', '', '', '', '', '']); // Arreglo para almacenar el código

  const dummyOptions = [
    {label: 'Peru (+51)', value: '+51'},
    {label: 'United States (+1)', value: '+1'},
    {label: 'United Kingdom (+44)', value: '+44'},
    {label: 'Colombia (+57)', value: '+57'}, // Añadido Colombia
  ];

  // Función para manejar la selección del código del país
  const handleOptionSelect = (selectedOptionValue: string) => {
    setFormProfile({
      ...formProfile,
      codeCountry: selectedOptionValue, // Actualizamos el código de país en el formulario
    });
  };

  const refs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  // Maneja el cambio de texto y el enfoque automático
  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Actualiza el código en formProfile
    setFormProfile(prevProfile => ({
      ...prevProfile,
      code: newCode.join(''), // Convierte el array en una cadena
    }));

    // Mueve el enfoque al siguiente campo
    if (text && index < refs.length - 1) {
      refs[index + 1].current.focus();
    }
  };

  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

  const handleToggle = () => {
    setChecked(!checked);
  };
  const handleToggle2 = () => {
    setChecked2(!checked2);
  };
  const handleToggle3 = () => {
    setChecked3(!checked3);
  };

  const [formProfile, setFormProfile] = useState({
    phone: '',
    code: '',
    codeCountry: '',
    name: '',
    last_name: '',
    email: '',
    password: '',
    repassword: '',
    checkone: false,
    checktwo: false,
    latitude: '', //
    longitude: '', //
  });

  const handleToggleCheckOne = () => {
    setFormProfile(prevState => ({
      ...prevState,
      checkone: !prevState.checkone,
    }));
  };

  const handleToggleCheckTwo = () => {
    setFormProfile(prevState => ({
      ...prevState,
      checktwo: !prevState.checktwo,
    }));
  };

  // Verifica si ambos campos están vacíos
  const disableBtn1 = formProfile.phone.trim() === '';
  const disableBtn2 = !code.every(
    value => !isNaN(parseFloat(value)) && isFinite(value),
  );
  const disableBtn3 = !(
    formProfile.name &&
    formProfile.email &&
    formProfile.password &&
    formProfile.repassword &&
    formProfile.checkone &&
    formProfile.checktwo
  );

  const maskPhoneNumber = phoneNumber => {
    // Convierte el número de teléfono a una cadena si no lo es
    const phoneStr = phoneNumber.toString();

    // Asegúrate de que el número tiene al menos tres dígitos
    if (phoneStr.length >= 3) {
      // Reemplaza todos los dígitos excepto los últimos 3 con asteriscos
      const maskedPhone =
        phoneStr.slice(0, -3).replace(/\d/g, '*') + phoneStr.slice(-3);
      return maskedPhone;
    }

    return phoneStr; // Si el número tiene menos de 3 dígitos, no se enmascara
  };

  const contrasenaRegexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  //const disableBtn5 = formProfile.persons.trim() === '';

  // Función para manejar cambios en los inputs, incluyendo la concatenación del código al teléfono
  const handleChangeLogin = (id: string, text: string) => {
    const updatedFormLogin = {...formProfile};

    if (id === 'checkone' || id === 'checktwo') {
      updatedFormLogin[id] = text === 'true'; // Convierte el string a booleano
    } else if (id === 'phone') {
      // Si el campo es 'phone', agregamos el código del país seleccionado si no está incluido
      const phoneNumber = `${text}`;
      updatedFormLogin[id] = phoneNumber; // Actualizamos el teléfono con el código del país
    } else {
      updatedFormLogin[id] = text; // Actualizamos los otros campos con el texto proporcionado
    }

    setFormProfile(updatedFormLogin);
  };

  const handleOptionPress = (field: any, value: any) => {
    setFormProfile(prevState => ({
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

  const validateEmail = (email: any): boolean => {
    const correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const correoValido = correoRegex.test(email);
    console.log(correoValido ? 'Correo válido' : 'Correo inválido');
    return correoValido;
  };

  const validatePassword = (password: any, repassword: any): boolean => {
    const contrasenaRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // Example regex: at least one number, one lowercase and one uppercase letter, at least 8 characters
    const contrasenaValido =
      contrasenaRegex.test(password) && password === repassword;
    console.log(contrasenaValido ? 'Pass válido' : 'Pass inválido');
    console.log('Password:', password);
    console.log('Repassword:', repassword);
    return contrasenaValido;
  };

  const ValidateForm = async () => {
    const isEmailValid = validateEmail(formProfile.email);
    const isPasswordValid = validatePassword(
      formProfile.password,
      formProfile.repassword,
    );

    // Si ambas validaciones son verdaderas, no hay errores
    if (isEmailValid && isPasswordValid) {
      //navigation.navigate('ProfileCreate')
      console.log('TODO BIEN');
      console.log(formProfile);
      //RegisterUser(name, last_name, phone, birthdate, email, password)
      const Create = CreateUser(
        formProfile.name,
        formProfile.last_name,
        formProfile.phone,
        formProfile.email,
        formProfile.password,
        formProfile.checkone,
        formProfile.checktwo,
      );
      if ((await Create) === true) {
        const Login = LoginUser(
          formProfile.email,
          formProfile.password,
          formProfile.latitude,
          formProfile.longitude,
        );
        if ((await Login) === true) {
          //navigation.navigate('ProfileCreate')
          //login()
          navigation.navigate('ProfileCreate');
        } else {
          setErrorEmail(true);
        }
        //login()
      } else {
        setErrorEmail(true);
      }
    } else {
      // Manejar el caso cuando hay errores en la validación
      // Por ejemplo, mostrar mensajes de error al usuario o deshabilitar el botón de envío
      setErrorEmail(!isEmailValid);
      setErrorPass(!isPasswordValid);
    }
  };

  const OtpSendPhone = async () => {
    console.log(formProfile.phone);
    console.log(formProfile.codeCountry);
    const Status = OtpSend(formProfile.phone, formProfile.codeCountry);
    if ((await Status) === true) {
      handleContinue();
    } else {
      setErrorPhone(true);
    }
  };

  const OtpSendReceive = async () => {
    const Status = OtpReceive(formProfile.phone, formProfile.code, formProfile.codeCountry);
    //if ((await Status) === true) {
      handleContinue();
    //}
  };

  const hasValidDigit = code.some(
    value => !isNaN(parseFloat(value)) && isFinite(value),
  );

  const renderContent = () => {
    switch (stage) {
      case 1:
        return (
          <>
            <Header onPress={() => navigation.navigate('Welcome')} />

            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{flex: 1}}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 20} // Ajusta el offset según sea necesario
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}>
                <Text
                  style={[fonts.H3, {marginVertical: 20, color: theme.text}]}>
                  What's your number?
                </Text>
                <Text style={[fonts.B4, {marginBottom: 24, color: theme.text}]}>
                  We use phone numbers to make sure everyone on The List is
                  real. You’ll receive a text with a confirmation code.
                </Text>
                <SelectComponent
                  options={dummyOptions}
                  onSelect={handleOptionSelect}
                  selectedOption={
                    selectedCountry
                      ? selectedCountry?.label
                      : 'Select a country'
                  }
                  textOption={'Select a country'}
                />
                <TextInput
                  //style={[styles.button, disableBtn1 && styles.disabledButton]}

                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.placeholder,
                      color: theme.text,
                    },
                    formProfile.phone !== ''
                      ? styles.codeInputWithDigit
                      : styles.codeInputWithoutDigit,
                    errorPhone && {borderColor: 'red', borderWidth: 1},
                  ]}
                  placeholder="Phone number"
                  placeholderTextColor={theme.tertiary}
                  value={formProfile.phone}
                  onChangeText={text => handleChangeLogin('phone', text)}
                  keyboardType="phone-pad"
                />
                {errorPhone && (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 8,
                      marginTop: -8,
                    }}>
                    <View style={{justifyContent: 'flex-start', marginTop: -8}}>
                      <Closered />
                    </View>
                    <View style={{marginLeft: 4}}>
                      <Text style={styles.errorText}>
                        This number already belongs to an associated account.
                      </Text>
                    </View>
                  </View>
                )}
                <Text style={[{color: colors.neutral.dark}]}>
                  We never share this with anyone and it won't be in your
                  profile. Message and data rates may apply.
                </Text>

                <TouchableOpacity
                  style={[styles.button, disableBtn1 && styles.disabledButton]}
                  onPress={() => {
                    OtpSendPhone();
                  }}
                  disabled={disableBtn1}>
                  <Text
                    style={[
                      fonts.Btn,
                      {
                        color: disableBtn1
                          ? colors.neutral.darkest
                          : colors.neutral.white,
                      },
                    ]}>
                    Continue
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </KeyboardAvoidingView>
          </>
        );
      case 2:
        return (
          <>
            <Header onPress={() => handleCBack()} />
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{flex: 1}}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 20} // Ajusta el offset según sea necesario
            >
              <ScrollView
                showsVerticalScrollIndicator={false} // Oculta la barra de desplazamiento vertical
                showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento horizontal, si es necesario
              >
                <Text
                  style={[fonts.H3, {marginVertical: 20, color: theme.text}]}>
                  Enter your verification code
                </Text>
                <Text style={[fonts.B1, {marginBottom: 24, color: theme.text}]}>
                  We send a message to{' '}
                  <Text style={{fontWeight: '600', color: theme.text}}>
                    {formProfile.codeCountry}{' '}
                    {maskPhoneNumber(formProfile.phone)}
                  </Text>
                </Text>
                <View style={styles.codeContainer}>
                  {code.map((digit, index) => (
                    <TextInput
                      key={index}
                      ref={refs[index]}
                      style={[
                        styles.codeInput,
                        {
                          borderColor: theme.primary,
                          backgroundColor: theme.placeholder,
                          color: theme.text,
                        },
                        disableBtn2
                          ? styles.codeInputWithDigit
                          : {borderColor: colors.successful.medium},
                      ]}
                      maxLength={1}
                      placeholder=""
                      placeholderTextColor={theme.textDisable}
                      value={digit}
                      onChangeText={text => handleChange(text, index)}
                      keyboardType="numeric"
                    />
                  ))}
                </View>

                <View style={{alignItems: 'center'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <Text style={[fonts.B1, {color: theme.text}]}>
                      Didn't receive the message?
                    </Text>
                    <TouchableOpacity
                      style={{marginLeft: 4}}
                      onPress={() => {
                        OtpSendPhone();
                      }}>
                      <Text style={[fonts.Btn, {color: colors.primary.medium}]}>
                        {' '}
                        Send again
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>

              <TouchableOpacity
                style={[styles.button, disableBtn2 && styles.disabledButton]}
                onPress={() => OtpSendReceive()}
                disabled={disableBtn2}>
                <Text
                  style={[
                    fonts.Btn,
                    {
                      color: disableBtn2
                        ? colors.neutral.darkest
                        : colors.neutral.white,
                    },
                  ]}>
                  Continue
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </>
        );
      case 3:
        return (
          <>
            <Header onPress={() => handleCBack()} />
            <Text style={[fonts.H3, {marginVertical: 20, color: theme.text}]}>
              Complete your profile
            </Text>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{flex: 1}}>
              <ScrollView
                showsVerticalScrollIndicator={false} // Oculta la barra de desplazamiento vertical
                showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento horizontal, si es necesario
              >
                <View>
                  <Text style={{marginBottom: 10, color: theme.text}}>
                    Name
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: theme.placeholder,
                        color: theme.text,
                      },
                      formProfile.name !== ''
                        ? styles.codeInputWithDigit
                        : styles.codeInputWithoutDigit,
                    ]}
                    placeholder="Enter your name"
                    placeholderTextColor={theme.textDisable}
                    value={formProfile.name}
                    onChangeText={text => handleChangeLogin('name', text)}
                  />
                </View>

                <View>
                  <Text style={{marginBottom: 10, color: theme.text}}>
                    Last name
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: theme.placeholder,
                        color: theme.text,
                      },
                      formProfile.last_name !== ''
                        ? styles.codeInputWithDigit
                        : styles.codeInputWithoutDigit,
                    ]}
                    placeholder="Enter your last name"
                    placeholderTextColor={theme.textDisable}
                    value={formProfile.last_name}
                    onChangeText={text => handleChangeLogin('last_name', text)}
                  />
                </View>

                <View>
                  <Text style={{marginBottom: 10, color: theme.text}}>
                    Email
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: theme.placeholder,
                        color: theme.text,
                      },
                      formProfile.email !== ''
                        ? styles.codeInputWithDigit
                        : styles.codeInputWithoutDigit,
                      errorEmail && {borderColor: 'red'},
                    ]}
                    placeholder="Enter your email"
                    placeholderTextColor={theme.textDisable}
                    value={formProfile.email}
                    onChangeText={text => handleChangeLogin('email', text)}
                  />
                </View>
                {errorEmail && (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 8,
                      marginTop: -8,
                    }}>
                    <View style={{justifyContent: 'flex-start', marginTop: -8}}>
                      <Closered />
                    </View>
                    <View style={{marginLeft: 4}}>
                      <Text style={styles.errorText}>
                        Invalid email format or This email has already been used
                        previously
                      </Text>
                    </View>
                  </View>
                )}

                <View style={{position: 'relative'}}>
                  <Text style={{marginBottom: 10, color: theme.text}}>
                    Password
                  </Text>
                  <View style={{position: 'relative'}}>
                    <TextInput
                      style={[
                        styles.input,
                        {
                          backgroundColor: theme.placeholder,
                          color: theme.text,
                        },
                        formProfile.password !== ''
                          ? styles.codeInputWithDigit
                          : styles.codeInputWithoutDigit,
                        errorPass && {borderColor: 'red'},
                      ]}
                      placeholder="Enter your password"
                      placeholderTextColor={theme.textDisable}
                      value={formProfile.password}
                      onChangeText={text => handleChangeLogin('password', text)}
                      secureTextEntry={true} // Establecer secureTextEntry en true para ocultar los caracteres de la contraseña
                    />
                    {contrasenaRegexPass.test(formProfile.repassword) &&
                      formProfile.repassword === formProfile.password && (
                        <View
                          style={{position: 'absolute', right: 10, top: '20%'}}>
                          <Checkpass />
                        </View>
                      )}
                  </View>
                </View>

                <View style={{position: 'relative'}}>
                  <Text style={{marginBottom: 10, color: theme.text}}>
                    Confirm your password
                  </Text>

                  <View style={{position: 'relative'}}>
                    <TextInput
                      style={[
                        styles.input,
                        {
                          backgroundColor: theme.placeholder,
                          color: theme.text,
                        },
                        formProfile.repassword !== ''
                          ? styles.codeInputWithDigit
                          : styles.codeInputWithoutDigit,
                        errorPass && {borderColor: 'red'},
                      ]}
                      placeholder="Confirm your password"
                      placeholderTextColor={theme.textDisable}
                      value={formProfile.repassword}
                      onChangeText={text =>
                        handleChangeLogin('repassword', text)
                      }
                      secureTextEntry={true} // Establecer secureTextEntry en true para ocultar los caracteres de la contraseña
                    />
                    {contrasenaRegexPass.test(formProfile.repassword) &&
                      formProfile.repassword === formProfile.password && (
                        <View
                          style={{position: 'absolute', right: 10, top: '20%'}}>
                          <Checkpass />
                        </View>
                      )}
                  </View>
                </View>

                {errorPass && (
                  <View style={{flexDirection: 'row', marginLeft: 8}}>
                    <View style={{justifyContent: 'flex-start', marginTop: -8}}>
                      <Closered />
                    </View>
                    <View style={{marginLeft: 4}}>
                      <Text style={styles.errorText}>Password no valid.</Text>
                      <Text style={styles.errorText}>
                        Add 1 uppercase alphabet and 1 number or the passwords.
                      </Text>
                    </View>
                  </View>
                )}

                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={handleToggleCheckOne}>
                  <View
                    style={[
                      styles.checkbox,
                      formProfile.checkone && styles.checked,
                    ]}>
                    {formProfile.checkone && <Checked color={colors.neutral.white}/>}
                  </View>
                  <Text style={[styles.checkboxText, {color: theme.text}]}>
                    If you do not wish to receive marketing communications about
                    our products and services, check this box.
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={handleToggleCheckTwo}>
                  <View
                    style={[
                      styles.checkbox,
                      formProfile.checktwo && styles.checked,
                    ]}>
                    {formProfile.checktwo && <Checked color={colors.neutral.white}/>}
                  </View>
                  <Text style={[styles.checkboxText, {color: theme.text}]}>
                    I agree to the{' '}
                    <Text
                      style={{
                        color: colors.primary.medium,
                        fontWeight: '600',
                        textDecorationLine: 'underline',
                      }}>
                      Terms of Use
                    </Text>{' '}
                    and to join{' '}
                    <Text
                      style={{
                        color: colors.primary.medium,
                        fontWeight: '600',
                        textDecorationLine: 'underline',
                      }}>
                      The List Membership
                    </Text>
                    .
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </KeyboardAvoidingView>
          </>
        );
      // Agrega más casos según sea necesario para otras etapas del proceso de registro
      default:
        return null;
    }
  };

  const handleContinue = () => {
    // Aquí puedes manejar la lógica para avanzar al siguiente paso del registro
    setStage(stage + 1); // Avanza a la siguiente etapa
  };

  const handleCBack = () => {
    // Aquí puedes manejar la lógica para avanzar al siguiente paso del registro
    setStage(stage - 1); // Avanza a la siguiente etapa
  };

  // SVG para el icono de marca de verificación
  const checkedSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path d="M0 0h24v24H0z" fill="none"/>
  <path fill="#000000" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
</svg>
`;

  // SVG para el icono de marca de verificación desactivada
  const uncheckedSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path d="M0 0h24v24H0z" fill="none"/>
  <path fill="#000000" d="M21 6H3V4h18v2zm0 4H3v-2h18v2zm0 6H3v-2h18v2z"/>
</svg>
`;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.background,paddingHorizontal:0}}>
      <View style={styles.container}>{renderContent()}</View>

      {stage === 3 && ( // Muestra el botón "Continue" solo en la primera etapa del proceso
        
        <View style={[styles.bannerContainer,{backgroundColor:theme.background}]}>
                 <TouchableOpacity
                   style={[
                     styles.button,
                     disableBtn3 && {backgroundColor: theme.disable},
                   ]}
                   onPress={() => ValidateForm()}
                   disabled={disableBtn3}>
                   <Text
                     style={[
                       fonts.Btn,
                       {color: disableBtn3 ? theme.textDisable : colors.neutral.white},
                     ]}>
                     Create my profile
                   </Text>
                 </TouchableOpacity>
               </View>
        
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    fontSize: 14,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 24,
  },
  input2: {
    fontSize: 14,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 10,
    color: colors.neutral.darkest,
  },
  button: {
    backgroundColor: colors.primary.medium,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 16,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  codeInput: {
    borderWidth: 1,
    fontSize: 20,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '15%',
    textAlign: 'center',
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor:"#515151",
    borderRadius: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: colors.primary.medium,
    borderColor: colors.primary.medium,
  },
  checkboxText: {
    fontSize: 14,
    maxWidth: '80%',
  },
  disabledButton: {
    opacity: 0.5, // Opacidad reducida cuando el botón está deshabilitado
    backgroundColor: colors.neutral.medium,
  },
  errorText: {
    color: 'red',
    marginTop: -8,
    marginBottom: 10,
  },
  codeInputWithDigit: {
    borderColor: colors.neutral.dark,
  },
  codeInputWithoutDigit: {
    borderColor: colors.neutral.medium,
  },
  bannerContainer: {
    paddingTop: 16,
    paddingBottom: 0,
    paddingHorizontal: 16,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    ...Platform.select({
      ios: {
        borderTopWidth: 2,
        borderRightWidth: .3,
        borderLeftWidth: .3, 
        borderBottomWidth: 0, 
        
        borderTopColor: 'rgba(0,0,0,0.1)',  
        margin: 1,
        padding: 1, 
      },
      android: {
        elevation: 5, // Solo en Android
      },
    }),
  },
});
 