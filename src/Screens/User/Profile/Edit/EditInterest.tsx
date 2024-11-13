import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

import fonts from '../../../../Utils/fonts';
import colors from '../../../../Utils/colors';
import { ArrowLeft } from '../../../../Assets/svg';
import {useNavigation} from '@react-navigation/native';
import HeaderUser from '../../../../Components/HeaderUser';
import {
  GetGenders,
  GetLookings,
  GetPronouns,
  GetSexInterests,
  UpdateProfile,
  MeUser,
  UpdateProfileSingle
} from '../../../../Services/User/UserServices';
import {ThemeContext} from '../../../../Components/themeContext';

export default function Register() {
  const [stage, setStage] = useState(1); // Estado para controlar la etapa del proceso de registro
  const navigation = useNavigation();
  const [sex, setSex] = useState([]);

  const [pronouns, setPronouns] = useState([]);
  const [genders, setGenders] = useState([]);
  const [looking, setLookings] = useState([]);
  const {theme, isDarkMode} = useContext(ThemeContext);
  const [user, setUser] = useState(false)
  const [toMeet, setToMeet] = useState("");

  useEffect(() => {
    const fetchPronouns = async () => {
      const data = await GetPronouns();
      setPronouns(data);
    };
    const fetchGenders = async () => {
      const data = await GetGenders();
      setGenders(data);
    };
    const fetchSex = async () => {
      const data = await GetSexInterests();
      setSex(data);
    };
    const fetchLookings = async () => {
      const data = await GetLookings();
      setLookings(data);
    };
    const fetchUser = async () => {
      try {
        const userData = await MeUser();
        setUser(userData);
        setToMeet(userData.want_to_meet)
        console.log("userData ", userData)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchLookings();
    fetchSex();
    fetchPronouns();
    fetchGenders();
    fetchUser();
  }, []); // El array vacío [] hace que useEffect se ejecute solo una vez cuando el componente se monta.

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

  // Verifica si ambos campos están vacíos

  const disableBtn2 = formDetails.prompts.length > 2;
  const disableBtn3 = !(formDetails.photos.length < 3);
  const UpdateWantToMeet =async(value)=>{
    setToMeet(value)
    const update= UpdateProfileSingle({want_to_meet:value})
      
    if ((await update) === true) {
      console.log('EXITO UPDATE');
    }
  }
  const handleOptionPress = (field: any, value: any) => {
    console.log(field)
    setFormDetails(prevState => ({
      ...prevState,
      [field]: value,
    }));
    if(field=="want_to_meet"){
      UpdateWantToMeet(value)
    }
  };

  const ValidateForm = async () => {
    // Si ambas validaciones son verdaderas, no hay errores

    //RegisterUser(name, last_name, phone, birthdate, email, password)
    const Create = UpdateProfile({
      age:formDetails.age,
      height:formDetails.height,
      description:formDetails.description,
      relationship:formDetails.relationship,
      google_id:formDetails.google_id,
      apple_id:formDetails.apple_id,
      profile_image:formDetails.profile_image,
      neighborhood:formDetails.neighborhood,
      distance_min:formDetails.distance_min,
      distance_max:formDetails.distance_max,
      age_min:formDetails.age_min,
      age_max:formDetails.age_max,
      is_share_my_location:formDetails.is_share_my_location,
      want_to_meet:formDetails.want_to_meet,
      work:formDetails.work,
      school:formDetails.school,
      job_name:formDetails.job_name,
      latitude:formDetails.latitude,
      longitude:formDetails.longitude,
      pronouns_id:formDetails.pronouns_id,
      religions_id:formDetails.religions_id,
      politicals_id:formDetails.politicals_id,
      lifestyle_active_id:formDetails.lifestyle_active_id,
      lifestyle_drink_id:formDetails.lifestyle_drink_id,
      lifestyle_tabacco_id:formDetails.lifestyle_tabacco_id,
      lifestyle_weed_id:formDetails.lifestyle_weed_id,
      lifestyle_drug_id:formDetails.lifestyle_drugs_id,
      lookings_for_id:formDetails.lookings_for_id,
      family_plans_id:formDetails.family_plans_id,
      genders_id:formDetails.genders_id,
      sex_interests_id:formDetails.sex_interests_id,
    }
    );
    if ((await Create) === true) {
      console.log('EXITO UPDATE');
      setAgreeVisible(true);
    }
  };

  const handleOptionPressMultipleList = (field: string, value: string) => {
    // Copiamos los detalles del formulario
    const updatedFormDetails = {...formDetails};

    // Comprobamos si el valor (looking_id) ya está en la lista
    const currentList = updatedFormDetails[field] || [];

    // Si el valor ya está en la lista, lo eliminamos; si no, lo añadimos
    if (
      currentList.some(
        (item: {looking_id: number}) => item.looking_id === value,
      )
    ) {
      updatedFormDetails[field] = currentList.filter(
        (item: {looking_id: number}) => item.looking_id !== value,
      );
    } else {
      updatedFormDetails[field] = [...currentList, {looking_id: value}];
    }

    // Actualizamos el estado del formulario
    setFormDetails(updatedFormDetails);

    // Log para ver el estado actualizado
    console.log(`${field} actualizados:`, updatedFormDetails[field]);
  };

  const handleBack = () => {
    // Aquí puedes manejar la lógica para avanzar al siguiente paso del registro
    setStage(stage - 1); // Avanza a la siguiente etapa
  };

  const handleContinue = () => {
    // Aquí puedes manejar la lógica para avanzar al siguiente paso del registro
    setStage(stage + 1); // Avanza a la siguiente etapa
  };

  const meet = [
    {id: "1", name: 'Dating'},
    {id: "2", name: 'BFF'},
  ];

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

  const renderContent = () => {
    switch (stage) {
      case 1:
        return (
          <View style={{backgroundColor: theme.background}}>
          <HeaderUser
            text="My type of relationship"
            svg={<ArrowLeft color={theme.text} />}
            onPress={() => navigation.goBack()}
          />
          <View style={{paddingHorizontal: 16}}>
            <Text style={[fonts.H3, {marginVertical: 20, color: theme.text}]}>
              Who do you want to meet?
            </Text>
            <Text style={[fonts.B1, {marginBottom: 24, color: theme.text}]}>
              Select how you want to interact
            </Text>
      
            <View style={styles.buttonContainer}>
              {meet?.length > 0 ? (
                meet.map((meetOption, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionButton,
                      toMeet === meetOption.id && {
                        backgroundColor: isDarkMode ? colors.primary.dark : colors.primary.light,
                        borderWidth: 0,
                      },
                    ]}
                    onPress={() => handleOptionPress('want_to_meet', meetOption.id)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        {color: theme.text},
                        toMeet === meetOption.id && styles.selectedText, // Estilo seleccionado
                      ]}
                    >
                      {meetOption.name}
                    </Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text>Loading options...</Text>
              )}
            </View>
          </View>
        </View> 
        );
      case 2:
        return (
          <View style={{backgroundColor:theme.background}}>
            <HeaderUser
              text="My type of relationship"
              svg={<ArrowLeft color={theme.text} />}
              onPress={() => handleBack()}
            />
            <ModalAgree
              visible={agreeVisible}
              onClose={() => setAgreeVisible(false)}
            />
            <ScrollView
              showsVerticalScrollIndicator={false} // Oculta la barra de desplazamiento vertical
              showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento horizontal, si es necesario
              style={{marginHorizontal: 16}}>
              <Text
                style={[
                  fonts.H3,
                  {marginVertical: 20, color: colors.neutral.dark},
                ]}>
                What are you looking for?
              </Text>
              {/* Botones de opción */}
              <View style={styles.buttonContainer}>
                {looking?.length > 0 ? (
                  looking.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.optionButton,
                        formDetails.lookings.some(
                          selectedItem => selectedItem.looking_id === item.id,
                        ) && styles.selectedButton, // Cambiamos a verificar por looking_id
                      ]}
                      onPress={() =>
                        handleOptionPressMultipleList('lookings', item.id)
                      } // Llamamos a la función pasando el `looking_id`
                    >
                      <Text
                        style={[
                          styles.optionText,{color:theme.text},
                          formDetails.lookings.some(
                            selectedItem => selectedItem.looking_id === item.id,
                          ) && styles.selectedText, // Cambiamos a verificar por looking_id
                        ]}>
                        {item.name}
                      </Text> 
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text>Loading genders...</Text>
                )}
              </View>
            </ScrollView>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.background}}>
      <View style={styles.container}>
        {renderContent()}
        {stage === 1 && ( // Muestra el botón "Continue" solo en la primera etapa del proceso
          <View
            style={[
              styles.bannerContainer,
              {backgroundColor: theme.background, paddingHorizontal: 0},
            ]}>
            {/* <TouchableOpacity
              style={[
                styles.button3,
                formDetails.want_to_meet.length < 1 && styles.disabledButton,
              ]}
              onPress={handleContinue}
              disabled={formDetails.want_to_meet.length < 1}>
              <Text style={[fonts.Btn, { color: formDetails.want_to_meet.length < 1
                      ? theme.textDisable
                      : colors.neutral.white,}]}>
                Continue
              </Text>
            </TouchableOpacity> */}
          </View>
        )}
        {stage === 2 && ( // Muestra el botón "Continue" solo en la primera etapa del proceso
          <View
            style={[
              styles.bannerContainer,
              {backgroundColor: theme.background, paddingHorizontal: 0},
            ]}>
            <TouchableOpacity
              style={[
                styles.button3,
                formDetails.lookings.length < 1 && styles.disabledButton,
              ]}
              onPress={ValidateForm}
              disabled={formDetails.lookings.length < 1}>
              <Text style={[fonts.Btn, {color: colors.neutral.white}]}>
                Continue
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
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 80, // Asegura espacio para el botón
  },
  keyboardContainer: {
    flexGrow: 1,
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
    position: 'absolute',
    bottom: 20, // Espacio desde la parte inferior
    left: 20,
    right: 20,
  },
  button2: {
    backgroundColor: colors.neutral.darkest,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 0, // Coloca el botón al final de la pantalla
  },
  button3: {
    backgroundColor: colors.primary.medium,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 16,
    marginHorizontal: 16,
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
    fontWeight: '600',
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

  //
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
  bannerContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
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

{
  /* 
   <View style={{paddingHorizontal:16}}>
              <Text
                style={[
                  fonts.H3,
                  {marginVertical: 20, color: colors.neutral.darkest},
                ]}>
                Who do you want to date?
              </Text>
              <Text
                style={[
                  fonts.B1,
                  {marginBottom: 24, color: colors.neutral.darkest},
                ]}>
                Select the gender of your interest.
              </Text>
  
              <View style={styles.buttonContainer}>
                {sex?.length > 0 ? (
                  sex?.map((sex, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.optionButton,
                        formDetails.sex_interests_id === sex.id &&
                          styles.selectedButton,
                      ]}
                      onPress={() => {
                        handleOptionPress('sex_interests_id', sex.id),
                          handleOptionPress('sex_interests_id', sex.id);
                      }}>
                      <Text
                        style={[
                          styles.optionText,
                          formDetails.sex_interest === sex.name &&
                            styles.selectedText,
                        ]}>
                        {sex.name}
                      </Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text>Loading genders...</Text>
                )}
              </View>
              </View>
  */
}
