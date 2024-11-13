import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';

import Header from '../../../Components/Header';
import fonts from '../../../Utils/fonts';
import colors from '../../../Utils/colors';
import {SvgXml} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import HorizontalVerticalMenu from '../../../Components/HorizontalVerticalMenu';
import {Add, ArrowLeft, Edit, Trash, Verify} from '../../../Assets/svg';
import {useNavigation} from '@react-navigation/native';
import BottomUpModal from '../../../Components/BottomPopup';
import Headerprompts from '../../../Components/ListA/headerprompt';
import CircularProgress from '../../../Components/CircularProgress';

import {useRoute} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

import {
  launchImageLibrary,
  MediaType,
  launchCamera,
} from 'react-native-image-picker';

import Juan from './../../../Assets/img/juan.png';
import SelectComponent from '../../../Components/select';
import HeaderUser from '../../../Components/HeaderUser';
import {Upload} from '../../../Services/Uploads/Upload';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register() {
  const [text, setText] = useState('');
  const route = useRoute();
  const {url} = route.params; // Aquí obtenemos el parámetro 'url'
  const [stage, setStage] = useState(1); // Estado para controlar la etapa del proceso de registro
  const navigation = useNavigation();

  const [selectedOptionA, setSelectedOptionA] = useState(null);
  const [selectedOptionB, setSelectedOptionB] = useState(null);
  const [selectedOptionC, setSelectedOptionC] = useState(null);
  const [selectedOptionD, setSelectedOptionD] = useState(null);
  const [selectedOptionE, setSelectedOptionE] = useState(null);
  const [selectedOptionF, setSelectedOptionF] = useState(null);

  const [selectedProfile, setSelectedProfile] = useState(null);

  const [selectedImages, setSelectedImages] = useState(Array(6).fill(null)); // Estado para las imágenes seleccionadas, inicializado con 6 valores nulos

  // Función para abrir el modal

  // Valores Config Perfil
  const [formDetails, setFormDetails] = useState({
    profile_image: url,
  });

  // Verifica si ambos campos están vacíos
  const disableBtn1 = url === null;

  const handleOptionPress = (field: any, value: any) => {
    setFormDetails({...formDetails, [field]: value});
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleProfile, setModalVisibleProfile] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openModalProfile = () => {
    setModalVisibleProfile(true);
  };

  const closeModalProfile = () => {
    setModalVisibleProfile(false);
  };

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionPressMultiple = (option: any) => {
    // Creamos una copia de los detalles del formulario
    const updatedFormDetails = {...formDetails};

    // Creamos una copia del array de opciones
    const updatedOptions = [...updatedFormDetails.list];

    // Comprobamos si la opción ya está en el array de opciones
    const optionIndex = updatedOptions.indexOf(option);

    // Si la opción está en el array, la eliminamos
    if (optionIndex !== -1) {
      updatedOptions.splice(optionIndex, 1);
    } else {
      // Si la opción no está en el array y hay menos de tres opciones seleccionadas, la agregamos
      if (updatedOptions.length < 3) {
        updatedOptions.push(option);
      } else {
        // Si ya hay tres opciones seleccionadas, no hacemos nada
        return;
      }
    }

    // Actualizamos los detalles del formulario con las opciones actualizadas
    updatedFormDetails.list = updatedOptions;

    // Actualizamos el estado con los detalles del formulario actualizados
    setFormDetails(updatedFormDetails);
  };

  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked(!checked);
  };

  const menus = [
    'Sweet home Chicago',
    'Lets chat IRL',
    'A little about me',
    'Menu 4',
    'Menu 5',
  ];
  const options = {
    'Sweet home Chicago': [
      'Option 1',
      'Option 2',
      'Option 3',
      'Option 4',
      'Option 5',
      'Option 6',
    ],
    'Lets chat IRL': ['Option A', 'Option B', 'Option C'],
    'A little about me': ['Option X', 'Option Y', 'Option Z'],
    'Menu 4': ['Option X', 'Option Y', 'Option Z'],
    'Menu 5': ['Option X', 'Option Y', 'Option Z'],
  };

  // Datos de muestra para las opciones
  const dummyOptions = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
  ];

  // Callback para actualizar los prompts
  const handlePromptsChange = newPrompts => {
    setFormDetails({...formDetails, prompts: newPrompts});
  };

  // Función para manejar la selección de opciones
  const handleOptionSelect = (option: any) => {
    setSelectedOption2(option);
  };

  const [selectedOption2, setSelectedOption2] = useState(null);

  const [answers, setAnswers] = useState(['', '', '']); // Mantén el estado de los tres TextInput

  const handleOptionPressPropmpt = (index, text) => {
    const newAnswers = [...answers];
    newAnswers[index] = text;
    setAnswers(newAnswers);
  };

  const getBackgroundColor = index => {
    if (answers[index].length > 0) {
      return index % 2 === 0
        ? colors.primary.lighest
        : colors.secondary.lighest;
    }
    return colors.neutral.light;
  };

  // ImagePicker

  const handleCameraLaunchProfile = () => {
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

        setSelectedProfile(imageUri);

        setModalVisibleProfile(false);
        //await handleUploadPhoto(imageUri, type, name);
      } catch (error) {
        console.log('Error selecting image:', error);
      }
    });
  };

  // IMAGENES Profile
  const openImagePickerProfile = () => {
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

        //setSelectedProfile(imageUri);

        setModalVisibleProfile(false);
        await handleUploadPhoto(imageUri, type, name);
      } catch (error) {
        console.log('Error selecting image:', error);
      }
    });
  };

  // ImagePicker

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
        //await handleUploadPhoto(imageUri, type, name);
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
        //await handleUploadPhoto(imageUri, type, name);
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

      setFormDetails({...formDetails, profile_image: url});
      console.log(url);
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

  const UpdatePass = async () => {
    const url = 'https://the-list-api.whiz.pe/api/me/users';

    try {
      const token = await AsyncStorage.getItem('token');

      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', // Define que estás enviando JSON
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          profile_image: formDetails.profile_image, // Envía el nuevo email en el body
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // La solicitud fue exitosa
        console.log('Password actualizado correctamente:', data);
        navigation.goBack();
      } else {
        // Hubo un error
        console.error('Error al actualizar el Password:', data);
      }
    } catch (error) {
      console.error('Error en la solicitud Password:', error);
    }
  };

  const handleContinue = () => {
    UpdatePass();
  };

  const handleBackAll = () => {
    // Aquí puedes manejar la lógica para avanzar al siguiente paso del registro
    setStage(1); // Avanza a la siguiente etapa
  };

  const [prompts, setPrompts] = useState(false);

  const handleContinuex2 = () => {
    // Aquí puedes manejar la lógica para avanzar al siguiente paso del registro
    setStage(stage - 1); // Avanza a la siguiente etapa
    setPrompts(true);
  };

  const handleContinue2 = () => {
    // Aquí puedes manejar la lógica para avanzar al siguiente paso del registro
    setStage(stage + 2); // Avanza a la siguiente etapa
    setPrompts(true);
  };

  const handleBack = () => {
    // Aquí puedes manejar la lógica para avanzar al siguiente paso del registro
    setStage(stage - 1); // Avanza a la siguiente etapa
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.neutral.white}}>
      <View style={styles.container}>
        <>
          <HeaderUser
            text="Photo profile"
            svg={<ArrowLeft />}
            onPress={() => navigation.goBack()}
          />

          <ScrollView
            showsVerticalScrollIndicator={false} // Oculta la barra de desplazamiento vertical
            showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento horizontal, si es necesario
          >
            <View
              style={{
                marginTop: '20%',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              {formDetails.profile_image ? (
                <Image
                  source={{uri: formDetails.profile_image}}
                  style={{width: 200, height: 200, borderRadius: 180}}
                />
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => openModalProfile()}
                    style={{
                      padding: '24%',
                      borderRadius: 100,
                      flexDirection: 'row',
                      backgroundColor: colors.neutral.lighest,
                    }}>
                    <Add />
                  </TouchableOpacity>
                </>
              )}

              <TouchableOpacity
                style={{
                  position: 'absolute',
                  zIndex: 20,
                  top: Platform.OS === 'ios' ? height * 0.18 : height * 0.28,
                  left: width * 0.6,
                }}
                onPress={() => openModalProfile()}>
                {formDetails.profile_image && (
                  <View
                    style={{
                      backgroundColor: colors.primary.medium,
                      zIndex: 3,
                      padding: 4,
                      borderRadius: 20,
                    }}>
                    <Edit color={'#fff'} />
                  </View>
                )}
              </TouchableOpacity>
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
                    },
                  ]}>
                  Upload your photo
                </Text>
              }
              cancelButtonText="Open camera"
              confirmButtonText="From your gallery"
              onPressA={() => handleCameraLaunchProfile()}
              onPressB={() => openImagePickerProfile()}
              onRrequestClose={closeModalProfile}
            />
          </ScrollView>
        </>

        <TouchableOpacity
          style={[styles.button, disableBtn1 && styles.disabledButton]}
          onPress={handleContinue}
          disabled={disableBtn1}>
          <Text style={[fonts.Btn, {color: colors.neutral.white}]}>
            Continue
          </Text>
        </TouchableOpacity>
        <View style={{marginVertical: 8}} />
      </View>
    </SafeAreaView>
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
    backgroundColor: colors.primary.medium,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 16,
  },
  button2: {
    backgroundColor: colors.neutral.darkest,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8, // Coloca el botón al final de la pantalla
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
});
