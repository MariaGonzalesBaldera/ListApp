import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import OlderHeader from '../../../Components/ChatComponents/Headers/OlderHeader';
import colors from '../../../Utils/colors';
import {
  ArrowLeft,
  Chavron,
  Close,
  Engranaje,
  Exit,
  Messaging,
  PencilProf,
  Shield,
  Verify,
  Verifysm,
  Delete,
  Pause,
  Subscriptions,
  Payment,
  Notificacion,
  Password,
  Email,
  Blocked,
} from '../../../Assets/svg';
import {useNavigation} from '@react-navigation/native';
import HeaderUser from '../../../Components/HeaderUser';
import fonts from '../../../Utils/fonts';
import ButtonComponent from '../../../Components/Button';

import Juan from '../../../Assets/img/juan.png';
import CircularProgress from '../../../Components/CircularProgress';
import {ThemeContext} from '../../../Components/themeContext';

export default function EditProfile() {
  const [showEndMessage, setShowEndMessage] = useState(false);

  const [cancelMatchVisible, setCancelMatchVisible] = useState(false);
  const {theme, isDarkMode} = useContext(ThemeContext);

  const user = {
    id: '1',
    imageUrl: Juan,
    name: 'Juan',
    goTo: 'Hola, ¿cómo estás?',
    goToTime: '10:30 AM',
    unreadMessages: 2,
    verify: true,
  };

  const chats = [
    {
      id: '1',
      imageUrl: <Email color={theme.text} />,
      name: 'Change my email',
      goTo: 'emailch',
    },
    {
      id: '2',
      imageUrl: <Password color={theme.text} />,
      name: 'Change my password',
      goTo: 'passwordch',
    },
    {
      id: '3',
      imageUrl: <Notificacion color={theme.text} />,
      name: 'Notifications settings',
      goTo: 'notifications',
    },
    {
      id: '4',
      imageUrl: <Payment color={theme.text} />,
      name: 'Payment methods',
      goTo: 'type',
    },
    {
      id: '5',
      imageUrl: <Blocked color={theme.text} />,
      name: 'Blocked list',
      goTo: 'blocked',
    },
    {
      id: '6',
      imageUrl: <Subscriptions color={theme.text} />,
      name: 'Subscriptions',
      goTo: 'subscriptions',
    },
    {
      id: '7',
      imageUrl: <Pause color={theme.text} />,
      name: 'Pause my account',
      goTo: 'pauseaccount',
      pause: true,
    },
    {
      id: '8',
      imageUrl: <Delete color={theme.text} />,
      name: 'Delete account',
      goTo: 'delete',
      delete: true,
    },
  ];

  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);

  const toggleSwitch = () =>
    setIsSwitchEnabled(previousState => !previousState);

  const GenericModal = ({visible, onClose, children}: any) => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground2}>
          <View
            style={[styles.modalView2, {backgroundColor: theme.background}]}>
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
      <Text style={[styles.modalTitle, fonts.H4, {color: theme.text}]}>
        Are you sure you want to pause your account?
      </Text>
      <Text style={[styles.modalTitle, fonts.B1, {color: theme.text}]}>
        Just the people that you have a conversation can see you.
      </Text>
      <View style={styles.horizontalButtonContainer}>
        <TouchableOpacity
          style={[styles.cancelButton, {backgroundColor: theme.text}]}
          onPress={() => {
            toggleSwitch();
            onClose();
          }}>
          <Text style={[{color: theme.background}, fonts.Btn]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => {
            toggleSwitch();
            onClose();
          }}>
          <Text style={[{color: colors.primary.lighest}, fonts.Btn]}>
            Pause
          </Text>
        </TouchableOpacity>
      </View>
    </GenericModal>
  );

  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <SafeAreaView />
      <HeaderUser
        text="Account settings"
        svg={<ArrowLeft color={theme.text} />}
        onPress={() => navigation.goBack()}
      />

      <ScrollView style={{paddingHorizontal: 24, paddingTop: 20}}>
        {chats.map((chat, index) => (
          <View key={chat.id}>
            <TouchableOpacity
              style={styles.chatContainer}
              onPress={() => navigation.navigate(chat.goTo)}>
              <View style={styles.profileImage}>{chat.imageUrl}</View>
              <View style={[styles.chatContent, {marginTop: 4}]}>
                <Text
                  style={[
                    styles.name,
                    fonts.H5,
                    {
                      color:
                        chat.delete === true
                          ? colors.danger.medium
                          : theme.text,
                    },
                  ]}>
                  {chat.name}
                </Text>
              </View>
              {chat.delete === true || chat.pause === true ? (
                ''
              ) : (
                <View style={styles.metaData}>
                  <Chavron color={theme.text} />
                </View>
              )}
              {chat.pause === true ? (
                <View style={styles.switchContainer}>
                  <Switch
                    trackColor={{false: '#767577', true: colors.primary.light}}
                    thumbColor={
                      isSwitchEnabled ? colors.primary.medium : '#f4f3f4'
                    }
                    ios_backgroundColor={colors.neutral.medium}
                    onValueChange={() => setCancelMatchVisible(true)}
                    value={isSwitchEnabled}
                  />
                </View>
              ) : (
                ''
              )}
            </TouchableOpacity>
            {index < chats.length - 1 && (
              <View
                style={[
                  styles.divider,
                  {backgroundColor: isDarkMode ? '#2F2F2F' : '#E6E6E6'},
                ]}
              />
            )}
            <CancelMatchModal
              visible={cancelMatchVisible}
              onClose={() => setCancelMatchVisible(false)}
            />
          </View>
        ))}
        <View
          style={[
            styles.divider,
            {backgroundColor: isDarkMode ? '#2F2F2F' : '#E6E6E6'},
          ]}
        />
      </ScrollView>
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
    gap:1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  verticalButtonContainer: {
    marginTop: 10,
  },
  cancelButton: {
    width:120,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginHorizontal: 5,
    alignItems: 'center',

  },
  confirmButton: {
    width:120,
    backgroundColor: colors.primary.medium,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginHorizontal: 5,
    alignItems: 'center',
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
});
