import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import colors from '../../../../Utils/colors';
import {ArrowLeft, Change, Subsdel} from '../../../../Assets/svg';
import fonts from '../../../../Utils/fonts';
import {useNavigation} from '@react-navigation/native';
import HeaderUser from '../../../../Components/HeaderUser';
import Juan from '../../../../Assets/img/juan.png';
import HorizontalViewMenu from '../../../../Components/ListA/HorizontalViewMenu';
import {ThemeContext} from '../../../../Components/themeContext';

export default function EditProfile() {
  const menus = [
    'A-Lister',
    'IRL only plan',
    'Digital only plan',
    'A la Carte',
  ]; //,'Digital + IRL plan'
  const options = {
    'A-Lister': [
      'A-Lister',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer congue nulla et.',
      'A-Lister',
      'IRL Only Plan',
      '29.99',
      '15.00',
      '10.00',
    ],
    'IRL only plan': [
      'IRL only plan',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer congue nulla et.',
      'IRL Only Plan',
      'Digital Only Plan',
      '24.99',
      '14.99',
      '9.99',
    ],
    'Digital only plan': [
      'Digital only plan',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer congue nulla et.',
      'Digital Only Plan',
      'A carte',
      '15.99',
      '12.99',
      '9.99',
    ],
    // 'Digital + IRL plan': ['Digital + IRL Plan', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer congue nulla et.','','','','',''],
    'A la Carte': [
      'A la Carte',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer congue nulla et.',
      '',
      '',
      '7.99',
      '15.98',
      '',
    ],
  };

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(options[menus[0]]);

  const {theme} = useContext(ThemeContext);

  // Valores Config Perfil
  const [formDetails, setFormDetails] = useState({
    card: '',
  });

  const handleOptionPress = (field: any, value: any) => {
    setFormDetails({...formDetails, [field]: value});
  };

  const [showEndMessage, setShowEndMessage] = useState(false);

  const [cancelMatchVisible, setCancelMatchVisible] = useState(false);

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
      imageUrl: <Change color={theme.text} />,
      name: 'Change my subscription',
      goTo: 'subsch',
    },
    {
      id: '2',
      imageUrl: <Subsdel />,
      name: 'Cancel my subscription',
      goTo: 'subsdel',
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
          <View style={styles.modalView2}>{children}</View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  const CancelMatchModal = ({visible, onClose}: any) => (
    <GenericModal visible={visible} onClose={onClose}>
      <Text style={[styles.modalTitle, fonts.H4]}>
        Are you sure to cancel this subscription?
      </Text>
      <View style={styles.horizontalButtonContainer}>
        <TouchableOpacity
          style={[styles.cancelButton]}
          onPress={() => {
            toggleSwitch();
            onClose();
          }}>
          <Text style={[styles.buttonText, {color: theme.text}, fonts.Btn]}>
            No, back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => {
            toggleSwitch();
            onClose();
          }}>
          <Text style={[styles.buttonText, {color: theme.text}, fonts.Btn]}>
            Yes, cancel
          </Text>
        </TouchableOpacity>
      </View>
    </GenericModal>
  );

  const navigation = useNavigation();

  return (
    <>
      <View style={{flex: 1, backgroundColor: theme.background}}>
        <HeaderUser
          text="Payment methods"
          svg={<ArrowLeft color={theme.text} />}
          onPress={() => navigation.goBack()}
        />
        <View style={{marginTop: 12}} />
        <HorizontalViewMenu
          menus={menus}
          options={options}
          onMenuSelect={menu => setSelectedMenu(options[menu])}
        />
          {selectedMenu[0] === 'A la Carte' ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 10,
                paddingVertical: 12,
                paddingHorizontal: 16,
              }}>
              <TouchableOpacity
                onPress={() => setSelectedPlan('1 month')}
                style={{
                  width: 140,
                  height: 110,
                  borderWidth: 1,
                  borderColor:
                    selectedPlan === '1 month'
                      ? colors.primary.medium
                      : colors.neutral.light,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    position: 'absolute',
                    top: -7,
                    backgroundColor:
                      selectedPlan === '1 month'
                        ? colors.primary.lighest
                        : theme.disable,
                    paddingHorizontal: 6,
                    paddingVertical: 1,
                    borderRadius: 8,
                  }}>
                  <Text
                    style={{
                      fontSize: 9,
                      fontWeight: selectedPlan === '1 month' ? 'bold' : '300',
                      color:
                        selectedPlan === '1 month'
                          ? colors.primary.medium
                          : theme.text,
                    }}>
                    Single price
                  </Text>
                </View>
                <Text style={[fonts.S1, {color: theme.text}]}>
                  ${selectedMenu[4]}
                </Text>
                <Text style={[fonts.C2B, {color: theme.text}]}>
                  per upgrade
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setSelectedPlan('1 year')}
                style={{
                  borderWidth: 1,
                  borderColor:
                    selectedPlan === '1 year'
                      ? colors.primary.medium
                      : colors.neutral.light,
                  width: 140,
                  paddingHorizontal: 5,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    position: 'absolute',
                    top: -7,
                    backgroundColor: colors.primary.lighest,
                    paddingHorizontal: 6,
                    paddingVertical: 1,
                    borderRadius: 8,
                  }}>
                  <Text
                    style={{
                      fontSize: 9,
                      fontWeight: 'bold',
                      color: colors.primary.medium,
                    }}>
                    Total price
                  </Text>
                </View>
                <Text style={[fonts.S1, {color: theme.text}]}>
                  ${selectedMenu[5]}
                </Text>
                <View
                  style={{
                    backgroundColor: colors.secondary.lighest,
                    paddingHorizontal: 12,
                    paddingVertical: 0,
                    borderRadius: 20,
                    marginVertical: 2,
                  }}>
                  <Text
                    style={[
                      fonts.C2B,
                      {color: colors.secondary.dark, fontSize: 10},
                    ]}>
                    2 upgrades selected
                  </Text>
                </View>
                <Text
                  style={[fonts.C2B, {textAlign: 'center', color: theme.text}]}>
                  Your choices to pay per month
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: theme.background,
                justifyContent: 'center',
                gap: 10,
                paddingVertical: 12,
                borderTopLeftRadius:20,
                borderTopRightRadius:20,
                paddingHorizontal: 16,
              }}>
              <TouchableOpacity
                onPress={() => setSelectedPlan('1 month')}
                style={{
                  width: 100,
                  height: 110,
                  borderWidth: 1,
                  borderColor:
                    selectedPlan === '1 month'
                      ? colors.primary.medium
                      : colors.neutral.light,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={[fonts.S1, {color: theme.text}]}>
                  ${selectedMenu[4]}
                </Text>
                <Text style={[fonts.C2B, {color: theme.text}]}>1 month</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setSelectedPlan('6 months')}
                style={{
                  borderWidth: 1,
                  borderColor:
                    selectedPlan === '6 months'
                      ? colors.primary.medium
                      : colors.neutral.light,
                  borderRadius: 10,
                  paddingHorizontal: 5,
                  width: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={[fonts.S1, {color: theme.text}]}>
                  ${selectedMenu[5]}
                </Text>
                <Text
                  style={[fonts.C2B, {textAlign: 'center', color: theme.text}]}>
                  each month per 6 months
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setSelectedPlan('1 year')}
                style={{
                  borderWidth: 1,
                  borderColor:
                    selectedPlan === '1 year'
                      ? colors.primary.medium
                      : colors.neutral.light,
                  width: 100,
                  paddingHorizontal: 5,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    position: 'absolute',
                    top: -7,
                    backgroundColor: colors.primary.lighest,
                    paddingHorizontal: 6,
                    paddingVertical: 1,
                    borderRadius: 8,
                  }}>
                  <Text
                    style={{
                      fontSize: 9,
                      fontWeight: 'bold',
                      color: colors.primary.medium,
                    }}>
                    Most popular
                  </Text>
                </View>
                <Text style={[fonts.S1, {color: theme.text}]}>
                  ${selectedMenu[6]}
                </Text>
                <View
                  style={{
                    backgroundColor: colors.secondary.lighest,
                    paddingHorizontal: 12,
                    paddingVertical: 0,
                    borderRadius: 20,
                    marginVertical: 2,
                  }}>
                  <Text
                    style={[
                      fonts.C2B,
                      {color: colors.secondary.dark, fontSize: 10},
                    ]}>
                    SAVE 40%
                  </Text>
                </View>
                <Text
                  style={[fonts.C2B, {textAlign: 'center', color: theme.text}]}>
                  each month per 1 year
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              // navigation.navigate('Alist')
              navigation.navigate('typemethod')
            }>
            <Text style={[fonts.Btn, {color: colors.neutral.white}]}>
              Upgrade now
            </Text>
          </TouchableOpacity>
          </View>
      </View>
    </>
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
  //

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    shadowColor: colors.neutral.darkest,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
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
  optionText: {
    fontSize: 14,
    color: colors.neutral.dark,
    fontWeight: '600',
  },
  button: {
    backgroundColor: colors.primary.medium,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  banner: {
    paddingVertical: 10,
    width: '100%',
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 1,
      },
    }),
  },
});
