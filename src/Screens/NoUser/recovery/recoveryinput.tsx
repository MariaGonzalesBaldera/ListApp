import React, {useContext, useRef, useState} from 'react';
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
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {correoRegex, contrasenaRegex} from '../../../Utils/regex';

import Header from '../../../Components/Header';
import fonts from '../../../Utils/fonts';
import colors from '../../../Utils/colors';
import {Checked, Checkpass, Closered, Password} from '../../../Assets/svg';
import SelectComponent from '../../../Components/select';
import {ThemeContext} from '../../../Components/themeContext';
import {
  ChangePasswordUserEmail,
  ChangePasswordUserNumber,
} from '../../../Services/User/UserServices';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export default function Register({route}: any) {
  // Accede al parámetro 'type'
  const {type} = route.params;
  const navigation = useNavigation();
  const [stage, setStage] = useState(1); // Estado para controlar la etapa del proceso de registro

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [errorSelect, setErrorSelect] = useState(false);

  const [cancelModalInfo, setCancelModalInfo] = useState(false);
  const [messageModal, setMessageModal] = useState(
    'Change password successful',
  );

  const {theme, isDarkMode} = useContext(ThemeContext);

  const [code, setCode] = useState(['', '', '', '', '', '']); // Arreglo para almacenar el código
  const [selectedCountry, setSelectedCountry] = useState(null); // Estado para el país seleccionado

  const dummyOptions = [
    {label: 'Peru (+51)', value: '+51'},
    {label: 'United States (+1)', value: '+1'},
    {label: 'United Kingdom (+44)', value: '+44'},
    {label: 'Colombia (+57)', value: '+57'}, // Añadido Colombia
  ];

  // Función para manejar la selección de opciones
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

  const handleChange = (text: any, index: any) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < refs.length - 1) {
      refs[index + 1].current.focus();
    }

    console.log(code);
    console.log(code.length);
  };

  const contrasenaRegexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const GenericModal = ({visible, onClose, children}: any) => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[styles.modalBackground2]}>
          <View
            style={[
              styles.modalView2,
              {backgroundColor: theme.backgroundChat},
            ]}>
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  const InfoModal = ({visible, onClose}: any) => (
    <GenericModal visible={visible} onClose={onClose}>
      <Text
        style={[
          styles.modalTitle,
          fonts.H4,
          {marginTop: 12, color: theme.text},
        ]}>
        {messageModal}
      </Text>
      <View style={styles.horizontalButtonContainer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => {
            onClose;
            navigation.navigate('Login');
          }}>
          <Text style={[fonts.Btn, {color: colors.neutral.white}]}>Ok</Text>
        </TouchableOpacity>
      </View>
    </GenericModal>
  );

  const [formProfile, setFormProfile] = useState({
    phone: '',
    code: '',
    codeCountry: '',
    name: '',
    email: '',
    password: '',
    repassword: '',
    checkone: '',
    checktwo: '',
  });

  // Verifica si ambos campos están vacíos
  const disableBtn1 =
    formProfile.phone.trim() === '' && formProfile.email.trim() === '';
  const disableBtn2 = !code.every(
    value => !isNaN(parseFloat(value)) && isFinite(value),
  );
  const disableBtn3 = !(formProfile.password && formProfile.repassword);
  const handleChangeLogin = (id: string, text: string) => {
    // Creamos una copia del estado actual del formulario
    const updatedFormLogin = {...formProfile};

    // Si el campo identificado por 'id' es 'checkone' o 'checktwo', actualizamos su valor a true o false según 'text'
    if (id === 'checkone') {
      updatedFormLogin[id] = text === 'true';
    } else if (id === 'checktwo') {
      updatedFormLogin[id] = text === 'true';
    } else {
      // Para otros campos, simplemente actualizamos su valor con 'text'
      updatedFormLogin[id] = text;
    }

    // Actualizamos el estado del formulario con los nuevos valores
    setFormProfile(updatedFormLogin);
  };

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
  const fetchChangePassword = async (email: any, password: any) => {
    try {
      const data = await ChangePasswordUserEmail(email, password);
      console.log(data);
      if (data == 'Success') {
        setMessageModal('Change password successful');
      } else if (data == 'User not found') {
        setMessageModal('User not found');
      } else {
        setMessageModal('Error changing password');
      }
      setCancelModalInfo(true);
    } catch (error) {
      console.error('Error fetching status change:', error);
    }
  };
  const fetchChangePasswordNumber = async (phone: any, password: any) => {
    try {
      const data = await ChangePasswordUserNumber(
        formProfile.codeCountry + phone,
        password,
      );
      console.log(data);
      if (data == 'Success') {
        setMessageModal('Change password successful');
      } else if (data == 'User not found') {
        setMessageModal('User not found');
      } else {
        setMessageModal('Error changing password');
      }
      setCancelModalInfo(true);
    } catch (error) {
      console.error('Error fetching status change:', error);
    }
  };
  const [errorPassConfirm, setErrorPassConfirm] = useState(false);

  const ValidateForm = () => {
    if (type == 'mail') {
      const isEmailValid = validateEmail(formProfile.email);
      
      const isPasswordValid = contrasenaRegexPass.test(formProfile.password); 
      const doPasswordsMatch = formProfile.password === formProfile.repassword;
      
      if(!isPasswordValid){
        setErrorPass(true);
      } else {
        setErrorPass(false);
      }
      if (!doPasswordsMatch) {
        setErrorPassConfirm(true);
      } else {
        setErrorPassConfirm(false);
      }

      if (isEmailValid && isPasswordValid && doPasswordsMatch) {
        fetchChangePassword(formProfile.email, formProfile.password);
      } 
    } else {
      const isPasswordValid = validatePassword(
        formProfile.password,
        formProfile.repassword,
      );
      if (isPasswordValid) {
        fetchChangePasswordNumber(formProfile.phone, formProfile.password);
      } else {
        setErrorPass(!isPasswordValid);
      }
    }
  };
  const ValidateFormRecoveryPassword = () => {
    if (type == 'mail') {
      const isEmailValid = validateEmail(formProfile.email);
      if (isEmailValid) {
        setStage(stage + 1);
        setErrorEmail(false);
      } else {
        setErrorEmail(!isEmailValid);
      }
    } else {
      if (formProfile.codeCountry == '') {
        setErrorSelect(true);
      } else {
        setStage(stage + 1);
        setErrorSelect(false);
      }
    }
  };
  const hasValidDigit = code.some(
    value => !isNaN(parseFloat(value)) && isFinite(value),
  );

  const renderContent = () => {
    switch (stage) {
      case 1:
        return (
          <>
            <Header onPress={() => navigation.goBack()} />

            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{flex: 1}}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 20} // Ajusta el offset según sea necesario
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}>
                {type === 'phone' && (
                  <>
                    <Text
                      style={[
                        fonts.H3,
                        {marginVertical: 20, color: theme.text},
                      ]}>
                      Recover your password
                    </Text>
                    <Text
                      style={[fonts.B4, {marginBottom: 24, color: theme.text}]}>
                      What’s your number?.
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
                    {errorSelect && (
                      <View style={{flexDirection: 'row', marginLeft: 16}}>
                        <View style={{marginLeft: 4}}>
                          <Text style={styles.errorText}>Select a code</Text>
                        </View>
                      </View>
                    )}
                    <TextInput
                      style={[
                        styles.input2,
                        {
                          backgroundColor: theme.placeholder,
                          color: theme.text,
                        },
                        formProfile.phone
                          ? {
                              borderWidth: 1,
                              borderColor: colors.neutral.darkest,
                            }
                          : null,
                      ]}
                      placeholder="Phone number"
                      placeholderTextColor={theme.tertiary}
                      value={formProfile.phone}
                      onChangeText={text => handleChangeLogin('phone', text)}
                      keyboardType="phone-pad"
                    />
                  </>
                )}
                {type === 'mail' && (
                  <>
                    <Text
                      style={[
                        fonts.H3,
                        {marginVertical: 20, color: theme.text},
                      ]}>
                      Recover your password
                    </Text>
                    <Text
                      style={[fonts.B4, {marginBottom: 24, color: theme.text}]}>
                      Write an email we will send you a code.
                    </Text>

                    <View>
                      <TextInput
                        style={[
                          styles.input,
                          formProfile.email !== ''
                            ? styles.codeInputWithDigit
                            : styles.codeInputWithoutDigit,
                          {
                            backgroundColor: theme.placeholder,
                            color: theme.text,
                          },
                        ]}
                        placeholder="Email"
                        placeholderTextColor={theme.tertiary}
                        value={formProfile.email}
                        onChangeText={text => handleChangeLogin('email', text)}
                      />
                    </View>
                    {errorEmail && (
                      <View style={{flexDirection: 'row', marginLeft: 16}}>
                        <View
                          style={{justifyContent: 'flex-start', marginTop: -8}}>
                          <Closered />
                        </View>
                        <View style={{marginLeft: 4}}>
                          <Text style={styles.errorText}>
                            Invalid email format.
                          </Text>
                        </View>
                      </View>
                    )}
                    <Text style={[fonts.CYB, {color: colors.neutral.dark}]}>
                      We never share this with anyone and it won't be in your
                      profile. Message and data rates may apply.
                    </Text>
                  </>
                )}

                <TouchableOpacity
                  style={[
                    styles.button,
                    disableBtn1 && styles.disabledButton,
                    {
                      backgroundColor: disableBtn1
                        ? theme.disable
                        : colors.primary.medium,
                    },
                  ]}
                  onPress={ValidateFormRecoveryPassword}
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
                {type === 'phone' && (
                  <>
                    <Text
                      style={[fonts.B1, {marginBottom: 24, color: theme.text}]}>
                      We send a message to{' '}
                      <Text style={{fontWeight: '600'}}>+1 *******{formProfile.phone.slice(-3)}</Text>
                    </Text>
                  </>
                )}
                {type === 'email' && (
                  <>
                    <Text
                      style={[fonts.B1, {marginBottom: 24, color: theme.text}]}>
                      We send an email to{' '}
                      <Text style={{fontWeight: '600'}}>
                        {formProfile.email.slice(3)}{"*******"} 
                      </Text>
                    </Text>
                  </>
                )}
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
                      placeholderTextColor={theme.tertiary}
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
                        /* Acción del botón */
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
                style={[
                  styles.button,
                  disableBtn2 && styles.disabledButton,
                  {
                    backgroundColor: disableBtn2
                      ? theme.disable
                      : colors.primary.medium,
                  },
                ]}
                onPress={handleContinue}
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
              Enter with a New Password
            </Text>
            <Text style={[fonts.B1, {color: theme.text, marginBottom: 20}]}>
              Enter a new password that is easy for you to remember
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
                    Password
                  </Text>
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
                    ]}
                    placeholder="Enter your password"
                    placeholderTextColor={theme.tertiary}
                    value={formProfile.password}
                    onChangeText={text => handleChangeLogin('password', text)}
                    secureTextEntry={true} // Establecer secureTextEntry en true para ocultar los caracteres de la contraseña
                  />
                  {contrasenaRegexPass.test(formProfile.password) &&
                    formProfile.repassword === formProfile.password && (
                      <View
                        style={{position: 'absolute', right: 10, top: '40%'}}>
                        <Checkpass />
                      </View>
                    )}
                </View>
                {errorPassConfirm && (
            <View style={{flexDirection: 'row', marginLeft: 8}}>
              <View style={{justifyContent: 'flex-start', marginTop: -8}}>
                <Closered />
              </View>
              <View style={{marginLeft: 4}}>
                <Text style={styles.errorText}>Passwords is not similar</Text>
              </View>
            </View>
          )}
                <View>
                  <Text style={{marginBottom: 10, color: theme.text}}>
                    Confirm your password
                  </Text>
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
                    ]}
                    placeholder="Confirm your password"
                    placeholderTextColor={theme.tertiary}
                    value={formProfile.repassword}
                    onChangeText={text => handleChangeLogin('repassword', text)}
                    secureTextEntry={true} // Establecer secureTextEntry en true para ocultar los caracteres de la contraseña
                  />
                  {contrasenaRegexPass.test(formProfile.repassword) &&
                    formProfile.repassword === formProfile.password && (
                      <View
                        style={{position: 'absolute', right: 10, top: '40%'}}>
                        <Checkpass />
                      </View>
                    )}
                </View>

                {errorPass && (
                  <View style={{flexDirection: 'row', marginLeft: 16}}>
                    <View style={{justifyContent: 'flex-start', marginTop: -8}}>
                      <Closered />
                    </View>
                    <View style={{marginLeft: 4}}>
                      <Text style={styles.errorText}>Password no valid.</Text>
                      <Text style={styles.errorText}>
                        Add 1 uppercase alphabet and 1 number.
                      </Text>
                    </View>
                  </View>
                )}
                <InfoModal
                  visible={cancelModalInfo}
                  onClose={() => setCancelModalInfo(false)}
                />
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
    <SafeAreaView style={{flex: 1, backgroundColor: theme.background}}>
      <View style={styles.container}>
        {renderContent()}

        {stage === 3 && ( // Muestra el botón "Continue" solo en la primera etapa del proceso
          <View
            style={[
              styles.bannerContainer,
              {backgroundColor: theme.background},
            ]}>
            <TouchableOpacity
              style={[
                styles.button,
                disableBtn3 && styles.disabledButton,
                {
                  backgroundColor: disableBtn3
                    ? theme.disable
                    : colors.primary.medium,
                },
              ]}
              onPress={() => ValidateForm()}
              disabled={disableBtn3}>
              <Text
                style={[
                  fonts.Btn,
                  {
                    color: disableBtn3
                      ? colors.neutral.darkest
                      : colors.neutral.white,
                  },
                ]}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
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
  },
  button: {
    // backgroundColor: colors.primary.medium,
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
    color: colors.neutral.dark,
    maxWidth: '80%',
  },
  disabledButton: {
    opacity: 0.5, // Opacidad reducida cuando el botón está deshabilitado
    // backgroundColor: colors.neutral.darkest,
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
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  modalBackground2: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView2: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,

    width: '80%',
    position: 'relative',
  },
  horizontalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  confirmButton: {
    backgroundColor: colors.primary.medium,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});
