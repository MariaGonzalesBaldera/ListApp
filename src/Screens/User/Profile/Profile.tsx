import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import OlderHeader from '../../../Components/ChatComponents/Headers/OlderHeader';
import colors from '../../../Utils/colors';
import {
  ArrowLeft,
  Chavron,
  Close,
  EditPencil,
  Engranaje,
  Exit,
  Messaging,
  PencilProf,
  PhoneProf,
  Shield,
  Verify,
  Verifysm,
} from '../../../Assets/svg';
import {useNavigation} from '@react-navigation/native';
import HeaderUser from '../../../Components/HeaderUser';
import fonts from '../../../Utils/fonts';
import ButtonComponent from '../../../Components/Button';

import Juan from '../../../Assets/img/juan.png';
import CircularProgress from '../../../Components/CircularProgress';
import BottomUpModal from '../../../Components/BottomPopup';
import {
  MediaType,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {ThemeContext} from '../../../Components/themeContext';
const {width, height} = Dimensions.get('window');
import {MeUser} from '../../../Services/User/UserServices';
import {Upload} from '../../../Services/Uploads/Upload';
import {useAuth} from '../../../Context/AuthContext';
import {Modal} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const {auth, logout} = useAuth();
  const navigation = useNavigation();
  const {theme, isDarkMode} = useContext(ThemeContext);

  const [showEndMessage, setShowEndMessage] = useState(false);

  const [modalVisibleProfile, setModalVisibleProfile] = useState(false);
  const [agreeVisible, setAgreeVisible] = useState(false);

  const [block, setblock] = useState(false);

  const handleLogout = async () => {
    try {
      // Elimina el token y el usuario de AsyncStorage
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
  
      setAgreeVisible(false);
      // Llama a la función de logout
      logout();
  
      console.log('Logout realizado y AsyncStorage limpiado.');
    } catch (error) {
      console.error('Error al hacer logout o limpiar AsyncStorage:', error);
    }
  };


  const ValidLogout = async () => {
    setAgreeVisible(true);
  };
  const openModalProfile = () => {
    setModalVisibleProfile(true);
  };

  const closeModalProfile = () => {
    setModalVisibleProfile(false);
  };
  const [user, setUser] = useState(false);

  useEffect(() => {
    console.log('Case 10 selected, running useEffect...');

    const fetchUser = async () => {
      try {
        const userData = await MeUser(); // Aquí asumes que `MeUser` es una función que obtiene datos del usuario
        setUser(userData);
        console.log('userData', userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Listener para cuando la pantalla se enfoca
    const unsubscribeFocus = navigation.addListener('focus', () => {
      console.log('Pantalla enfocada, actualizando usuario...');
      fetchUser(); // Se ejecuta cuando la pantalla recibe el enfoque
    });

    // Ejecuta la función `fetchUser` directamente cuando el componente se monta
    fetchUser();

    // Cleanup function para desuscribir el listener
    return () => {
      unsubscribeFocus();
    };
  }, [navigation]); // Solo depende de navigation

  const handleCameraLaunch = () => {
    const options: {
      mediaType: MediaType;
      includeBase64: boolean;
      maxHeight: number;
      maxWidth: number;
    } = {
      mediaType: 'photo', // or 'video' depending on your requirements
      includeBase64: false,
      maxHeight: 800,
      maxWidth: 800,
    };

    launchCamera(options, async response => {
      try {
        if (response.didCancel) {
          console.log('User cancelled image picker');
          return;
        }

        if (!response.assets || response.assets.length === 0) {
          console.log('No image selected');
          return;
        }

        const imageUri = response.assets[0].uri;
        const type = response.assets[0].type;
        const name = response.assets[0].fileName;
        console.log('IMGUR', imageUri);
        console.log('IMGUR', type);
        console.log('IMGUR', name);

        setModalVisibleProfile(false);
        await handleUploadPhoto(imageUri, type, name);
      } catch (error) {
        console.log('Error selecting image:', error);
      }
    });
  };

  // IMAGENES
  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 800,
      maxWidth: 800,
      quality: 1,
      storageOptions: {
        skipBackup: true,
        path: 'images', // Ruta donde se almacenará el archivo
      },
    };

    launchImageLibrary(options, async response => {
      try {
        if (response.didCancel) {
          console.log('User cancelled image picker');
          return;
        }

        if (!response.assets || response.assets.length === 0) {
          console.log('No image selected');
          return;
        }

        const imageUri = response.assets[0].uri;
        const type = response.assets[0].type;
        const name = response.assets[0].fileName;
        console.log('IMGUR', imageUri);
        console.log('IMGUR', type);
        console.log('IMGUR', name);

        setModalVisibleProfile(false);

        await handleUploadPhoto(imageUri, type, name);
      } catch (error) {
        console.log('Error selecting image:', error);
      }
    });
  };

  const handleUploadPhoto = async (imageUri: string, type: any, name: any) => {
    try {
      const formDataImg = new FormData();

      formDataImg.append('file', {
        uri: imageUri,
        type: type, // Tipo MIME del archivo
        name: name, // Nombre del archivo
      });

      // Llamar a la función Upload con el objeto FormData
      const status = await Upload(formDataImg);
      const url = status.data;
      console.log(url);

      navigation.navigate('editphoto', {url: url});
    } catch (error: any) {
      // Si ocurre un error, imprime la información detallada
      console.error('Error uploading photo:', error);

      // Verifica si el error es debido a un problema de red
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  const chats = [
    {
      id: '1',
      imageUrl: <PencilProf color={theme.text} />,
      name: 'Edit my profile',
      goTo: 'editprofile',
    },
    {
      id: '2',
      imageUrl: <Engranaje color={theme.text} />,
      name: 'Account setting',
      goTo: 'accountsettings',
    },
    {
      id: '3',
      imageUrl: <PhoneProf color={theme.text} />,
      name: 'Appearance',
      goTo: 'apparence',
    },
    {
      id: '4',
      imageUrl: <Shield color={theme.text} />,
      name: 'Security and privacy',
      goTo: 'security',
    },
  ];
  const ConfirmationModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
        <View style={styles.modalBackground2}>
            <View style={[styles.modalView2, { backgroundColor: theme.backgroundChat }]}>
              <Text style={[styles.modalTitle, fonts.H4, { marginTop: 12, color: theme.text }]}>
                Are you sure you want to log out?
              </Text>
              <View style={styles.horizontalButtonContainer}>
                <TouchableOpacity
                  style={[styles.cancelButton, { backgroundColor: theme.text }]}
                  onPress={onClose} 
                >
                  <Text style={[styles.buttonText, { color: theme.background }, fonts.Btn]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={() => {
                    handleLogout()
                  }}
                >
                  <Text style={[styles.buttonText, fonts.Btn]}>Log out</Text>
                </TouchableOpacity>
              </View>
            </View>

        </View>
      
    </Modal>
  );
  

  return (
    <>
     <View style={{flex: 1, backgroundColor: theme.background}}>
      <SafeAreaView />
      <HeaderUser text="My profile" onPress={() => navigation.goBack()} />
      <ScrollView style={{paddingHorizontal: 24, paddingTop: 20}}>
        <View style={{marginBottom: 11.5}}>
          <View style={styles.ProfileContainer}>
            <Image
              source={{uri: user?.profile_image}}
              style={styles.profileImage2}
            />
            <View style={styles.chatContent}>
              <Text
                style={[
                  styles.name,
                  fonts.H4,
                  {marginLeft: 6, color: theme.text},
                ]}>
                Hello {user.name}
              </Text>
            </View>
            <BottomUpModal
              isVisible={modalVisibleProfile}
              onClose={closeModalProfile}
              contentComponent={
                <Text
                  style={[
                    fonts.H4,
                    {
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      color: theme.text,
                    },
                  ]}>
                  Upload your photo
                </Text>
              }
              cancelButtonText="Open camera"
              confirmButtonText="From your gallery"
              onPressA={() => handleCameraLaunch()}
              onPressB={() => openImagePicker()}
              onRrequestClose={closeModalProfile}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              zIndex: 20,
              top: Platform.OS === 'ios' ? height * 0.08 : height * 0.08,
              left: width * 0.12 + 12,
            }}>
            <View>
              <TouchableOpacity
                onPress={() => openModalProfile()}
                style={styles.circle3}>
                <EditPencil />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              backgroundColor: colors.primary.lighest,
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderRadius: 20,
              flexDirection: 'row',
            }}>
            <CircularProgress
              percentage={Math.round(user?.percentage_profile)}
              radius={25}
              strokeWidth={2}
              showText={true}
              color={colors.primary.medium}
            />
            <View style={{flex: 1, marginLeft: 12}}>
              <Text
                style={[
                  fonts.B1,
                  {color: colors.neutral.darkest, fontWeight: 'bold'},
                ]}>
                <Text style={{color: colors.primary.medium}}>Complete</Text>{' '}
                your profile
              </Text>
              <Text
                style={[
                  fonts.B1,
                  {
                    marginBottom: 8,
                    color: colors.neutral.darkest,
                    fontWeight: '400',
                  },
                ]}>
                To find your perfect match.
              </Text>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.divider,
            {backgroundColor: isDarkMode ? '#2F2F2F' : '#E6E6E6'},
          ]}
        />
        {chats.map((chat, index) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(chat.goTo)}
            key={chat.id}>
            <View style={styles.chatContainer}>
              <View style={[styles.profileImage]}>{chat.imageUrl}</View>
              <View style={[styles.chatContent, {marginTop: 4}]}>
                <Text style={[styles.name, fonts.H5, {color: theme.text}]}>
                  {chat.name}
                </Text>
              </View>

              <Chavron color={theme.text} />
            </View>
            {index < chats.length - 1 && (
              <View
                style={[
                  styles.divider,
                  {backgroundColor: isDarkMode ? '#2F2F2F' : '#E6E6E6'},
                ]}
              />
            )}
          </TouchableOpacity>
        ))}
        <View
          style={[
            styles.divider,
            {backgroundColor: isDarkMode ? '#2F2F2F' : '#E6E6E6'},
          ]}
        />

        <TouchableOpacity onPress={() => ValidLogout()}>
          <View style={styles.chatContainer}>
            <View style={[styles.profileImage]}>
              <Exit color={theme.text} />
            </View>
            <View style={[styles.chatContent, {marginTop: 4}]}>
              <Text style={[styles.name, fonts.H5, {color: theme.text}]}>
                Log out
              </Text>
            </View>

            <Chavron color={theme.text} />
          </View>
        </TouchableOpacity>
        <View
          style={[
            styles.divider,
            {backgroundColor: isDarkMode ? '#2F2F2F' : '#E6E6E6'},
          ]}
        />

        <View style={{marginTop: 16}}>
          <ButtonComponent
            onPress={() => navigation.navigate('preview')}
            text={'Profile preview'}
            colors={theme.text}
            black={false}
            colorText={theme.background}
          />

          <View style={{marginTop: 20, paddingBottom: 20}}>
            <View
              style={{
                backgroundColor: theme.placeholder,
                paddingHorizontal: 20,
                paddingVertical: 12,
                borderRadius: 20,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <Text style={[fonts.H5, {color: theme.text}]}>
                  It’s time to upgrade your plan!
                </Text>
                <Text
                  style={[
                    fonts.B1,
                    {marginBottom: 8, color: theme.text, fontWeight: '400'},
                  ]}>
                  Know more all details of each plan.
                </Text>
                <View style={{width: '60%'}}>
                  <ButtonComponent
                    onPress={() => navigation.navigate('assistants')}
                    text={'Profile preview'}
                    colors={colors.primary.medium}
                    black={false}
                    colorText={colors.primary.lighest}
                  />
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              backgroundColor: theme.placeholder,
              paddingHorizontal: 20,
              paddingVertical: 20,
              borderRadius: 20,
              flexDirection: 'row',
              marginTop: 20,
              marginBottom: 60,
            }}>
            <View
              style={{
                flex: 1,
                marginLeft: 8,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: colors.primary.lighest,
                  paddingHorizontal: 6,
                  paddingVertical: 1,
                  borderRadius: 8,
                }}>
                <Text style={styles.textPlan}>YOUR PLAN</Text>
              </View>
              <Text style={[fonts.H3, {color: theme.text}]}>
                Digital + IRL Plan{' '}
              </Text>
              <Text style={[fonts.H2, {color: colors.secondary.medium}]}>
                $19.99
              </Text>
              <Text
                style={[fonts.B1, {marginBottom: 32, color: theme.tertiary}]}>
                each month per 1 year
              </Text>

              <TouchableOpacity
                style={[styles.button, {width: '90%'}]}
                onPress={() => navigation.navigate('upgradex')}>
                <Text style={[fonts.Btn, {color: colors.neutral.white}]}>
                  Change your subscription
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, {width: '90%'}]}
                onPress={() => navigation.navigate('changesubs')}>
                <Text style={[fonts.Btn, {color: colors.neutral.white}]}>
                  Change your subscription
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {showEndMessage && (
        <>
          <View style={styles.overlay}>
            <View
              style={{height: '8%', backgroundColor: colors.neutral.white}}
            />
            <HeaderUser
              text="Assistants"
              svg={<ArrowLeft color={theme.text} />}
              onPress={() => navigation.goBack()}
            />
            <View style={styles.centeredView}>
              <Text style={[styles.mainText, fonts.H2]}>Unlock the list</Text>
              <Text style={[styles.subtitle, fonts.B1]}>
                And find out who will attend this event
              </Text>
              <TouchableOpacity
                style={styles.upgradeButton}
                onPress={() => navigation.navigate('UpgradePlan')}>
                <Text style={[styles.upgradeText, fonts.Btn]}>
                  Upgrade my plan
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
                <ConfirmationModal
        visible={agreeVisible}
        onClose={() => setAgreeVisible(false)}
      />
    </View>

    </>
   
  );
}

const styles = StyleSheet.create({
  chatContent: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',

    alignSelf: 'center',
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
    tintColor: 'red',
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
  button: {
    backgroundColor: colors.primary.medium,
    borderRadius: 20,
    paddingVertical: 12,
    marginBottom: 15,
    alignItems: 'center',
    marginTop: 'auto',
  },
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
  circle3: {
    width: 24, // ajusta el tamaño del círculo según sea necesario
    height: 24, // ajusta el tamaño del círculo según sea necesario
    borderRadius: 16, // asegura que el círculo sea redondo
    borderWidth: 5, // ancho del borde
    borderColor: colors.primary.medium, // color del borde
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.medium,
  },
  textPlan: {
    color: colors.primary.medium,
    fontSize: 10,
    margin:2,
    fontWeight:"700"
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

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  horizontalButtonContainer: {
    width: '100%',
    marginTop: 12,
    flexDirection: 'row',
    justifyContent:'space-around'
  },
  confirmButton: {
    backgroundColor: colors.primary.medium,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  buttonText: {
    color: colors.neutral.white,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
