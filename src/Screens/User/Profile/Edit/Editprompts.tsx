import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';

import Header from '../../../../Components/Header';
import fonts from '../../../../Utils/fonts';
import colors from '../../../../Utils/colors';
import HorizontalVerticalMenu from '../../../../Components/HorizontalVerticalMenu';
import {Add, ArrowLeft, Trash} from '../../../../Assets/svg';
import {useNavigation} from '@react-navigation/native';
import Headerprompts from '../../../../Components/ListA/headerprompt';

const {width, height} = Dimensions.get('window');

import {
  launchImageLibrary,
  MediaType,
  launchCamera,
} from 'react-native-image-picker';

import Juan from './../../../../Assets/img/juan.png';
import SelectComponent from '../../../../Components/select';
import HeaderUser from '../../../../Components/HeaderUser';
import {
  GetPrompts,
  GetPromptsMe,
  UpdateProfile,
} from '../../../../Services/User/UserServices';
import {ThemeContext} from '../../../../Components/themeContext';
import axios from 'axios';
import {environment} from '../../../../Services/environtment';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register() {
  const [text, setText] = useState('');
  const [stage, setStage] = useState(1); // Estado para controlar la etapa del proceso de registro
  const navigation = useNavigation();
  const {theme, isDarkMode} = useContext(ThemeContext);

  const [selectedOptionA, setSelectedOptionA] = useState(null);
  const [selectedOptionB, setSelectedOptionB] = useState(null);
  const [selectedOptionC, setSelectedOptionC] = useState(null);
  const [selectedOptionD, setSelectedOptionD] = useState(null);
  const [selectedOptionE, setSelectedOptionE] = useState(null);
  const [selectedOptionF, setSelectedOptionF] = useState(null);

  const [selectedProfile, setSelectedProfile] = useState(null);

  const [selectedImages, setSelectedImages] = useState(Array(6).fill(null)); // Estado para las imágenes seleccionadas, inicializado con 6 valores nulos
  const [promptsMenu, setPromptsMenu] = useState([]);
  const [promptsMe, setPromptsMe] = useState([]);

  useEffect(() => {
    const fetchPromptsMe = async () => {
      const data = await GetPromptsMe();
      setPromptsMe(data);
      console.log('promps me', data);
    };

    fetchPromptsMe();
  }, []); 

  useEffect(() => {
    const fetchPrompts = async () => {
      const data = await GetPrompts();
      setPromptsMenu(data);
      console.log('aaarrgghhhp', data);
    };

    fetchPrompts();
  }, []); // El array vacío [] hace que useEffect se ejecute solo una vez cuando el componente se monta.

  // Valores Config Perfil
  const [formDetails, setFormDetails] = useState({
    age: '',
    apple_id: '',
    childrens: '',
    description: '',
    distance_max: 100,
    distance_min: 1,
    ethnicity: '',
    family_plans: '',
    gender: '',
    genders_id: '',
    google_id: '',
    height: '',
    is_accept_terms: true,
    is_receive_marketing: true,
    latitude: '',
    longitude: '',
    list: [],
    lookings: [], // Campo modificado
    looking_for: '',
    percentage_profile: '',
    prompts: [],
    photos: [],
    pronouns: '',
    pronouns_id: '',
    relationship: '',
    work: '', // Campo modificado
    sex_interest: '',
    sex_interests_id: '',
    sun_sign: '',
    jobtitle: '', // Campos adicionales añadidos
    school: '',
    education: '',
    religion: '',
    political: '',
    active: '',
    drink: '',
    smoke: '',
    profile_photo: '',
    deleted_at: '',
  });

  // Verifica si ambos campos están vacíos
  const disableBtn1 =
    formDetails.pronouns.trim() === '' || formDetails.gender.trim() === '';
  const disableBtn2 =
    formDetails.prompts.length === 0 || formDetails.prompts.length > 3;
  const disableBtn3 = !(formDetails.photos.length < 3);

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

  const [selectedOption2, setSelectedOption2] = useState(null);

  const [answers, setAnswers] = useState(['', '', '']); // Mantén el estado de los tres TextInput

  const handleOptionPressPropmpt = (index: any, text: any) => {
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

  const handleContinue = () => {
    // Aquí puedes manejar la lógica para avanzar al siguiente paso del registro
    setStage(stage + 1); // Avanza a la siguiente etapa
  };

  const handleBackAll = () => {
    // Aquí puedes manejar la lógica para avanzar al siguiente paso del registro
    setStage(1); // Avanza a la siguiente etapa
  };

  const [prompts, setPrompts] = useState(false);

  const handleContinuex2 = () => {
    setStage(stage - 1); // Avanza a la siguiente etapa
    setPrompts(true);
  };

  const ValidateForm = async () => {
    // Si ambas validaciones son verdaderas, no hay errores

    //RegisterUser(name, last_name, phone, birthdate, email, password)
    // const Create = UpdateProfile(
    //   formDetails.age,
    //   formDetails.apple_id,
    //   formDetails.childrens,
    //   formDetails.description,
    //   formDetails.distance_max,
    //   formDetails.distance_min,
    //   formDetails.ethnicity,
    //   formDetails.family_plans,
    //   formDetails.gender,
    //   formDetails.genders_id,
    //   formDetails.google_id,
    //   formDetails.height,
    //   formDetails.is_accept_terms,
    //   formDetails.is_receive_marketing,
    //   formDetails.latitude,
    //   formDetails.longitude,
    //   formDetails.list, // Esto parece referirse a `lookings`, asegúrate de que esto esté en `formDetails`.
    //   formDetails.lookings,
    //   formDetails.looking_for,
    //   formDetails.percentage_profile,
    //   formDetails.prompts,
    //   formDetails.photos,
    //   formDetails.pronouns,
    //   formDetails.pronouns_id,
    //   formDetails.relationship,
    //   formDetails.work, // Esto parece referirse a `role`, asegúrate de que esté en `formDetails`.
    //   formDetails.sex_interest,
    //   formDetails.sex_interests_id,
    //   formDetails.sun_sign,
    //   formDetails.jobtitle, // Asegúrate de que estos campos adicionales estén en `formDetails`.
    //   formDetails.school,
    //   formDetails.education,
    //   formDetails.religion,
    //   formDetails.political,
    //   formDetails.active,
    //   formDetails.drink,
    //   formDetails.smoke,
    //   formDetails.profile_photo,
    //   formDetails.deleted_at,
    // );
    // if ((await Create) === true) {
    //   navigation.goBack();
    // }
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

  const [promptsWithNames, setPromptsWithNames] = useState([]); // Aquí almacenas los prompts con sus nombres y respuestas

  // Esta función se llama cuando cambias las opciones seleccionadas
  const handleSelectedOptionsChange = async (options: any) => {
    const promptIds = Object.values(options)
      .flat()
      .map((opt: any) => opt.prompt_id);

    // Llama a la API por cada prompt_id y obtén sus detalles
    const fetchPrompts = async () => {
      try {
        const promises = promptIds.map(id =>
          axios.get(`${environment.urlApi}/api/prompts?id=${id}`),
        );
        const results = await Promise.all(promises);

        // Asumiendo que cada `res.data.data` es un array
        const formattedPrompts = results.flatMap(res =>
          res.data.data.map((prompt: any) => ({
            prompt_id: prompt.id, // Aquí sacas el prompt_id
            name: prompt.name, // El nombre del prompt
            reply: '', // Inicialmente vacío para que luego se llene con la respuesta del usuario
          })),
        );

        setPromptsWithNames(formattedPrompts);
        console.log('Formatted prompts with names:', formattedPrompts);
      } catch (error) {
        console.error('Error fetching prompts:', error);
      }
    };

    fetchPrompts();
  };

  const handleReplyChange = (promptId: number, reply: string) => {
    setPromptsWithNames(prevPrompts => {
      const updatedPrompts = prevPrompts.map(prompt =>
        prompt.prompt_id === promptId ? {...prompt, reply} : prompt,
      );

      // Agrega un console.log aquí para ver el estado actualizado de los prompts
      console.log('Updated prompts with replies:', updatedPrompts);

      return updatedPrompts;
    });
  };

  const handleSubmit = async (): Promise<boolean> => {
    // Prepara los prompts con sus respuestas en el formato requerido
    const promptsToSubmit = promptsWithNames.map(prompt => ({
      prompt_id: prompt.prompt_id,
      reply: prompt.reply,
    }));

    try {
      // Obtiene el token de AsyncStorage
      const token = await AsyncStorage.getItem('token');

      // Configura los encabezados con el token
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

      console.log('Request body:', {prompts: promptsToSubmit});

      // Envía los prompts con sus respuestas al backend en el formato correcto y con los encabezados adecuados
      await axios.patch(
        `${environment.urlApi}/api/me/prompts`,
        {prompts: promptsToSubmit},
        {headers},
      );
      console.log('Prompts successfully submitted:', promptsToSubmit);
      return true; // Indica que el envío fue exitoso
    } catch (error) {
      console.error('Error submitting prompts:', error);
      return false; // Indica que hubo un error
    }
  };

  const handlePrompt = async () => {
    const submitSuccess = await handleSubmit(); // Espera el resultado de handleSubmit

    if (submitSuccess) {
      navigation.goBack(); // Solo se llama si handleSubmit fue exitoso
    } else {
      console.log('Submission failed. handleContinue will not be executed.');
    }
  };

  {
    /* 
    return (
      <View style={{ flex: 1, backgroundColor: colors.neutral.white, paddingHorizontal: 16 }}>
        <SafeAreaView />
    
        <Header onPress={() => handleBack()} />
        <Text style={[fonts.H3, { marginVertical: 20, color: colors.neutral.darkest }]}>
          More about you...
        </Text>
        <Text style={[fonts.B1, { marginBottom: 24, color: colors.neutral.darkest }]}>
          Select minimum 3 prompts to let people meet you better
        </Text>
    
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {prompts === true ? (
              <>
                {selectedOptions?.map((option, index) => (
                  <View
                    key={index}
                    style={[styles.questionContainer, { backgroundColor: getBackgroundColor(index) }]}
                  >
                    <View style={styles.questionHeader}>
                      <Text style={[fonts.H4, { color: colors.neutral.darkest, width: '90%' }]}>
                        {option.reply}
                      </Text>
                      <TouchableOpacity
                        style={{ paddingHorizontal: 8, paddingTop: 4 }}
                        onPress={() => handleOptionPressPropmpt(index, '')}
                      >
                        <Trash />
                      </TouchableOpacity>
                    </View>
                    <TextInput
                      style={[styles.inputprompt, { backgroundColor: getBackgroundColor(index) }]}
                      placeholder="Enter your answer"
                      placeholderTextColor={colors.neutral.dark}
                      value={answers[index]}
                      onChangeText={(text) => handleOptionPressPropmpt(index, text)}
                      multiline
                    />
                  </View>
                ))}
    
                <View style={{ width: '100%', flex: 1, marginTop: 20, marginBottom: 40 }}>
                  <TouchableOpacity
                    onPress={() => handleContinue()}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderColor: colors.primary.medium,
                      borderWidth: 1.5,
                      padding: 28,
                      borderRadius: 20,
                      borderStyle: 'dashed',
                      flexDirection: 'row',
                    }}
                  >
                    <Add />
                    <Text style={[styles.section3, fonts.Btn]}>Add your prompts</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View style={{ width: '100%', flex: 1, marginTop: 20 }}>
                <TouchableOpacity
                  onPress={() => handleContinue()}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: colors.primary.medium,
                    borderWidth: 1.5,
                    padding: 28,
                    borderRadius: 20,
                    borderStyle: 'dashed',
                    flexDirection: 'row',
                  }}
                >
                  <Add />
                  <Text style={[styles.section3, fonts.Btn]}>Add your prompts</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
    
        
      </View>
    );
    */
  }
  const renderContent = () => {
    switch (stage) {
      case 1:
        return (
          <>
            <HeaderUser
              text="Profile prompts"
              svg={<ArrowLeft color={theme.text} />}
              onPress={() => navigation.goBack()}
            />

            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{flex: 1, paddingHorizontal: 16}}>
              <ScrollView
                showsVerticalScrollIndicator={false} // Oculta la barra de desplazamiento vertical
                showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento horizontal, si es necesario
              >
                <Text
                  style={[
                    fonts.B1,
                    {
                      marginVertical: 24,
                      color: theme.text,
                      paddingHorizontal: 5,
                    },
                  ]}>
                  Edit, add and delete that you want to show in your profile.
                </Text>
                {promptsMe.length > 0 ? (
                   <>
                   {promptsMe?.map((prompt, index) => {
                     const getDynamicBackgroundColor = (index, reply) => {
                       if (reply) {
                         return index % 2 === 0
                           ? isDarkMode
                             ? colors.secondary.light
                             : colors.secondary.lighest
                           : colors.primary.lighest; // Rosa si es par, azul si es impar
                       }
                       return getBackgroundColor(index); // Mantiene el fondo original si no tiene reply
                     };
               
                     return (
                       <View
                         key={index}
                         style={[
                           styles.questionContainer,
                           {borderColor: theme.disable},
                           {
                             backgroundColor:
                               prompt?.reply === ''
                                 ? theme.backgroundChat
                                 : getDynamicBackgroundColor(index, prompt?.reply),
                           },
                         ]}>
                         <View style={styles.questionHeader}>
                           <Text
                             style={[
                               fonts.H4,
                               {color: theme.text, width: '90%'},
                             ]}>
                             {prompt.prompt.name}
                           </Text>
                           <TouchableOpacity
                             style={{paddingHorizontal: 8, paddingTop: 4}}
                             onPress={() =>
                               handleOptionPressPropmpt(index, '')
                             }>
                             <Trash />
                           </TouchableOpacity>
                         </View>
                         <TextInput
                           style={[
                             styles.inputprompt,
                             {
                               backgroundColor:
                                 prompt?.reply === ''
                                   ? theme.backgroundChat
                                   : getDynamicBackgroundColor(index, prompt?.reply),
                             },
                           ]}
                           placeholder="Your answer"
                           placeholderTextColor={theme.tertiary}
                           value={prompt.reply}
                           onChange={e =>
                             handleReplyChange(prompt.prompt_id, e.nativeEvent.text)
                           }
                           multiline
                         />
                       </View>
                     );
                   })}
               
                   <View
                     style={{
                       width: '100%',
                       flex: 1,
                       marginTop: 20,
                       marginBottom: 40,
                     }}>
                     <TouchableOpacity
                       onPress={() => handleContinue()}
                       style={{
                         justifyContent: 'center',
                         alignItems: 'center',
                         borderColor: colors.primary.medium,
                         borderWidth: 1.5,
                         padding: 28,
                         borderRadius: 20,
                         borderStyle: 'dashed',
                         flexDirection: 'row',
                       }}>
                       <Add />
                       <Text style={[styles.section3, fonts.Btn]}>
                         Add your prompts
                       </Text>
                     </TouchableOpacity>
                   </View>
                 </>
                ) : (
                  <>
                    <View style={{width: '100%', flex: 1, marginTop: 20}}>
                      <TouchableOpacity
                        onPress={() => handleContinue()}
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderColor: colors.primary.medium,
                          borderWidth: 1.5,
                          padding: 28,
                          borderRadius: 20,
                          borderStyle: 'dashed',
                          flexDirection: 'row',
                        }}>
                        <Add />
                        <Text style={[styles.section3, fonts.Btn]}>
                          Add your prompts
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </ScrollView>
            </KeyboardAvoidingView>

            {/* {prompts === true ? (
              <TouchableOpacity
                style={[styles.button3]}
                onPress={() => handlePrompt()}>
                <Text style={[fonts.Btn, {color: colors.neutral.white}]}>
                  Continue
                </Text>
              </TouchableOpacity>
            ) : null}*/}
          </>
        );
      case 2:
        return (
          <>
            <Headerprompts onPressA={() => handleBack()} />

            <View style={{paddingHorizontal:16}}>
            <HorizontalVerticalMenu
              menus={promptsMenu}
              onSelectedOptionsChange={handleSelectedOptionsChange}
            />
            </View>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.background}}>
      <View style={styles.container}>
        {renderContent()}
        {stage === 1 &&
          prompts === true && ( // Muestra el botón "Continue" solo en la primera etapa del proceso
            <View
              style={[
                styles.bannerContainer,
                {backgroundColor: theme.background, paddingHorizontal:20},
              ]}>
            
              <TouchableOpacity
                style={[styles.button3, {marginHorizontal: 1}]}
                onPress={() => {
                  if (prompts) {
                    //handleContinue2();
                    handlePrompt(); // Llama a handlePrompt si prompts es true
                  } else {
                    handleContinue(); // Llama a handleContinue si prompts es false
                  }
                }}>
                <Text style={[fonts.Btn, {color: colors.neutral.white}]}>
                  Save change
                </Text>
              </TouchableOpacity>
            </View>
          )}

        {stage === 2 && ( // Muestra el botón "Continue" solo en la primera etapa del proceso
          <View
            style={[
              styles.bannerContainer,
              {backgroundColor: theme.background, paddingHorizontal: 0},
            ]}>
            <TouchableOpacity
              style={[styles.button3, {marginHorizontal: 20}]}
              onPress={() => handleContinuex2()}
              //disabled={disableBtn2}
            >
              <Text style={[fonts.Btn, {color: colors.neutral.white}]}>
                Continue with 3 prompts
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
    // paddingHorizontal: 16,
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
    color: colors.neutral.darkest,
  },
  inputprompt: {
    fontSize: 14,
    borderRadius: 20,
    paddingBottom: 10,
    backgroundColor: colors.neutral.light,
    color: colors.neutral.darkest,
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
    color: colors.neutral.darkest,
  },
  button: {
    backgroundColor: colors.primary.medium,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  button2: {
    backgroundColor: colors.neutral.darkest,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8, // Coloca el botón al final de la pantalla
    marginBottom: 16,
  },
  buttonL: {
    backgroundColor: colors.neutral.darkest,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8, // Coloca el botón al final de la pantalla
  },
  button3: {
    backgroundColor: colors.primary.medium,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 5,
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
    opacity: 0.5,
  },
  questionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 14,
    marginBottom: 16,
    borderWidth: 1,
  },
  questionHeader: {
    paddingTop: 10,
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  map: {
    marginVertical: 20,
    height: 240,
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
  codeInputWithDigit: {
    borderColor: colors.neutral.dark,
  },
  codeInputWithoutDigit: {
    borderColor: colors.neutral.medium,
  },
  bannerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
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
