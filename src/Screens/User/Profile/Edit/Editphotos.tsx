import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

import fonts from '../../../../Utils/fonts';
import colors from '../../../../Utils/colors';
import {Add, ArrowLeft, Edit} from '../../../../Assets/svg';
import {useNavigation} from '@react-navigation/native';
import BottomUpModal from '../../../../Components/BottomPopup';

import {launchImageLibrary} from 'react-native-image-picker';

import HeaderUser from '../../../../Components/HeaderUser';
import {Upload} from '../../../../Services/Uploads/Upload';
import {MeUser, RegisterPhotos, UpdatePhotos} from '../../../../Services/User/UserServices';
import {ThemeContext} from '../../../../Components/themeContext';

export default function Register() {
  const navigation = useNavigation();
  const {theme} = useContext(ThemeContext);

  const [selectedOptionA, setSelectedOptionA] = useState(null);
  const [selectedOptionB, setSelectedOptionB] = useState(null);
  const [selectedOptionC, setSelectedOptionC] = useState(null);
  const [selectedOptionD, setSelectedOptionD] = useState(null);
  const [selectedOptionE, setSelectedOptionE] = useState(null);
  const [selectedOptionF, setSelectedOptionF] = useState(null);
  const [photoUrlUpdate, setPhotoUrlUpdate] = useState([]);

  const [typeSave, setTypeSave] = useState("");
  const [idSave, setIdSave] = useState(null);

  const [selectedImages, setSelectedImages] = useState(
    Array(6).fill({id: null, image_url: null}),
  );
  const infoImageOptions = [
    {label: 'Headshots', value: '1'},
    {label: 'Full body', value: '2'},
    {label: 'Smilling', value: '3'},
    {label: 'Just you', value: '4'},
    {label: 'Recent', value: '5'},
    {label: 'Candids', value: '6'},
  ];
  // Función para abrir el modal

  // Valores Config Perfil
  const [formDetails, setFormDetails] = useState({
    age: '', //
    height: '', //
    description: '', //
    relationship: '',
    google_id: '',
    apple_id: '',
    profile_image: '', //
    neighborhood: '', //
    distance_min: '0', //
    distance_max: '100', //
    age_min: '',
    age_max: '',
    is_share_my_location: '',
    want_to_meet: '',
    work: '', //
    school: '', //
    job_name: '', //
    latitude: '', //
    longitude: '', //
    pronouns_id: '', //
    religions_id: '', //
    politicals_id: '', //
    lifestyle_active_id: '', //
    lifestyle_drink_id: '', //
    lifestyle_smoke_id: '',
    lifestyle_tabacco_id: '', //
    lifestyle_weed_id: '', //
    lifestyle_drugs_id: '', //
    lookings_for_id: '', //
    family_plans_id: '', //
    genders_id: '', //
    sex_interests_id: '', //

    prompts: [],
    photos: [],
    list: [],
    lookings: [], // ---
    education_id: '', //
    meet: '',
    looking_for: '', //
    family_plans: '', //
    sun_sign: '', //
    ethnicity: '', //
  });
  const ValidateImages = async () => {
    if(typeSave==="create"){
      const register = RegisterPhotos(photoUrlUpdate);
    console.log('photoUrlUpdate ', photoUrlUpdate);
    if ((await register) === true) {
      setAgreeVisible(true);
    }
    }else if(typeSave==="update"){
      const update = UpdatePhotos({photoUrlUpdate,idSave});
      console.log('photoUrlUpdate', photoUrlUpdate);
      if ((await update) === true) {
        setAgreeVisible(true);
      }
    }
  };
  // Verifica si ambos campos están vacíos

  const disableBtn3 = formDetails.photos.length < 3;

  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await MeUser();
        setUser(userData);

        if (userData?.photos) {
          const photos = userData.photos.map(photo => ({
            id: photo.id,
            image_url: photo.image_url,
          }));

          const minPhotos = 6;
          const paddedPhotos =
            photos.length < minPhotos
              ? [
                  ...photos,
                  ...Array(minPhotos - photos.length).fill({
                    id: null,
                    image_url: null,
                  }),
                ]
              : photos;

          setSelectedImages(paddedPhotos);
        }

        // console.log('userData', userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const unsubscribeFocus = navigation.addListener('focus', () => {
      console.log('Pantalla enfocada, actualizando usuario...');
      fetchUser();
    });

    // Llama a fetchUser al inicio
    fetchUser();

    return () => {
      unsubscribeFocus();
    };
  }, [navigation]);

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
      console.log("imageUri ",imageUri)
        const type = response.assets[0].type;
        const name = response.assets[0].fileName;
        console.log('IMGUR', imageUri);
        console.log('IMGUR', type);
        console.log('IMGUR', name);
        console.log("selectedImages ",selectedImages)

        if (!selectedOptionA) {
          setSelectedOptionA(imageUri);
        } else if (!selectedOptionB) {
          setSelectedOptionB(imageUri);
        } else if (!selectedOptionC) {
          setSelectedOptionC(imageUri);
        } else if (!selectedOptionD) {
          setSelectedOptionD(imageUri);
        } else if (!selectedOptionE) {
          setSelectedOptionE(imageUri);
        } else if (!selectedOptionF) {
          setSelectedOptionF(imageUri);
        }

        setModalVisible(false);
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
      console.log("url ",url);
      console.log("selectedImages ",selectedImages)
      setSelectedImages(prevImages => {
        const imageExists = prevImages.find(image => image.id === idSave);
      
        if (imageExists) {
          console.log("yes")
          // Si el id ya existe, actualiza la url del objeto en el arreglo
          return prevImages.map(image =>
            image.id === idSave ? { ...image, image_url: url } : image
          );
        } else {
          console.log("no")

          // Si el id no existe, agrega el nuevo objeto al final del arreglo
          return [...prevImages, { id: idSave, image_url: url }];
        }
      });
      

      setPhotoUrlUpdate(prevUrls => [...prevUrls, url]);
      setFormDetails({...formDetails, photos: url});
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

  const ModalAgree = ({visible, onClose}: any) => (
    <GenericModal visible={visible} onClose={onClose}>
      <Text style={[styles.modalTitle, fonts.H4, {marginTop: 12}]}>
        Your changes were saved successfully
      </Text>
      <View style={styles.horizontalButtonContainer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => {
            onClose;
            navigation.goBack();
          }}>
          <Text style={[styles.buttonText, fonts.Btn]}>Done</Text>
        </TouchableOpacity>
      </View>
    </GenericModal>
  );

  const [agreeVisible, setAgreeVisible] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <SafeAreaView />
      <HeaderUser
        text="Add and edit photos"
        svg={<ArrowLeft color={theme.text} />}
        onPress={() => navigation.goBack()}
      />
      <ModalAgree
        visible={agreeVisible}
        onClose={() => setAgreeVisible(false)}
      />
      <View style={{paddingHorizontal: 24, flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <Text style={[fonts.B1, {marginBottom: 24, color: theme.text}]}>
            Select the photo or space that you want to add/edit.
          </Text>
          <Text style={[fonts.Btn, {color: theme.text}]}>More photos</Text>
          <View
            style={{
              width: '100%',
              marginBottom: 20,
              flexDirection: 'row',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
            }}>
            {selectedImages.map((image, index) => (
              <View key={index} style={{marginTop: 20, borderRadius: 20}}>
                {image.image_url ? (
                  <View style={{position: 'relative'}}>
                    <Image
                      source={{uri: image.image_url}}
                      style={{width: 150, height: 155, borderRadius: 20}}
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        zIndex: 20,
                        top: Platform.OS === 'ios' ? 5 : 5,
                        right: 5,
                      }}
                      onPress={() => {
                        openImagePicker()
                        setTypeSave("update")
                        setIdSave(image.id)
                      }}>
                      <View
                        style={{
                          backgroundColor: theme.background,
                          zIndex: 3,
                          padding: 5,
                          borderRadius: 20,
                        }}>
                        <Edit color={theme.text} width={20} height={20} />
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => openModal()}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 40,
                      borderRadius: 20,
                      width: 150,
                      height: 155,
                      backgroundColor: theme.placeholder,
                      borderWidth: 1,
                      borderColor: theme.disable,
                    }}>
                    <Add />
                    <Text
                      style={[
                        fonts.CYB,
                        {paddingTop: 10, color: theme.textDisable},
                      ]}>
                      {infoImageOptions[index]?.label}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
          <BottomUpModal
            isVisible={modalVisible}
            onClose={closeModal}
            contentComponent={
              <Text
                style={[
                  fonts.H4,
                  {
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    color: colors.neutral.darkest,
                  },
                ]}>
                Upload your photo
              </Text>
            }
            confirmButtonText="From your gallery"
            onPressB={() => {openImagePicker()
              setTypeSave("create")
            }}
            onRrequestClose={closeModal}
          />
        </ScrollView>
      </View>
      {disableBtn3 ? (
        <></>
      ) : (
        <View
          style={{
            backgroundColor: theme.background,
            paddingHorizontal: 24,
            paddingVertical: 10,
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
          }}>
          <TouchableOpacity
            style={[
              styles.button,
              disableBtn3 && {backgroundColor: theme.disable},
            ]}
            onPress={() => ValidateImages()}
            disabled={disableBtn3}>
            <Text
              style={[
                fonts.Btn,
                {
                  color: disableBtn3 ? theme.textDisable : colors.neutral.white,
                },
              ]}>
              Save change
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.neutral.light,
    fontSize: 14,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.neutral.lighest,
    marginBottom: 24,
  },
  inputprompt: {
    fontSize: 14,
    borderRadius: 20,
    paddingBottom: 12,
    backgroundColor: colors.neutral.light,
  },
  input2: {
    borderWidth: 1,
    borderColor: colors.neutral.light,
    fontSize: 14,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingBottom: 80,
    paddingTop: 16,
    backgroundColor: colors.neutral.lighest,
    marginBottom: 24,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: colors.primary.medium,
  },
  button2: {
    backgroundColor: colors.neutral.darkest,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 0, // Coloca el botón al final de la pantalla
  },
  button3: {
    backgroundColor: colors.neutral.dark,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12, // Coloca el botón al final de la pantalla
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  codeInput: {
    borderWidth: 1,
    borderColor: colors.neutral.light,
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

  buttonContainer: {
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.neutral.light,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  optionButtonB: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.neutral.medium,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  selectedButtonsex: {
    backgroundColor: colors.primary.light,
  },
  selectedButton: {
    backgroundColor: colors.primary.light,
  },
  selectedButtonB: {
    borderColor: colors.primary.light,
  },
  optionText: {
    fontSize: 14,
    color: colors.neutral.dark,
    fontWeight: '600',
  },
  selectedText: {
    color: colors.neutral.darkest,
  },

  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },

  number: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.neutral.darkest,
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  section3: {
    color: colors.primary.medium,
    marginLeft: 12,
  },
  disabledButton: {
    backgroundColor: colors.neutral.medium,
  },
  questionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 16,
  },
  questionHeader: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
    justifyContent: 'space-between',
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
    borderRadius: 20,
    padding: 20,
    width: '80%',
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
    width: '100%',
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
  optionButton2: {
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

  optionButton3: {
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
  button4: {
    backgroundColor: colors.primary.medium,
    borderRadius: 20,
    paddingVertical: 12,
    marginBottom: 15,
    alignItems: 'center',
    marginTop: 'auto',
  },
  buttonText: {
    color: colors.neutral.white,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText2: {
    color: colors.neutral.darkest,
  },
});
