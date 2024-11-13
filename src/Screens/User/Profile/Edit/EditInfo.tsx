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
  PermissionsAndroid,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import fonts from '../../../../Utils/fonts';
import colors from '../../../../Utils/colors';
import {ArrowLeft, Mapb} from '../../../../Assets/svg';
import {useNavigation} from '@react-navigation/native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import SelectComponent from '../../../../Components/select';
import HeaderUser from '../../../../Components/HeaderUser';
import {
  GetLifeDrugs,
  GetLifeTobacco,
  GetLifeWeed,
  UpdateEducations,
  UpdateEthnicities,
  UpdateProfile,
  UpdateSunSingns,
} from '../../../../Services/User/UserServices';

import {
  GetPronouns,
  GetGenders,
  GetEducation,
  GetReligions,
  GetPolitical,
  GetLifeActive,
  GetLifeDrink,
  GetLifeSmoke,
  GetEthnicity,
  GetSunsign,
  GetFamilyplans,
  GetLookingfor,
  MeUser,
} from '../../../../Services/User/UserServices';
import {ThemeContext} from '../../../../Components/themeContext';

export default function Register() {
  const [stage, setStage] = useState(1); // Estado para controlar la etapa del proceso de registro
  const navigation = useNavigation();
  const [isShareMyLocation, setIsShareMyLocation] = useState(false);

  const [region, setRegion] = useState(null);
  const [marker, setMarker] = useState(null);

  const [map, setMap] = useState(false);

  const [lookingfor, setLookingfor] = useState([]);
  const [familyplans, setFamilyplans] = useState([]);
  const [sunsigns, setSunsigns] = useState([]);
  const [ethnicities, setEthnicities] = useState([]);

  const [education, setEducation] = useState([]);
  const [religion, setReligion] = useState([]);
  const [political, setPolitical] = useState([]);
  const [active, setActive] = useState([]);
  const [drink, setDrink] = useState([]);
  const [smoke, setSmoke] = useState([]);

  const [smoketobaco, setSmoketobaco] = useState([]);
  const [smokeweed, setSmokeweed] = useState([]);
  const [drugs, setDrugs] = useState([]);

  const {theme} = useContext(ThemeContext);

  const [pronouns, setPronouns] = useState([]);
  const [genders, setGenders] = useState([]);

  const [user, setUser] = useState(false);

  useEffect(() => {
    console.log('Case 10 selected, running useEffect...');

    const fetchUser = async () => {
      try {
        const userData = await MeUser(); // Aquí asumes que `MeUser` es una función que obtiene datos del usuario
        setUser(userData);
       // console.log('userData', userData);
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

  useEffect(() => {
    const fetchReligion = async () => {
      try {
        const data = await GetReligions();
        const transformedOptions = data.map(item => ({
          label: item.name,
          value: item.id.toString(),
        }));
        setReligion(transformedOptions);
      } catch (error) {
        console.error('Error fetching religions:', error);
      }
    };

    const fetchPolitical = async () => {
      try {
        const data = await GetPolitical();
        const transformedOptions = data.map(item => ({
          label: item.name,
          value: item.id.toString(),
        }));
        setPolitical(transformedOptions);
      } catch (error) {
        console.error('Error fetching political views:', error);
      }
    };

    const fetchActive = async () => {
      try {
        const data = await GetLifeActive();
        const transformedOptions = data.map(item => ({
          label: item.name,
          value: item.id.toString(),
        }));
        setActive(transformedOptions);
      } catch (error) {
        console.error('Error fetching life activity:', error);
      }
    };

    const fetchDrink = async () => {
      try {
        const data = await GetLifeDrink();
        const transformedOptions = data.map(item => ({
          label: item.name,
          value: item.id.toString(),
        }));
        setDrink(transformedOptions);
      } catch (error) {
        console.error('Error fetching drink preferences:', error);
      }
    };

    const fetchSmoke = async () => {
      try {
        const data = await GetLifeSmoke();
        const transformedOptions = data.map(item => ({
          label: item.name,
          value: item.id.toString(),
        }));
        setSmoke(transformedOptions);
      } catch (error) {
        console.error('Error fetching smoke preferences:', error);
      }
    };

    const fetchEducation = async () => {
      try {
        const data = await GetEducation();
        const transformedOptions = data.map(item => ({
          label: item.name,
          value: {
            "education_id":item.id,
          },
        }));
        setEducation(transformedOptions);
      } catch (error) {
        console.error('Error fetching education levels:', error);
      }
    };

    const fetchLookingFor = async () => {
      try {
        const data = await GetLookingfor();
        const transformedOptions = data.map(item => ({
          label: item.name,
          value: item.id.toString(),
        }));
        setLookingfor(transformedOptions);
      } catch (error) {
        console.error('Error fetching education levels:', error);
      }
    };

    const fetchFamilyplans = async () => {
      try {
        const data = await GetFamilyplans();
        const transformedOptions = data.map(item => ({
          label: item.name,
          value: item.id.toString(),
        }));
        setFamilyplans(transformedOptions);
      } catch (error) {
        console.error('Error fetching education levels:', error);
      }
    };

    const fetchSunsign = async () => {
      try {
        const data = await GetSunsign();
        const transformedOptions = data.map(item => ({
          label: item.name,
          value: item,
        }));
        setSunsigns(transformedOptions);
      } catch (error) {
        console.error('Error fetching education levels:', error);
      }
    };

    const fetchEthnicity = async () => {
      try {
        const data = await GetEthnicity();
        const transformedOptions = data.map(item => ({
          label: item.name,
          value: item,
        }));
        setEthnicities(transformedOptions);
      } catch (error) {
        console.error('Error fetching education levels:', error);
      }
    };

    const fetchPronouns = async () => {
      const data = await GetPronouns();
      const transformedOptions = data.map(item => ({
        label: item.name,
        value: item.id.toString(),
      }));
      setPronouns(transformedOptions);
    };
    const fetchGenders = async () => {
      const data = await GetGenders();
      const transformedOptions = data.map(item => ({
        label: item.name,
        value: item.id.toString(),
      }));
      setGenders(transformedOptions);
    };
    const fetchTobacco = async () => {
      try {
        const data = await GetLifeTobacco();
        const transformedOptions = data.map(item => ({
          label: item.name,
          value: item.id.toString(),
        }));
        setSmoketobaco(transformedOptions);
      } catch (error) {
        console.error('Error fetching smoke preferences:', error);
      }
    };

    const fetchWeed = async () => {
      try {
        const data = await GetLifeWeed();
        const transformedOptions = data.map(item => ({
          label: item.name,
          value: item.id.toString(),
        }));
        setSmokeweed(transformedOptions);
      } catch (error) {
        console.error('Error fetching smoke preferences:', error);
      }
    };

    const fetchDrugs = async () => {
      try {
        const data = await GetLifeDrugs();
        const transformedOptions = data.map(item => ({
          label: item.name,
          value: item.id.toString(),
        }));
        setDrugs(transformedOptions);
      } catch (error) {
        console.error('Error fetching smoke preferences:', error);
      }
    };

    fetchDrugs();
    fetchWeed();
    fetchTobacco();
    fetchPronouns();
    fetchGenders();
    fetchReligion();
    fetchPolitical();
    fetchActive();
    fetchDrink();
    fetchSmoke();
    fetchEducation();
    fetchLookingFor();
    fetchFamilyplans();
    fetchSunsign();
    fetchEthnicity();
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
    age_min: '0',
    age_max: '100',
    is_share_my_location: isShareMyLocation,
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
    sunsigns: [], //
    ethnicities: [], //
    educations: [], //
  });

  // Verifica si ambos campos están vacíos
  const disableBtn1 = formDetails.age.trim() === '';

  const ValidateForm = async () => {

    //RegisterUser(name, last_name, phone, birthdate, email, password)
    const Create = UpdateProfile({
      age: formDetails.age,
      height: formDetails.height,
      description: formDetails.description,
      relationship: formDetails.relationship,
      google_id: formDetails.google_id,
      apple_id: formDetails.apple_id,
      profile_image: formDetails.profile_image,
      neighborhood: formDetails.neighborhood,
      distance_min: formDetails.distance_min,
      distance_max: formDetails.distance_max,
      age_min: formDetails.age_min,
      age_max: formDetails.age_max,
      is_share_my_location: formDetails.is_share_my_location,
      want_to_meet: formDetails.want_to_meet,
      work: formDetails.work,
      school: formDetails.school,
      job_name: formDetails.job_name,
      latitude: formDetails.latitude,
      longitude: formDetails.longitude,
      pronouns_id: formDetails.pronouns_id,
      religions_id: formDetails.religions_id,
      politicals_id: formDetails.politicals_id,
      lifestyle_active_id: formDetails.lifestyle_active_id,
      lifestyle_drink_id: formDetails.lifestyle_drink_id,
      lifestyle_smoke_id: formDetails.lifestyle_smoke_id,
      lifestyle_tabacco_id: formDetails.lifestyle_tabacco_id,
      lifestyle_weed_id: formDetails.lifestyle_weed_id,
      lifestyle_drug_id: formDetails.lifestyle_drugs_id,
      lookings_for_id: formDetails.lookings_for_id,
      family_plans_id: formDetails.family_plans_id,
      genders_id: formDetails.genders_id,
      sex_interests_id: formDetails.sex_interests_id,
       
    });
    
    const UpdateSunSing = UpdateSunSingns([formDetails.sunsigns]);
    const UpdateEthnicity = UpdateEthnicities([formDetails.ethnicities]);
    console.log("MMMM",formDetails.educations)
    const UpdateEducation = UpdateEducations([formDetails.educations]);

    if (
      (await Create) === true &&
      (await UpdateSunSing) === true &&
      (await UpdateEthnicity) === true &&
      (await UpdateEducation) === true
    ) {
      console.log('EXITO UPDATE');
      setAgreeVisible(true);
    }
  };

  const agesArray = [
    {label: '21', value: '21'},
    {label: '22', value: '22'},
    {label: '23', value: '23'},
    {label: '24', value: '24'},
    {label: '25', value: '25'},
    {label: '26', value: '26'},
    {label: '27', value: '27'},
    {label: '28', value: '28'},
    {label: '29', value: '29'},
    {label: '30', value: '30'},
    {label: '31', value: '31'},
    {label: '32', value: '32'},
    {label: '33', value: '33'},
    {label: '34', value: '34'},
    {label: '35', value: '35'},
    {label: '36', value: '36'},
    {label: '37', value: '37'},
    {label: '38', value: '38'},
    {label: '39', value: '39'},
    {label: '40', value: '40'},
    {label: '41', value: '41'},
    {label: '42', value: '42'},
    {label: '43', value: '43'},
    {label: '44', value: '44'},
    {label: '45', value: '45'},
    {label: '46', value: '46'},
    {label: '47', value: '47'},
    {label: '48', value: '48'},
    {label: '49', value: '49'},
    {label: '50', value: '50'},
    {label: '51', value: '51'},
    {label: '52', value: '52'},
    {label: '53', value: '53'},
    {label: '54', value: '54'},
    {label: '55', value: '55'},
    {label: '56', value: '56'},
    {label: '57', value: '57'},
    {label: '58', value: '58'},
    {label: '59', value: '59'},
    {label: '60', value: '60'},
    {label: '61', value: '61'},
    {label: '62', value: '62'},
    {label: '63', value: '63'},
    {label: '64', value: '64'},
    {label: '65', value: '65'},
    {label: '66', value: '66'},
    {label: '67', value: '67'},
    {label: '68', value: '68'},
    {label: '69', value: '69'},
    {label: '70', value: '70'},
    {label: '71', value: '71'},
    {label: '72', value: '72'},
    {label: '73', value: '73'},
    {label: '74', value: '74'},
    {label: '75', value: '75'},
    {label: '76', value: '76'},
    {label: '77', value: '77'},
    {label: '78', value: '78'},
    {label: '79', value: '79'},
    {label: '80', value: '80'},
    {label: '81', value: '81'},
    {label: '82', value: '82'},
    {label: '83', value: '83'},
    {label: '84', value: '84'},
    {label: '85', value: '85'},
    {label: '86', value: '86'},
    {label: '87', value: '87'},
    {label: '88', value: '88'},
    {label: '89', value: '89'},
    {label: '90', value: '90'},
    {label: '91', value: '91'},
    {label: '92', value: '92'},
    {label: '93', value: '93'},
    {label: '94', value: '94'},
    {label: '95', value: '95'},
    {label: '96', value: '96'},
    {label: '97', value: '97'},
    {label: '98', value: '98'},
    {label: '99', value: '99'},
    {label: '100', value: '100'},
  ];

  const heightTall = [
    {label: '3\' 3"', value: '99'},
    {label: '3\' 4"', value: '102'},
    {label: '3\' 5"', value: '104'},
    {label: '3\' 6"', value: '107'},
    {label: '3\' 7"', value: '109'},
    {label: '3\' 8"', value: '112'},
    {label: '3\' 9"', value: '114'},
    {label: '3\' 10"', value: '117'},
    {label: '3\' 11"', value: '119'},
    {label: '3\' 12"', value: '122'}, // Nota: 3'12" es técnicamente 4' 0"
    {label: '4\' 0"', value: '122'},
    {label: '4\' 1"', value: '124'},
    {label: '4\' 2"', value: '127'},
    {label: '4\' 3"', value: '130'},
    {label: '4\' 4"', value: '132'},
    {label: '4\' 5"', value: '135'},
    {label: '4\' 6"', value: '137'},
    {label: '4\' 7"', value: '140'},
    {label: '4\' 8"', value: '142'},
    {label: '4\' 9"', value: '145'},
    {label: '4\' 10"', value: '147'},
    {label: '4\' 11"', value: '150'},
    {label: '4\' 12"', value: '152'}, // Nota: 4'12" es técnicamente 5' 0"
    {label: '5\' 0"', value: '152'},
    {label: '5\' 1"', value: '155'},
    {label: '5\' 2"', value: '157'},
    {label: '5\' 3"', value: '160'},
    {label: '5\' 4"', value: '163'},
    {label: '5\' 5"', value: '165'},
    {label: '5\' 6"', value: '168'},
    {label: '5\' 7"', value: '170'},
    {label: '5\' 8"', value: '173'},
    {label: '5\' 9"', value: '175'},
    {label: '5\' 10"', value: '178'},
    {label: '5\' 11"', value: '180'},
    {label: '5\' 12"', value: '183'}, // Nota: 5'12" es técnicamente 6' 0"
    {label: '6\' 0"', value: '183'},
    {label: '6\' 1"', value: '185'},
    {label: '6\' 2"', value: '188'},
    {label: '6\' 3"', value: '191'},
    {label: '6\' 4"', value: '193'},
    {label: '6\' 5"', value: '196'},
    {label: '6\' 6"', value: '198'},
    {label: '6\' 7"', value: '201'},
    {label: '6\' 8"', value: '203'},
    {label: '6\' 9"', value: '206'},
    {label: '6\' 10"', value: '208'},
    {label: '6\' 11"', value: '211'},
    {label: '6\' 12"', value: '213'}, // Nota: 6'12" es técnicamente 7' 0"
    {label: '7\' 0"', value: '213'},
    {label: '7\' 1"', value: '216'},
    {label: '7\' 2"', value: '218'},
    {label: '7\' 3"', value: '221'},
    {label: '7\' 4"', value: '224'},
    {label: '7\' 5"', value: '226'},
    {label: '7\' 6"', value: '229'},
    {label: '7\' 7"', value: '231'},
    {label: '7\' 8"', value: '234'},
    {label: '7\' 9"', value: '236'},
    {label: '7\' 10"', value: '239'},
    {label: '7\' 11"', value: '241'},
    {label: '7\' 12"', value: '244'}, // Nota: 7'12" es técnicamente 8' 0"
    {label: '8\' 0"', value: '244'},
    {label: '8\' 1"', value: '246'},
    {label: '8\' 2"', value: '249'},
  ];

  const handleOptionPress = (field: any, value: any) => {
    setFormDetails(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const HandleLocation = () => {
    setMap(true);
    getCurrentLocation();
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        setMarker({
          latitude,
          longitude,
        });
        // Actualiza los valores de latitud y longitud en el formulario
        handleOptionPress('latitude', latitude);
        handleOptionPress('longitude', longitude);
        console.log('Latitude:', latitude, 'Longitude:', longitude);
      },
      error => {
        console.error(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        }
      });
    } else {
      getCurrentLocation();
    }
  }, []);

  const onMarkerDragEnd = e => {
    const {latitude, longitude} = e.nativeEvent.coordinate;
    setMarker({
      latitude,
      longitude,
    });
  };

  const [range, setRange] = useState([15, 70]);
  const sliderWidth = Dimensions.get('window').width - 40; // Ajusta esto según el padding/margin

  enableScroll = () => this.setState({scrollEnabled: true});
  disableScroll = () => this.setState({scrollEnabled: false});

  const handleSliderChange = values => {
    setRange(values); // Actualizar el estado del slider
    handleOptionPress('distance_min', values[0]); // Actualizar distance_min
    handleOptionPress('distance_max', values[1]); // Actualizar distance_max
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
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <SafeAreaView />
      <HeaderUser
        text="Personal information"
        svg={<ArrowLeft color={theme.text} />}
        onPress={() => navigation.goBack()}
      />
      <ModalAgree
        visible={agreeVisible}
        onClose={() => setAgreeVisible(false)}
      />
      <View style={styles.contentContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <ScrollView
            showsVerticalScrollIndicator={false} // Oculta la barra de desplazamiento vertical
            showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento horizontal, si es necesario
          >
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                  What is your gender?{' '}
                </Text>
                <Text
                  style={[
                    {
                      marginBottom: 10,
                      color: colors.secondary.dark,
                      fontSize: 8,
                      borderColor: theme.disable,
                    },
                  ]}>
                  (Obligatory)
                </Text>
              </View>
              <SelectComponent
                options={genders}
                onSelect={(option: any) => {
                  handleOptionPress('genders_id', option);
                  console.log('a', formDetails.genders_id);
                }}
                textOption={user?.genders ? user.genders?.name : 'Select'}
              />
            </View>

            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                  What are your pronouns?{' '}
                </Text>
                <Text
                  style={[
                    {
                      marginBottom: 10,
                      color: colors.secondary.dark,
                      fontSize: 8,
                      borderColor: theme.disable,
                    },
                  ]}>
                  (Obligatory)
                </Text>
              </View>
              <SelectComponent
                options={pronouns}
                onSelect={(option: any) => {
                  handleOptionPress('pronouns_id', option);
                  console.log('a', formDetails.pronouns_id);
                }}
                textOption={user?.pronouns ? user.pronouns?.name : 'Select'}
              />
            </View>

            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={[
                    fonts.B1,
                    {marginBottom: 10, color: colors.neutral.darkest},
                  ]}>
                  Age{' '}
                </Text>
                <Text
                  style={[
                    {
                      marginBottom: 10,
                      color: colors.secondary.dark,
                      fontSize: 8,
                    },
                  ]}>
                  (Obligatory)
                </Text>
              </View>
              <SelectComponent
                options={agesArray}
                onSelect={(option: any) => {
                  handleOptionPress('age', option);
                  console.log('age', formDetails.age);
                }}
                textOption={user?.age ? user?.age : 'select'}
              />
            </View>

            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={[
                    fonts.B1,
                    {marginBottom: 10, color: colors.neutral.darkest},
                  ]}>
                  Height{' '}
                </Text>
                <Text
                  style={[
                    {
                      marginBottom: 10,
                      color: colors.secondary.dark,
                      fontSize: 8,
                    },
                  ]}>
                  (Obligatory)
                </Text>
              </View>
              <SelectComponent
                options={heightTall}
                onSelect={(option: any) => {
                  handleOptionPress('height', option);
                  console.log('height', formDetails.height);
                }}
                textOption={user?.height ? user?.height : 'select'}
              />
            </View>

            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                  About me{' '}
                </Text>
                <Text
                  style={[
                    {
                      marginBottom: 10,
                      color: colors.secondary.dark,
                      fontSize: 8,
                      borderColor: theme.disable,
                    },
                  ]}>
                  (Obligatory)
                </Text>
              </View>
              <TextInput
                style={[
                  styles.input2,
                  {
                    backgroundColor: theme.placeholder,
                    color: theme.text,
                  },
                  formDetails.description !== ''
                    ? styles.codeInputWithDigit
                    : styles.codeInputWithoutDigit,
                ]}
                placeholder={
                  user?.description
                    ? user?.description
                    : 'Talk a little about you'
                }
                placeholderTextColor={theme.tertiary}
                multiline
                value={formDetails.description}
                onChangeText={text => handleOptionPress('description', text)}
              />
            </View>

            <View>
              <Text style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                Looking for:
              </Text>
              <SelectComponent
                options={lookingfor}
                onSelect={(option: any) => {
                  handleOptionPress('lookings_for_id', option);
                  console.log('a', formDetails.looking_for);
                }}
                textOption={
                  user?.lookings_for ? user.lookings_for?.name : 'Select'
                }
              />
            </View>

            <View>
              <Text style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                Family plans:
              </Text>
              <SelectComponent
                options={familyplans}
                onSelect={(option: any) => {
                  handleOptionPress('family_plans_id', option);
                }}
                textOption={
                  user?.family_plans ? user?.family_plans?.name : 'Select'
                }
              />
            </View>

            <View>
              <Text style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                Sun sign:
              </Text>
              <SelectComponent
                options={sunsigns}
                onSelect={(option: any) => {
                  handleOptionPress('sunsigns', option);
                }}
                textOption={
                  Array.isArray(user?.sunsigns) && user?.sunsigns?.length > 0
                    ? user.sunsigns[0]?.name
                    : 'Select'
                }
              />
            </View>

            <View>
              <Text style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                Ethnicity
              </Text>
              <SelectComponent
                options={ethnicities}
                onSelect={(option: any) => {
                  handleOptionPress('ethnicities', option);
                }}
                textOption={
                  Array.isArray(user?.ethnicities) &&
                  user?.ethnicities?.length > 0
                    ? user.ethnicities[0]?.name
                    : 'Select'
                }
              />
            </View>

            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                  My neighborhood:
                </Text>
              </View>

              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.placeholder,
                    color: theme.text,
                  },
                  formDetails.neighborhood !== ''
                    ? styles.codeInputWithDigit
                    : styles.codeInputWithoutDigit,
                ]}
                placeholder={
                  user?.neighborhood ? user.neighborhood : 'Enter your answer'
                }
                placeholderTextColor={theme.tertiary}
                value={formDetails.neighborhood}
                onChangeText={text => handleOptionPress('neighborhood', text)}
                keyboardType="numeric"
              />
            </View>

            {!map && region && (
              <TouchableOpacity
                style={[styles.buttonL, {marginBottom: 20}]}
                onPress={() => HandleLocation()}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                  }}>
                  <Mapb color={theme.background} />
                  <Text
                    style={[
                      fonts.Btn,
                      {
                        color: theme.background,
                      },
                    ]}>
                    Add location
                  </Text>
                </View>
              </TouchableOpacity>
            )}

            {map && region && (
              <>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={[
                      fonts.B1,
                      {marginBottom: 0, color: colors.neutral.darkest},
                    ]}>
                    Select your location{' '}
                  </Text>
                  <Text
                    style={[
                      {
                        marginBottom: 0,
                        color: colors.secondary.dark,
                        fontSize: 8,
                      },
                    ]}>
                    (Obligatory)
                  </Text>
                </View>
                <MapView
                  style={styles.map}
                  region={region}
                  provider={PROVIDER_GOOGLE}
                  onRegionChangeComplete={region => setRegion(region)}>
                  {marker && (
                    <Marker
                      coordinate={marker}
                      draggable
                      onDragEnd={onMarkerDragEnd}
                    />
                  )}
                </MapView>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => setMap(false)}>
                  <Text
                    style={[
                      fonts.B2,
                      {marginBottom: 20, color: colors.primary.medium},
                    ]}>
                    Delete location
                  </Text>
                </TouchableOpacity>
              </>
            )}

            <View>
              <Text style={[fonts.B2, {marginBottom: 10, color: theme.text}]}>
                Maximum distance:
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                  Range (Miles){' '}
                </Text>
                <Text
                  style={[
                    {
                      marginBottom: 10,
                      color: colors.secondary.dark,
                      fontSize: 8,
                    },
                  ]}>
                  (Between 0-100)
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 10,
                }}>
                <Text style={{color: theme.text}}>{range[0]}</Text>
                <Text style={{color: theme.text}}>{range[1]}</Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <MultiSlider
                  values={range}
                  min={0}
                  max={100}
                  onValuesChange={handleSliderChange}
                  selectedStyle={{backgroundColor: theme.disable}}
                  unselectedStyle={{backgroundColor: theme.placeholder}}
                  trackStyle={{height: 5}}
                  markerStyle={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    backgroundColor: theme.text,
                  }}
                />
              </View>
            </View>

            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                  Work{' '}
                </Text>
              </View>

              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.placeholder,
                    color: theme.text,
                    borderColor: theme.disable,
                  },
                ]}
                placeholder={user?.work ? user?.work : 'Enter your answer'}
                placeholderTextColor={theme.tertiary}
                value={formDetails.work}
                onChangeText={text => handleOptionPress('work', text)}
              />
            </View>

            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                  Job Title{' '}
                </Text>
              </View>

              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.placeholder,
                    color: theme.text,
                    borderColor: theme.disable,
                  },
                ]}
                placeholder={
                  user?.job_name ? user?.job_name : 'Enter your answer'
                }
                placeholderTextColor={theme.tertiary}
                value={formDetails.job_name}
                onChangeText={text => handleOptionPress('job_name', text)}
              />
            </View>

            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                  Where did you go to school{' '}
                </Text>
              </View>

              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.placeholder,
                    color: theme.text,
                    borderColor: theme.disable,
                  },
                ]}
                placeholder={user?.school ? user?.school : 'Enter your answer'}
                placeholderTextColor={theme.tertiary}
                value={formDetails.school}
                onChangeText={text => handleOptionPress('school', text)}
              />
            </View>

            <View>
              <Text style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                Highest level of education
              </Text>
              <SelectComponent
                options={education}
                onSelect={(option: any) => {
                  handleOptionPress('educations', option);
                }}
                textOption={
                  Array.isArray(user?.educations) &&
                  user?.educations?.length > 0
                    ? user.educations[0]?.name
                    : 'Select'
                }
              />
            </View>

            <View>
              <Text style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                Religious beliefs
              </Text>
              <SelectComponent
                options={religion}
                onSelect={(option: any) => {
                  handleOptionPress('religions_id', option);
                }}
                textOption={user?.religions ? user.religions?.name : 'Select'}
              />
            </View>

            <View>
              <Text style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                Political views
              </Text>
              <SelectComponent
                options={political}
                onSelect={(option: any) => {
                  handleOptionPress('politicals_id', option);
                }}
                textOption={user?.politicals ? user.politicals?.name : 'Select'}
              />
            </View>

            <View>
              <Text style={[fonts.B2, {marginBottom: 10, color: theme.text}]}>
                Lifestyle
              </Text>
              <View>
                <Text style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                  Are you active?
                </Text>
                <SelectComponent
                  options={active}
                  onSelect={(option: any) => {
                    handleOptionPress('lifestyle_active_id', option);
                  }}
                  textOption={
                    user?.lifestyle_active
                      ? user.lifestyle_active?.name
                      : 'Select'
                  }
                />
              </View>
              <View>
                <Text style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                  Do you drink?
                </Text>
                <SelectComponent
                  options={drink}
                  onSelect={(option: any) => {
                    handleOptionPress('lifestyle_drink_id', option);
                  }}
                  textOption={
                    user?.lifestyle_drink
                      ? user.lifestyle_drink?.name
                      : 'Select'
                  }
                />
              </View>
              <View>
                <Text style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                  Do you smoke?
                </Text>
                <SelectComponent
                  options={smoke}
                  onSelect={(option: any) => {
                    handleOptionPress('lifestyle_smoke_id', option);
                  }}
                  textOption={
                    user?.lifestyle_smoke
                      ? user.lifestyle_smoke?.name
                      : 'Select'
                  }
                />
              </View>
              <View>
                <Text
                  style={[
                    fonts.B1,
                    {marginBottom: 10, color: colors.neutral.darkest},
                  ]}>
                  Do you smoke tobacco?
                </Text>
                <SelectComponent
                  options={smoketobaco}
                  onSelect={(option: any) => {
                    handleOptionPress('lifestyle_tabacco_id', option);
                  }}
                  textOption={
                    user?.lifestyle_tabacco
                      ? user?.lifestyle_tabacco?.name
                      : 'Select'
                  }
                />
              </View>

              <View>
                <Text
                  style={[
                    fonts.B1,
                    {marginBottom: 10, color: colors.neutral.darkest},
                  ]}>
                  Do you smoke weed?
                </Text>
                <SelectComponent
                  options={smokeweed}
                  onSelect={(option: any) => {
                    handleOptionPress('lifestyle_weed_id', option);
                  }}
                  textOption={
                    user?.lifestyle_weed ? user.lifestyle_weed?.name : 'Select'
                  }
                />
              </View>

              <View>
                <Text
                  style={[
                    fonts.B1,
                    {marginBottom: 10, color: colors.neutral.darkest},
                  ]}>
                  Do you use drugs?
                </Text>
                <SelectComponent
                  options={drugs}
                  onSelect={(option: any) => {
                    handleOptionPress('lifestyle_drugs_id', option);
                  }}
                  textOption={
                    user?.lifestyle_drug ? user.lifestyle_drug?.name : 'Select'
                  }
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <TouchableOpacity
          style={[
            styles.button,
            //disableBtn1 && styles.disabledButton
          ]}
          //onPress={ () => {console.log(formDetails)}} ValidateForm
          onPress={() => {
            console.log('VALIDATE', formDetails);
            ValidateForm();
          }}
          //disabled={disableBtn1}
        >
          <Text
            style={[
              fonts.Btn,
              {
                color:
                  //disableBtn1
                  //</TouchableOpacity>? colors.neutral.darkest
                  // :
                  colors.neutral.white,
              },
            ]}>
            Save changes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 80, // Asegura espacio para el botón
  },
  keyboardContainer: {
    flexGrow: 1,
  },
  input: {
    borderWidth: 1,
    fontSize: 14,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
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
    fontSize: 14,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingBottom: 80,
    paddingTop: 16,
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
    opacity: 0.5,
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
  buttonL: {
    backgroundColor: colors.neutral.darkest,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8, // Coloca el botón al final de la pantalla
  },

  codeInputWithDigit: {
    borderColor: colors.neutral.dark,
  },
  codeInputWithoutDigit: {
    borderColor: colors.neutral.medium,
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
});
