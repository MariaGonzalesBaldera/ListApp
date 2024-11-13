import {
  Image,
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
  Switch,
} from 'react-native';
import React, {useContext, useState} from 'react';
import OlderHeader from '../../../../Components/ChatComponents/Headers/OlderHeader';
import colors from '../../../../Utils/colors';
import {
  ArrowLeft,
  Break,
  Close,
  Closered,
  DontLike,
  Engranaje,
  Heart,
  Messaging,
  OtherD,
  PencilProf,
  Verifysm,
} from '../../../../Assets/svg';
import {useNavigation} from '@react-navigation/native';
import HeaderUser from '../../../../Components/HeaderUser';
import fonts from '../../../../Utils/fonts';
import RadioButton from '../../../../Components/RadioButton';
import {ThemeContext} from '../../../../Components/themeContext';

export default function NotificationSettings() {
  const [showEndMessage, setShowEndMessage] = useState(false);

  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);

  const [titleDelete, setTitleDelete] = useState(
    'Are you sure to delete your account?',
  );
  const [subTitleDelete, setSubTitleDelete] = useState(
    'Your account will be automatically deleted and cannot be restored.',
  );

  const [textDetailDelete, setTextDetailDelete] = useState(
    'Please write “DELETE” below to confirm:',
  );
  

  const toggleSwitch = () =>
    setIsSwitchEnabled(previousState => !previousState);

  const users = [
    {
      id: '1',
      name: 'Valery',
      age: 38,
      imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
      verified: true,
    },
    {
      id: '2',
      name: 'Romina',
      age: 28,
      imageUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
      verified: true,
    },
    {
      id: '3',
      name: 'Katrina',
      age: 33,
      imageUrl: 'https://randomuser.me/api/portraits/women/7.jpg',
      verified: false,
    },
  ];

  const [cancelMatchVisible, setCancelMatchVisible] = useState(false);
  const [reportUserVisible, setReportUserVisible] = useState(false);

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
        Are you sure you want to unblock this user?
      </Text>
      <View style={styles.horizontalButtonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={[styles.buttonText, fonts.Btn]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton} onPress={onClose}>
          <Text style={[styles.buttonText, fonts.Btn]}>Unblock</Text>
        </TouchableOpacity>
      </View>
    </GenericModal>
  );

  const ReportUserModal = ({visible, onClose}: any) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [showTextInput, setShowTextInput] = useState(false);
    const [reportText, setReportText] = useState('');

    const options = [
      {icon: <ArrowLeft />, text: 'Inappropiate messages'},
      {icon: <ArrowLeft />, text: 'Inappropiate photos'},
      {icon: <ArrowLeft />, text: 'Feel like spam'},
      {icon: <ArrowLeft />, text: 'Other'},
    ];

    const handleOptionPress = (index: any) => {
      setSelectedOption(index);
    };

    const handleSendReport = () => {
      setShowTextInput(true);
    };

    const handleSubmitReport = () => {
      // Lógica para enviar el reporte
      console.log('Report submitted:', reportText);
      // Cerrar el modal después de enviar el reporte
      onClose();
    };

    return (
      <GenericModal visible={visible} onClose={onClose}>
        <Text style={[styles.modalTitle, fonts.H4]}>Report this user</Text>
        <Text
          style={[
            fonts.B1,
            {
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              alignSelf: 'center',
            },
          ]}>
          We won’t tell to Caroline
        </Text>
        {!showTextInput ? (
          <View style={styles.verticalButtonContainer}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedOption === index && styles.selectedOptionButton,
                ]}
                onPress={() => handleOptionPress(index)}>
                {option.icon}
                <Text style={[{color: theme.text}, fonts.Btn, {marginLeft: 4}]}>
                  {option.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={{marginTop: 30}}>
            <TextInput
              style={[
                styles.textReport,
                {
                  backgroundColor: theme.placeholder,
                  color: theme.text,
                },
              ]}
              placeholder="a"
              placeholderTextColor={colors.neutral.medium}
              value={reportText}
              onChangeText={setReportText}
              multiline
            />
            <TouchableOpacity
              style={[styles.button, {marginTop: 30}]}
              onPress={handleSubmitReport}>
              <Text style={[fonts.Btn, {color: colors.neutral.white}]}>
                Submit Report
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {!showTextInput && <View style={{paddingVertical: 9}} />}
        {!showTextInput && (
          <TouchableOpacity style={styles.button} onPress={handleSendReport}>
            <Text style={[fonts.Btn, {color: colors.neutral.white}]}>
              Send Report
            </Text>
          </TouchableOpacity>
        )}
      </GenericModal>
    );
  };

  const chats = [
    {
      id: '1',
      imageUrl: <PencilProf />,
      name: 'All notification',
      lastMessageTime: '10:30 AM',
      unreadMessages: 2,
      verify: true,
    },
    {
      id: '2',
      imageUrl: <Engranaje />,
      name: 'Match notification',
      lastMessage: 'Notification about your most recent match.',
      lastMessageTime: 'Yesterday',
      unreadMessages: 0,
      verify: false,
    },
    {
      id: '3',
      imageUrl: <Engranaje />,
      name: 'Events',
      lastMessage: 'Notification about upcoming or new events.',
      lastMessageTime: '10:30 AM',
      unreadMessages: 2,
      verify: false,
    },
    {
      id: '4',
      imageUrl: <Engranaje />,
      name: 'Chat notification',
      lastMessage: 'Notification that another user sends you in chat.',
      lastMessageTime: '10:30 AM',
      unreadMessages: 2,
      verify: false,
    },
  ];

  const [selectedOption, setSelectedOption] = useState(null);
  //const disableBtn5 = formProfile.persons.trim() === '';

  const handleChangeLogin = (id: string, text: string) => {
    if (text !== 'DELETE') {
      setTitleDelete('Are you sure to delete your account?');
      setSubTitleDelete(
        'Your account will be automatically deleted and cannot be restored.',
      );
      setTextDetailDelete('Please write “DELETE” below to confirm:')
    } else {
      setTitleDelete('Are you sure to suspend/delete your account?');
      setSubTitleDelete(
        'Your account will be suspended for 10 days. After these 10 days, your account will be automatically deleted and cannot be restored.',
      );
      setTextDetailDelete('Confirm by entering “DELETE” below')
    }
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

  const [formProfile, setFormProfile] = useState({
    phone: '',
    code: '',
    name: '',
    email: '',
    password: '',
    repassword: '',
    checkone: '',
    checktwo: '',
  });

  const navigation = useNavigation();

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPass, setErrorPass] = useState(false);

  const [showTextInput, setShowTextInput] = useState(false);
  const [showTextInput2, setShowTextInput2] = useState(false);
  const [showTextInput3, setShowTextInput3] = useState(false);
  const [reportText, setReportText] = useState('');
  const {theme} = useContext(ThemeContext);
  const options = [
    {icon: <DontLike color={theme.text} />, text: 'I don’t like The List'},
    {icon: <Break color={theme.text} />, text: 'I need a break'},
    {icon: <Heart color={theme.text} />, text: 'I meet someone'},
    {icon: <OtherD color={theme.text} />, text: 'Other'},
  ];

  const handleOptionPress = (index: any) => {
    setSelectedOption(index);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.background}}>
      <View style={{flex: 1}}>
        <HeaderUser
          text="Delete account"
          svg={<ArrowLeft color={theme.text} />}
          onPress={() => navigation.goBack()}
        />

        {/* <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{paddingHorizontal: 20, paddingTop: 20}}>
          {showTextInput && !showTextInput2 ? (
            <>
              <Text
                style={[
                  styles.unreadCount,
                  {color: theme.text},
                  fonts.H3,
                  {
                    justifyContent: 'center',
                    marginTop: 5,
                  },
                ]}>
                Could you explain the details?
              </Text>
              <Text
                style={[
                  styles.unreadCount,
                  {color: theme.text},
                  fonts.B1,
                  {
                    justifyContent: 'center',
                    marginTop: 12,
                  },
                ]}>
                Describe more about it.
              </Text>
            </>
          ) : showTextInput && showTextInput2 && !showTextInput3 ? (
            <>
              <Text
                style={[
                  styles.unreadCount,
                  {color: theme.text},
                  fonts.H3,
                  {
                    justifyContent: 'center',
                  },
                ]}>
                {titleDelete}
              </Text>
              <Text
                style={[
                  styles.unreadCount,
                  {color: theme.text},
                  fonts.B1,
                  {
                    justifyContent: 'center',
                    marginTop: 12,
                  },
                ]}>
                {subTitleDelete}
              </Text>
              <Text
                style={[
                  styles.unreadCount,
                  {color: theme.text},
                  fonts.B1,
                  {
                    justifyContent: 'center',
                    marginTop: 12,
                    marginBottom: 10,
                  },
                ]}>
                {textDetailDelete}
              </Text>
            </>
          ) : showTextInput && showTextInput2 && showTextInput3 ? (
            <>
              <Text
                style={[
                  styles.unreadCount,
                  {color: theme.text},
                  fonts.H3,
                  {
                    justifyContent: 'center',
                    marginTop: 20,
                    paddingHorizontal: 20,
                  },
                ]}>
                Are you sure to suspend/delete your account?
              </Text>
              <Text
                style={[
                  styles.unreadCount,
                  {color: theme.text},
                  fonts.B1,
                  {
                    justifyContent: 'center',
                    marginTop: 12,
                    paddingHorizontal: 20,
                  },
                ]}>
                Your account will be suspended for 10 days. After these 10 days,
                your account will be automatically deleted and cannot be
                restored.
              </Text>
              <Text
                style={[
                  styles.unreadCount,
                  {color: theme.text},
                  fonts.B1,
                  {
                    justifyContent: 'center',
                    marginTop: 12,
                    paddingHorizontal: 20,
                  },
                ]}>
                Confirm by entering “DELETE” below
              </Text>
            </>
          ) : (
            <>
              <Text
                style={[
                  styles.unreadCount,
                  {color: theme.text},
                  fonts.H3,
                  {
                    justifyContent: 'center',
                    marginTop: 5,
                  },
                ]}>
                Why do you want to delete your account?
              </Text>
              <Text
                style={[
                  styles.unreadCount,
                  {color: theme.text},
                  fonts.B1,
                  {
                    justifyContent: 'center',
                    marginVertical: 12,
                    paddingHorizontal: 5,
                  },
                ]}>
                {textDetailDelete}
              </Text>
            </>
          )}
          {showTextInput && !showTextInput2 ? (
            <View style={{marginBottom: 30, marginTop: 10}}>
              <TextInput
                style={[
                  styles.textReport,
                  {
                    backgroundColor: theme.placeholder,
                    color: theme.text,
                    borderColor: theme.disable,
                  },
                ]}
                placeholder="Text here"
                placeholderTextColor={theme.textDisable}
                value={reportText}
                onChangeText={setReportText}
                multiline
              />
            </View>
          ) : showTextInput && showTextInput2 && !showTextInput3 ? (
            <>
              <View>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.placeholder,
                      color: theme.text,
                      borderColor:formProfile.name !==''
                      ? theme.text
                      :theme.disable,
                    },
                  ]}
                  
                  placeholder="Text here"
                  placeholderTextColor={theme.textDisable}
                  value={formProfile.name}
                  onChangeText={text => handleChangeLogin('name', text)}
                  multiline
                />
              </View>
            </>
          ) : showTextInput && showTextInput2 && showTextInput3 ? (
            <>
              <View>
                <Text style={{marginBottom: 10}}>New email</Text>
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
                  placeholder="Text here"
                  placeholderTextColor={theme.textDisable}
                  value={formProfile.name}
                  onChangeText={text => handleChangeLogin('name', text)}
                />
              </View>
            </>
          ) : (
            <>
              <View style={styles.verticalButtonContainer}>
                {options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionButton,
                      {borderColor: theme.disable},
                      {backgroundColor: theme.background},
                      selectedOption === index && styles.selectedOptionButton,
                    ]}
                    onPress={() => {
                      handleOptionPress(index);
                      setShowTextInput(true);
                    }}>
                    {option.icon}
                    <Text
                      style={[{color: theme.text}, fonts.Btn, {marginLeft: 8}]}>
                      {option.text}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
        </ScrollView>
        {/* </KeyboardAvoidingView> */}

        <CancelMatchModal
          visible={cancelMatchVisible}
          onClose={() => setCancelMatchVisible(false)}
        />
        <ReportUserModal
          visible={reportUserVisible}
          onClose={() => setReportUserVisible(false)}
        />

        {showTextInput && !showTextInput2 ? (
          <>
            <View
              style={[
                styles.bannerContainer,
                {backgroundColor: theme.background, paddingHorizontal: 20},
              ]}>
              <TouchableOpacity
                style={[styles.button]}
                onPress={() => setShowTextInput2(true)}>
                <Text style={[fonts.Btn, {color: colors.neutral.white}]}>
                  Continue to account deletion
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, {backgroundColor: theme.text}]}
                onPress={() => setShowTextInput2(true)}>
                <Text style={[fonts.Btn, {color: theme.background}]}>Skip</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : showTextInput && showTextInput2 && !showTextInput3 ? (
          <>
            <View
              style={[
                styles.bannerContainer,
                {backgroundColor: theme.background, paddingHorizontal: 16},
              ]}>
              <TouchableOpacity
                style={[
                  styles.button,
                  formProfile.name !== 'DELETE' && {
                    backgroundColor: theme.disable,
                  },
                ]}
                onPress={() => navigation.navigate('profile')}
                disabled={formProfile.name !== 'DELETE'}>
                <Text
                  style={[
                    fonts.Btn,
                    {
                      color:
                        formProfile.name !== 'DELETE'
                          ? theme.textDisable
                          : colors.neutral.white,
                    },
                  ]}>
                  Delete my account
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, {backgroundColor: theme.text}]}
                onPress={() => 'A'}>
                <Text style={[fonts.Btn, {color: theme.background}]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : showTextInput && showTextInput2 && showTextInput3 ? (
          <></>
        ) : (
          <></>
        )}
      </View>
    </SafeAreaView>
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
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 2,
  },
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
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

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e5e5ea',
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? '6%' : '1%',
    paddingHorizontal: 8,
    backgroundColor: colors.neutral.white,
  },
  textInput: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e5ea',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 8,
    color: colors.neutral.darkest,
  },
  textReport: {
    flex: 1,
    height: 100,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  actionButton: {
    marginHorizontal: 5,
  },
  sendButton: {
    justifyContent: 'center',
  },
  currentUserRow: {
    justifyContent: 'flex-end',
  },
  otherUserRow: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  messageRow: {
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 10,
    alignItems: 'center',
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
    marginBottom: 15,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 16,
  },

  //

  selectedOptionButton: {
    backgroundColor: colors.primary.light,
  },

  content: {
    padding: 20,
  },
  header2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  singleButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#4CAF50', // Ajusta el color según tu diseño
    alignItems: 'center',
    borderRadius: 5,
  },
  upgradeText2: {
    color: colors.neutral.white, // Ajusta el color según tu diseño
  },
  doubleButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  doubleButton: {
    flex: 0.4,
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  goToEventButton: {
    backgroundColor: colors.neutral.darkest, // Ajusta el color según tu diseño
    marginRight: 10,
  },
  getTicketButton: {
    marginLeft: 10,
    backgroundColor: colors.primary.medium, // Ajusta el color según tu diseño
  },
  doubleButtonText: {
    color: colors.neutral.white, // Ajusta el color según tu diseño
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
    backgroundColor: colors.neutral.lighest,
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
  blockButtonText: {
    color: colors.neutral.white,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  switchLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
  bannerContainer: {
    paddingTop: 16,
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
