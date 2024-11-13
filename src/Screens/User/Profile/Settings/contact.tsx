import {
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
import {useClipboard} from '@react-native-clipboard/clipboard';
import {
  ArrowLeft,
  Close,
  Change,
  Subsdel,
  Mailpri,
  Phonepri,
  Copy,
} from '../../../../Assets/svg';
import {useNavigation} from '@react-navigation/native';
import HeaderUser from '../../../../Components/HeaderUser';
import fonts from '../../../../Utils/fonts';
import Juan from '../../../../Assets/img/juan.png';
import CircularProgress from '../../../../Components/CircularProgress';
import {ThemeContext} from '../../../../Components/themeContext';
import {ContactUs} from '../../../../Services/Legals/LegalServices';

export default function CardType() {
  const {theme} = useContext(ThemeContext);

  const [showEndMessage, setShowEndMessage] = useState(false);

  const [cancelMatchVisible, setCancelMatchVisible] = useState(false);

  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);

  const [clipboardContent, setClipboardContent] = useClipboard();

  const [formProfile, setFormProfile] = useState({
    phone: '',
    code: '',
    name: '',
    email: '',
    password: '',
    repassword: '',
    checkone: '',
    checktwo: '',
    description: '',
  });

  const disableBtn1 = formProfile.description.trim() === '';

  const handleOptionPress = (field: any, value: any) => {
    setFormProfile(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const ContactUS = async () => {
    try {
      const data = await ContactUs(formProfile.description);
      if (data) {
        setCancelMatchVisible(true)
        console.log('Correcto');
        setFormProfile(prevState => ({...prevState, description: ''}));

      } else {
        console.error('Error');
      }
    } catch (error) {
      console.error('Error');
    }
  };
 

  //const disableBtn5 = formProfile.persons.trim() === '';
 

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
      <Text style={[styles.modalTitle, fonts.S1]}>
        We have received your message and we will contact you soon to help you.
      </Text>
      <View style={styles.horizontalButtonContainer}>
        
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => {
            onClose();
            navigation.goBack()
          }}>
          <Text style={[styles.buttonText, fonts.Btn]}>Done</Text>
        </TouchableOpacity>
      </View>
    </GenericModal>
  );

  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <SafeAreaView />
      <HeaderUser
        text="Contact"
        svg={<ArrowLeft color={theme.text} />}
        onPress={() => navigation.goBack()}
      />

      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 24,
          paddingTop: 20,
          paddingBottom: 0,
        }}>
        <Text style={[fonts.B1, {marginBottom: '6%', color: theme.text}]}>
          If you want more information or need to solve a problem with the app.
          Contact us through these channels:
        </Text>

        <View style={{flexDirection: 'column'}}>
          {/* Bloque de correo */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 8,
            }}>
            <Mailpri />
            <Text
              style={[
                fonts.B1,
                {marginLeft: 10, color: colors.primary.medium},
              ]}>
              contact@thelist.com
            </Text>
            <TouchableOpacity
              style={{marginLeft: 'auto', padding: 10}}
              onPress={() => {
                setClipboardContent('contact@thelist.com');
              }}>
              <Copy color={theme.text} />
            </TouchableOpacity>
          </View>

          {/* Bloque de teléfono */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: '6%',
            }}>
            <Phonepri />
            <Text
              style={[
                fonts.B1,
                {marginLeft: 10, color: colors.primary.medium},
              ]}>
              +1 234-4567-235
            </Text>
            <TouchableOpacity
              style={{marginLeft: 'auto', padding: 10}}
              onPress={() => {
                setClipboardContent('+1 234-4567-235');
              }}>
              <Copy color={theme.text} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={[fonts.B1, {marginBottom: 8, color: theme.text}]}>
          Or describe how we can help you?
        </Text>
        <TextInput
          style={[
            styles.input2,
            formProfile.description !== ''
              ? styles.codeInputWithDigit
              : styles.codeInputWithoutDigit,
            {
              backgroundColor: theme.placeholder,
              color: theme.text,
              borderColor: theme.disable,
            },
          ]}
          placeholder="write here"
          placeholderTextColor={theme.textDisable}
          multiline
          value={formProfile.description}
          onChangeText={text => handleOptionPress('description', text)}
        />
      </ScrollView>
      <View
        style={[
          styles.bannerContainer,
          {backgroundColor: theme.background, paddingHorizontal: 0},
        ]}>
        <TouchableOpacity
          style={[
            styles.button,
            disableBtn1 && {backgroundColor: theme.disable},
          ]}
          onPress={() => ContactUS()}
          disabled={disableBtn1}>
          <Text
            style={[
              fonts.Btn,
              {color: disableBtn1 ? theme.textDisable : colors.neutral.white},
            ]}>
            Contact us
          </Text>
        </TouchableOpacity>
      </View>
      <CancelMatchModal
        visible={cancelMatchVisible}
        onClose={() => setCancelMatchVisible(false)}
      />
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    width:"100%",
    backgroundColor: colors.primary.medium,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginHorizontal: 5,
    alignItems:"center",
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
    alignItems: 'center',
    marginTop: 'auto',
    bottom: 16,
    marginHorizontal: 16,
  },

  //

  input: {
    borderWidth: 1,

    fontSize: 14,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.neutral.lighest,
    marginBottom: 24,
  },
  input2: {
    fontSize: 14,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 24,
    minHeight: 140,
    borderWidth: 1,
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
    marginBottom: 16,
    marginHorizontal: 32,
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
    paddingTop: 30,
    paddingBottom: 10,
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
        elevation: 5, // Solo en Android
      },
    }),
  },
});
