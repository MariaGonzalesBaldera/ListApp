import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import colors from '../../../../Utils/colors';
import {ArrowLeft, Close, Closered} from '../../../../Assets/svg';
import {useNavigation} from '@react-navigation/native';
import HeaderUser from '../../../../Components/HeaderUser';
import fonts from '../../../../Utils/fonts';
import {ThemeContext} from '../../../../Components/themeContext';
import {PaymentRequest} from '@rnw-community/react-native-payments';
import {
  PaymentMethodNameEnum,
  SupportedNetworkEnum,
  EnvironmentEnum,
} from '@rnw-community/react-native-payments';

export default function CardType() {
  const {theme} = useContext(ThemeContext);
  const gatewayMerchantId = 'BCR2DN4T2OSI3BBP';
  const paymentDetails = {
    total: {
      amount: {
        currency: 'USD',
        value: '14.95',
      },
    },
  };
 
  const methodData = [
    // AndroidPay
    {
      supportedMethods: PaymentMethodNameEnum.AndroidPay,
      data: {
        merchantInfo: {
        merchantName: "Example Merchant",
      },
        supportedNetworks: [
          SupportedNetworkEnum.Visa,
          SupportedNetworkEnum.Mastercard,
        ],
        environment: EnvironmentEnum.TEST,
        countryCode: 'DE',
        currencyCode: 'EUR',
        requestBilling: true,
        requestEmail: true,
        requestShipping: false,
        gatewayConfig: {
          
          gateway: 'example',
          gatewayMerchantId: 'BCR2DN4T2OSI3BBP',
        },
      },
    },
  ];
  const paymentRequest = new PaymentRequest(methodData, paymentDetails);

  const handleGooglePay = async () => {
    try {
      paymentRequest.canMakePayment().then(canMakePayment => {
        if (canMakePayment) {
          paymentRequest.show().then(response => {
            console.log('response ', response);
          });
        } else {
          // Google Pay unavailable
          console.log('unavailable');
        }
      });
    } catch (error) {
      console.error('Error en el pago:', error);
    }
  };

  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPass, setErrorPass] = useState(false);

  const [formProfile, setFormProfile] = useState({
    cardNumber: '',
    expitationDate: '',
    cvv: '',
    zipCode: '',
  });

  const disableBtn1 = formProfile.cardNumber.trim() === '';

  const toggleSwitch = () =>
    setIsSwitchEnabled(previousState => !previousState);

  //const disableBtn5 = formProfile.persons.trim() === '';

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
  const isOnlyNumbers = text => {
    const onlyNumbersRegex = /^[0-9]+$/;
    return onlyNumbersRegex.test(text);
  };

  const [errorCard, setErrorCard] = useState(false);
  const [errorDate, setErrorDate] = useState(false);
  const [errorCvv, setErrorCvv] = useState(false);
  const [errorZip, setErrorZip] = useState(false);

  const AddCard = async () => {
    const isCardValid = isOnlyNumbers(formProfile.cardNumber);
    const isCvvValid = isOnlyNumbers(formProfile.cvv);
    const isZipValid = isOnlyNumbers(formProfile.zipCode);
    const isDateValid = formProfile.expitationDate !== '';

    if (!isCardValid) {
      setErrorCard(true);
    } else {
      setErrorCard(false);
    }
    if (!isCvvValid) {
      setErrorCvv(true);
    } else {
      setErrorCvv(false);
    }
    if (!isZipValid) {
      setErrorZip(true);
    } else {
      setErrorZip(false);
    }
    if (!isDateValid) {
      setErrorDate(true);
    } else {
      setErrorDate(false);
    }
    if (isCardValid && isCvvValid && isZipValid && isDateValid) {
      console.log('correct');
    }
  };

  const GenericModal = ({visible, onClose, children}: any) => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground2}>
          <View style={styles.modalView2}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => onClose}>
              <Close />
            </TouchableOpacity>
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  const CancelMatchModal = ({visible, onClose}: any) => (
    <GenericModal visible={visible} onClose={onClose}>
      <Text style={[styles.modalTitle, fonts.H4]}>
        Are you sure you want to pause your account?
      </Text>
      <Text style={[styles.modalTitle, fonts.B1]}>
        Just the people that you have a conversation can see you.
      </Text>
      <View style={styles.horizontalButtonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => {
            toggleSwitch();
            onClose();
          }}>
          <Text style={[styles.buttonText, fonts.Btn]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => {
            toggleSwitch();
            onClose();
          }}>
          <Text style={[styles.buttonText, fonts.Btn]}>Pause</Text>
        </TouchableOpacity>
      </View>
    </GenericModal>
  );

  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <SafeAreaView />
      <HeaderUser
        text="Add new card"
        svg={<ArrowLeft color={theme.text} />}
        onPress={() => navigation.goBack()}
      />

      <ScrollView style={{paddingHorizontal: 24, paddingTop: 20}}>
        <Text style={[fonts.B1, {marginBottom: '6%', color: theme.text}]}>
          Complete the information of your new payment method.
        </Text>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <ScrollView
            style={{marginBottom: 20}}
            showsVerticalScrollIndicator={false} // Oculta la barra de desplazamiento vertical
            showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento horizontal, si es necesario
          >
            <View>
              <Text style={[fonts.B1, {marginBottom: '3%', color: theme.text}]}>
                Card Number
              </Text>
              <TextInput
                style={[
                  styles.input,
                  formProfile.cardNumber !== ''
                    ? {borderColor: theme.text}
                    : {borderColor: theme.textDisable},
                  errorCard && {borderColor: 'red'},
                  {
                    backgroundColor: theme.placeholder,
                    color: theme.text,
                  },
                ]}
                placeholder="Enter your card number"
                placeholderTextColor={theme.textDisable}
                value={formProfile.cardNumber}
                onChangeText={text => handleChangeLogin('cardNumber', text)}
              />
            </View>
            {errorCard && (
              <View style={{flexDirection: 'row', marginLeft: 8}}>
                <View style={{justifyContent: 'flex-start', marginTop: -8}}>
                  <Closered />
                </View>
                <View style={{marginLeft: 4}}>
                  <Text style={styles.errorText}>Number inválid</Text>
                </View>
              </View>
            )}
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{width: '48%'}}>
                <Text
                  style={[fonts.B1, {marginBottom: '3%', color: theme.text}]}>
                  Expiration date
                </Text>
                <TextInput
                  style={[
                    styles.input2,
                    formProfile.expitationDate !== ''
                      ? {borderColor: theme.text}
                      : {borderColor: theme.textDisable},
                    errorDate && {borderColor: 'red'},
                    {
                      backgroundColor: theme.placeholder,
                      color: theme.text,
                    },
                  ]}
                  placeholder="YYYY/MM"
                  placeholderTextColor={theme.textDisable}
                  value={formProfile.expitationDate}
                  onChangeText={text =>
                    handleChangeLogin('expitationDate', text)
                  }
                />
                {errorDate && (
                  <View style={{flexDirection: 'row', marginLeft: 8}}>
                    <View style={{justifyContent: 'flex-start', marginTop: -8}}>
                      <Closered />
                    </View>
                    <View style={{marginLeft: 4}}>
                      <Text style={styles.errorText}>Select date</Text>
                    </View>
                  </View>
                )}
              </View>

              <View style={{width: '48%'}}>
                <Text
                  style={[fonts.B1, {marginBottom: '3%', color: theme.text}]}>
                  CVV
                </Text>
                <TextInput
                  style={[
                    styles.input2,
                    formProfile.cvv !== ''
                      ? {borderColor: theme.text}
                      : {borderColor: theme.textDisable},
                    errorCvv && {borderColor: 'red'},
                    {
                      backgroundColor: theme.placeholder,
                      color: theme.text,
                    },
                  ]}
                  placeholder="CVV"
                  placeholderTextColor={theme.textDisable}
                  value={formProfile.cvv}
                  onChangeText={text => handleChangeLogin('cvv', text)}
                />
                {errorCvv && (
                  <View style={{flexDirection: 'row', marginLeft: 8}}>
                    <View style={{justifyContent: 'flex-start', marginTop: -8}}>
                      <Closered />
                    </View>
                    <View style={{marginLeft: 4}}>
                      <Text style={styles.errorText}>invalid code</Text>
                    </View>
                  </View>
                )}
              </View>
            </View>

            <View>
              <Text style={[fonts.B1, {marginBottom: '3%', color: theme.text}]}>
                Zip code
              </Text>
              <TextInput
                style={[
                  styles.input,
                  formProfile.zipCode !== ''
                    ? {borderColor: theme.text}
                    : {borderColor: theme.textDisable},
                  errorZip && {borderColor: 'red'},
                  {
                    backgroundColor: theme.placeholder,
                    color: theme.text,
                  },
                ]}
                placeholder="Enter code zipe"
                placeholderTextColor={theme.textDisable}
                value={formProfile.zipCode}
                onChangeText={text => handleChangeLogin('zipCode', text)}
              />
            </View>
            {errorZip && (
              <View style={{flexDirection: 'row', marginLeft: 16}}>
                <View style={{justifyContent: 'flex-start', marginTop: -8}}>
                  <Closered />
                </View>
                <View style={{marginLeft: 4}}>
                  <Text style={styles.errorText}>Enter your zip code</Text>
                </View>
              </View>
            )}
            <View>
              <TouchableOpacity
                style={{borderWidth: 1, borderColor: 'blue'}}
                onPress={() => handleGooglePay()}>
                <Text>Pagar con google pay</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ScrollView>

      <View style={styles.bannerContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            disableBtn1 && {
              backgroundColor: theme.disable,
            },
          ]}
          onPress={() => AddCard()}
          disabled={disableBtn1}>
          <Text
            style={[
              fonts.Btn,
              {
                color: disableBtn1 ? theme.textDisable : colors.neutral.white,
              },
            ]}>
            Add card
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chatContent: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {
    color: 'gray',
  },
  metaData: {
    alignItems: 'flex-end',
  },
  time: {
    color: 'gray',
  },
  unreadContainer: {
    backgroundColor: colors.secondary.light,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 10,
    minWidth: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  unreadCount: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.neutral.darkest,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 2,
  },
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginVertical: 6,
  },
  ProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  profileImage: {
    borderRadius: 25,
    marginRight: 10,
  },
  profileImage2: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },

  //

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    shadowColor: colors.neutral.darkest,
  },
  svg: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    color: colors.neutral.darkest,
  },
  container: {
    padding: 16,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',

    padding: 20,
    borderRadius: 20,
  },
  mainText: {
    color: colors.neutral.white,
    marginBottom: 10,
  },
  subtitle: {
    color: colors.neutral.white,
    marginBottom: 20,
    paddingHorizontal: 50,
    textAlign: 'center',
  },
  upgradeButton: {
    backgroundColor: colors.primary.medium,
    paddingVertical: 10,
    paddingHorizontal: 90,
    borderRadius: 20,
  },
  upgradeText: {
    color: colors.neutral.white,
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    height: '100%',
    zIndex: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    transform: [{scale: 0.75}],
  },

  noMessagesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20%',
  },
  largeAvatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardone: {
    color: colors.neutral.white,
  },
  cardtwo: {
    color: colors.neutral.medium,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  roundButton: {
    backgroundColor: colors.neutral.white,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginHorizontal: 5,
  },
  buttonText: {
    color: colors.neutral.white,
  },
  buttonText2: {
    color: colors.neutral.darkest,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    position: 'absolute',
    top: '12%', // Adjust this value to position the modal correctly
    right: '10%', // Adjust this value to position the modal correctly
    backgroundColor: colors.neutral.white,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    elevation: 5,
  },
  modalText: {
    paddingVertical: 10,
    fontSize: 16,
    ...fonts.C2B,
  },
  modalBackground2: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView2: {
    backgroundColor: colors.neutral.white,
    borderRadius: 8,
    padding: 20,
    width: '90%',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  horizontalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  verticalButtonContainer: {
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: colors.neutral.darkest,
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
  optionButton: {
    backgroundColor: colors.neutral.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 5,
    borderWidth: 1.5,
    borderColor: colors.neutral.medium,
    flexDirection: 'row',
    alignItems: 'center',
  },

  optionButton2: {
    backgroundColor: colors.neutral.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 8,
    borderRadius: 20,
    marginVertical: 5,
    borderWidth: 1.5,
    borderColor: colors.neutral.medium,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.primary.medium,
    borderRadius: 20,
    paddingVertical: 12,
    marginBottom: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  //

  input: {
    borderWidth: 1,

    fontSize: 14,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 24,
    color: colors.neutral.darkest,
  },
  input2: {
    borderWidth: 1,
    fontSize: 14,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 24,
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
    backgroundColor: colors.neutral.light,
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
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 0.3,
      },
    }),
  },
});
