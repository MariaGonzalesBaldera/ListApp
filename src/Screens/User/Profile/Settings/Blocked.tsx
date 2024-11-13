import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import colors from '../../../../Utils/colors';
import {ArrowLeft, Close} from '../../../../Assets/svg';
import {useNavigation} from '@react-navigation/native';
import HeaderUser from '../../../../Components/HeaderUser';
import fonts from '../../../../Utils/fonts';
import {ThemeContext} from '../../../../Components/themeContext';

export default function Blocked() {
  const [showEndMessage, setShowEndMessage] = useState(false);

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
          <View style={[styles.modalView2,{backgroundColor:theme.background}]}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => onClose}>
              <Close color={theme.text}/>
            </TouchableOpacity>
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  const CancelMatchModal = ({visible, onClose}: any) => (
    <GenericModal visible={visible} onClose={onClose}>
      <Text style={[styles.modalTitle, fonts.H4, {color: theme.text}]}>
        Are you sure you want to unblock this user?
      </Text>
      <View style={styles.horizontalButtonContainer}>
        <TouchableOpacity
          style={[styles.cancelButton, {backgroundColor: theme.text}]}
          onPress={onClose}>
          <Text style={[{color: theme.background}, fonts.Btn]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton} onPress={onClose}>
          <Text style={[{color: colors.primary.lighest}, fonts.Btn]}>
            Unblock
          </Text>
        </TouchableOpacity>
      </View>
    </GenericModal>
  );

  const ReportUserModal = ({visible, onClose}) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [showTextInput, setShowTextInput] = useState(false);
    const [reportText, setReportText] = useState('');

    const options = [
      {icon: <ArrowLeft />, text: 'Inappropiate messages'},
      {icon: <ArrowLeft />, text: 'Inappropiate photos'},
      {icon: <ArrowLeft />, text: 'Feel like spam'},
      {icon: <ArrowLeft />, text: 'Other'},
    ];

    const handleOptionPress = index => {
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
                <Text style={[styles.buttonText2, fonts.Btn, {marginLeft: 4}]}>
                  {option.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={{marginTop: 30}}>
            <TextInput
              style={styles.textReport}
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
      imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
      name: 'Jane Doe, 28',
      lastMessage: 'Hola, ¿cómo estás?',
      lastMessageTime: '10:30 AM',
      unreadMessages: 2,
      verify: true,
    },
    {
      id: '2',
      imageUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
      name: 'Jane Doe, 33',
      lastMessage: '¡Hola! Todo bien, gracias.',
      lastMessageTime: 'Yesterday',
      unreadMessages: 0,
      verify: false,
    },
    {
      id: '3',
      imageUrl: 'https://randomuser.me/api/portraits/women/7.jpg',
      name: 'Jane Doe, 40',
      lastMessage: 'Hola, ¿cómo estás?',
      lastMessageTime: '10:30 AM',
      unreadMessages: 2,
      verify: false,
    },
    {
      id: '4',
      imageUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
      name: 'Jane Doe, 21',
      lastMessage: '¡Hola!',
      lastMessageTime: 'Yesterday',
      unreadMessages: 0,
      verify: true,
    },
    {
      id: '5',
      imageUrl: 'https://randomuser.me/api/portraits/women/15.jpg',
      name: 'Jane Doe, 25',
      lastMessage: '¿Qué tal?',
      lastMessageTime: '10:45 AM',
      unreadMessages: 1,
      verify: true,
    },
  ];

  const navigation = useNavigation();
  const {theme, isDarkMode} = useContext(ThemeContext);

  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <SafeAreaView />
      <HeaderUser
        text="Blocked list"
        svg={<ArrowLeft color={theme.text}/>}
        onPress={() => navigation.goBack()}
      />
      <Text
        style={[
          styles.unreadCount,
          fonts.B1,
          {
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 20,
            color: theme.text,
          },
        ]}>
        3 people
      </Text>
      <ScrollView style={{paddingHorizontal: 20, paddingTop: 20}}>
        {chats.map((chat, index) => (
          <View key={chat.id}>
            <View style={styles.chatContainer}>
              <Image
                source={{uri: chat.imageUrl}}
                style={styles.profileImage}
              />
              <View style={styles.chatContent}>
                <Text style={[styles.name, fonts.H5, {color: theme.text}]}>
                  {chat.name}
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.metaData,
                  {
                    borderRadius: 20,
                    backgroundColor: colors.primary.medium,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                  },
                ]}
                onPress={() => setCancelMatchVisible(true)}>
                <Text style={[fonts.Btn, {color: colors.neutral.white}]}>
                  Unblock
                </Text>
              </TouchableOpacity>
            </View>
            {index < chats.length - 1 && (
              <View
                style={[
                  styles.divider,
                  {backgroundColor: isDarkMode ? '#2F2F2F' : '#E6E6E6'},
                ]}
              />
            )}
          </View>
        ))}
        <View
          style={[
            styles.divider,
            {backgroundColor: isDarkMode ? '#2F2F2F' : '#E6E6E6'},
          ]}
        />
      </ScrollView>

      <CancelMatchModal
        visible={cancelMatchVisible}
        onClose={() => setCancelMatchVisible(false)}
      />
      <ReportUserModal
        visible={reportUserVisible}
        onClose={() => setReportUserVisible(false)}
      />

      <View style={{paddingHorizontal: 24}}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => navigation.navigate('blockedby')}>
          <Text style={[fonts.Btn, {color: colors.neutral.white}]}>
            Block by Email / Number
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
  },
  textReport: {
    flex: 1,
    height: 100,
    paddingBottom: 140,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e5ea',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 8,
    backgroundColor: colors.neutral.light,
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
});
