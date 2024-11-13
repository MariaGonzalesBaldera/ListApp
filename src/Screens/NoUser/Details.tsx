import React, {useContext, useEffect, useState} from 'react';
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
  PermissionsAndroid,
  Alert,
  Switch,
} from 'react-native';
import {ThemeContext} from '../../Components/themeContext';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Header from '../../Components/Header';
import fonts from '../../Utils/fonts';
import colors from '../../Utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import HorizontalVerticalMenu from '../../Components/HorizontalVerticalMenu';
import {Add, Alertq, ArrowRight, Edit, Mapb, Trash} from '../../Assets/svg';
import {useNavigation} from '@react-navigation/native';
import BottomUpModal from '../../Components/BottomPopup';
import Headerprompts from '../../Components/ListA/headerprompt';
import CircularProgress from '../../Components/CircularProgress';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {
  Mapmg,
  Tall,
  Baby,
  People,
  Study,
  Job,
  Politic,
  Religion,
} from '../../Assets/svg';
import {environment} from '../../Services/environtment';

const {width, height} = Dimensions.get('window');

import {
  launchImageLibrary,
  MediaType,
  launchCamera,
} from 'react-native-image-picker';

import SelectComponent from '../../Components/select';
import {
  UpdateProfile,
  GetPronouns,
  GetGenders,
  GetAttributes,
  GetSexInterests,
  GetLookings,
  GetPrompts,
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
  GetLifeTobacco,
  GetLifeWeed,
  GetLifeDrugs,
  PostSunSingns,
  PostEthnicities,
} from '../../Services/User/UserServices';
import {Upload, UploadMultiple} from '../../Services/Uploads/Upload';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register() {
  const [stage, setStage] = useState(1); // Estado para controlar la etapa del proceso de registro
  const navigation = useNavigation();

  const [selectedOptionA, setSelectedOptionA] = useState(null);
  const [selectedOptionB, setSelectedOptionB] = useState(null);
  const [selectedOptionC, setSelectedOptionC] = useState(null);
  const [selectedOptionD, setSelectedOptionD] = useState(null);
  const [selectedOptionE, setSelectedOptionE] = useState(null);
  const [selectedOptionF, setSelectedOptionF] = useState(null);

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [region, setRegion] = useState(null);
  const [marker, setMarker] = useState(null);
  const [map, setMap] = useState(false);

  const [selectedMenu, setSelectedMenu] = useState('basic');

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

  const meet = [
    {id: 1, name: 'Dating'},
    {id: 2, name: 'BFF'},
  ];

  const [imagesGallery, setImagesGallery] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
  const [isShareMyLocation, setIsShareMyLocation] = useState(false); // Estado inicial booleano

  const toggleSwitch = () => {
    setIsSwitchEnabled(previousState => !previousState);
    setIsShareMyLocation(previousState => {
      const newState = !previousState;
      console.log('switch', newState); // Usamos el nuevo valor directamente aquí
      return newState;
    });
  };

  const [formDetails, setFormDetails] = useState({
    age: '', //
    height: '', //
    description: '', //
    relationship: '',
    google_id: '',
    apple_id: '',
    profile_image: '', //
    neighborhood: '', //
    distance_min: 0, //
    distance_max: 100, //
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
    lifestyle_drug_id: '', //
    lookings_for_id: '', //
    family_plans_id: '', //
    genders_id: '', //
    sex_interests_id: '', //

    prompts: [],
    photos: [],
    list: [],
    lookings: [], // ---
    educations: [], //
    meet: '',
    looking_for: '', //
    family_plans: '', //
    sunsigns: [], //
    ethnicities: [], //
  });

  {
    /*
        "age": "23",
        "height": 38,
        "description": "Aaaaaa",
        "relationship": null,
        "google_id": null,
        "apple_id": null,
        "profile_image": "https://whiz-file-dev-25-01-22.s3.us-east-2.amazonaws.com/the-list-files/media/1726430621_B7525F07-48B2-40EB-B0B2-A1A4D565BAC6.jpg",
        "neighborhood": null,
        "distance_min": 29,
        "distance_max": 67,
        "age_min": 41,
        "age_max": 78,
        "is_share_my_location": false,
        "want_to_meet": null,
        "work": "Aaaa",
        "school": "Wwww",
        "job_name": "Aaaa",
        "latitude": 37.785834,
        "longitude": -122.406417,
        "pronouns_id": null,
        "religions_id": "1",
        "politicals_id": "2",
        "lifestyle_active_id": "2",
        "lifestyle_drink_id": "1",
        "lifestyle_smoke_id": null,
        "lifestyle_tabacco_id": null,
        "lifestyle_drug_id": null,
        "lifestyle_weed_id": null,
        "lookings_for_id": null,
        "family_plans_id": 1,
        "genders_id": "2",
        "sex_interests_id": "3",
         */
  }
  const handleOptionPressMultipleList = (field: string, value: string) => {
    const updatedFormDetails = {...formDetails};
    const currentList = updatedFormDetails[field] || [];
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
    setFormDetails(updatedFormDetails);
    console.log(`${field} actualizados:`, updatedFormDetails[field]);
  };
  const handleOptionPress = (field: any, value: any) => {
 
    setFormDetails(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSliderChange = values => {
    setRange(values); // Actualizar el estado del slider
    handleOptionPress('distance_min', values[0]); // Actualizar distance_min
    handleOptionPress('distance_max', values[1]); // Actualizar distance_max
  };

  const handleSliderChange2 = values => {
    setRangeold(values); // Actualizar el estado del slider
    handleOptionPress('age_min', values[0]); // Actualizar distance_min
    handleOptionPress('age_max', values[1]); // Actualizar distance_max
  };

  const [pronouns, setPronouns] = useState([]);
  const [genders, setGenders] = useState([]);
  const [atributes, setAtributes] = useState([]);
  const [sex, setSex] = useState([]);
  const [looking, setLookings] = useState([]);
  const [promptsMenu, setPromptsMenu] = useState([]);

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

  const [user, setUser] = useState([]);

  useEffect(() => {
    if (stage === 12) {
      console.log('Case 10 selected, running useEffect...');

      const fetchUser = async () => {
        const userData = await MeUser();
        setUser(userData);
        console.log('userData', userData);
      };
      fetchUser();
    }
  }, [stage]);

  useEffect(() => {
    const fetchPronouns = async () => {
      const data = await GetPronouns();
      setPronouns(data);
    };
    const fetchGenders = async () => {
      const data = await GetGenders();
      setGenders(data);
    };
    const fetchAtributes = async () => {
      const data = await GetAttributes();
      setAtributes(data);
    };
    const fetchSex = async () => {
      const data = await GetSexInterests();
      setSex(data);
    };
    const fetchLookings = async () => {
      const data = await GetLookings();
      setLookings(data);
    };
    const fetchPrompts = async () => {
      const data = await GetPrompts();
      setPromptsMenu(data);
    };
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
          value: item.id.toString(),
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

    const fetchEthnicities = async () => {
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
        console.error('Error fetching lifeWeed preferences:', error);
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
        console.error('Error fetching life drugs preferences:', error);
      }
    };

    fetchDrugs();
    fetchWeed();
    fetchTobacco();
    fetchSex();
    fetchAtributes();
    fetchPronouns();
    fetchGenders();
    fetchLookings();
    fetchPrompts();
    fetchReligion();
    fetchPolitical();
    fetchActive();
    fetchDrink();
    fetchSmoke();
    fetchEducation();
    fetchLookingFor();
    fetchFamilyplans();
    fetchSunsign();
    fetchEthnicities();
  }, []); // El array vacío [] hace que useEffect se ejecute solo una vez cuando el componente se monta.
  const ValidateImages = async () => {
    const token = await AsyncStorage.getItem('token');

      // Configurar los encabezados con el token
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

      // Enviar las URLs de las imágenes al backend
      await axios.post(
        `${environment.urlApi}/api/me/photos`,
        {image_urls: imagesGallery},
        {headers},
      );

      console.log('Images successfully submitted:', imagesGallery);
      return true; // Indica que el envío fue exitoso
  }
  const ValidateForm = async () => {
    // Si ambas validaciones son verdaderas, no hay errores

    //RegisterUser(name, last_name, phone, birthdate, email, password)
    console.log("formDetails before services:", formDetails)
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
      lifestyle_drug_id:formDetails.lifestyle_drug_id,
      genders_id:formDetails.genders_id,
      lookings_for_id:formDetails.lookings_for_id,
      family_plans_id:formDetails.family_plans_id,
      sex_interests_id:formDetails.sex_interests_id,
      lifestyle_smoke_id:formDetails.lifestyle_smoke_id,

      looking_for:formDetails.looking_for,
      family_plans:formDetails.family_plans 
    }
    );
   
    const CreateSunSingns = PostSunSingns(
      [formDetails.sunsigns]
    );
    const CreateEthnicities = PostEthnicities(
      [formDetails.ethnicities]
    );
    
    if ((await CreateSunSingns) === true && (await Create) === true && (await CreateEthnicities) === true) {
      handleContinue();
    }
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

  const onMarkerDragEnd = (e: any) => {
    const {latitude, longitude} = e.nativeEvent.coordinate;
    setMarker({
      latitude,
      longitude,
    });
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

  const handleOptionPressMultiple = (attributeId: number) => {
    const updatedFormDetails = {...formDetails};
    const existingAttribute = updatedFormDetails.list.find(
      item => item.attribute_id === attributeId,
    );
    if (existingAttribute) {
      updatedFormDetails.list = updatedFormDetails.list.filter(
        item => item.attribute_id !== attributeId,
      );
      updatedFormDetails.list.forEach((item, index) => {
        item.priority = index + 1;
      });
    } else {
      if (updatedFormDetails.list.length < 3) {
        updatedFormDetails.list.push({
          attribute_id: attributeId,
          priority: updatedFormDetails.list.length + 1,
        });
      } else {
        // Si ya hay 3 seleccionados, no hacemos nada
        return;
      }
    }

    // Añadimos un console.log para ver la lista actualizada de atributos
    console.log('Atributos seleccionados:', updatedFormDetails.list);
    // Actualizamos el estado con los detalles actualizados
    setFormDetails(updatedFormDetails);
  };

  const [range, setRange] = useState([15, 85]);
  const [rangeold, setRangeold] = useState([15, 85]);

  const [selectedOptions, setSelectedOptions] = useState([]); // Aquí almacenas los prompt_id
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

  // Verifica si ambos campos están vacíos
  // Verifica si ambos campos están vacíos
  const disableBtn1 =
    formDetails.pronouns_id === '' || formDetails.genders_id === '';

  //const disableBtn2 = formDetails.prompts.length === 0 || formDetails.prompts.length > 3;
  const disableBtn3 = !(formDetails.photos.length < 3);

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
      await axios.post(
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

  const handleAttributes = async (): Promise<boolean> => {
    // Prepara los atributos con su ID y prioridad
    const attributesToSubmit = formDetails.list.map(attribute => ({
      attribute_id: attribute.attribute_id,
      priority: attribute.priority,
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

      // Log para ver el cuerpo de la solicitud antes de enviarlo
      console.log('Request body:', {attributes: attributesToSubmit});

      // Envía los atributos con sus prioridades al backend
      await axios.post(
        `${environment.urlApi}/api/me/attributes`,
        {attributes: attributesToSubmit},
        {headers},
      );

      // Log para confirmar que la solicitud fue exitosa
      console.log('Attributes successfully submitted:', attributesToSubmit);
      return true; // Indica que el envío fue exitoso
    } catch (error) {
      console.error('Error submitting attributes:', error);
      return false; // Indica que hubo un error
    }
  };

  const handleLooking = async (): Promise<boolean> => {
    const lookingsToSubmit = formDetails.lookings; // Ya tiene el formato [{ looking_id: 6 }, { looking_id: 5 }]

    try {
      const token = await AsyncStorage.getItem('token');

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

      console.log('Request body:', {lookings: lookingsToSubmit});

      await axios.post(
        `${environment.urlApi}/api/me/lookings`,
        {lookings: lookingsToSubmit},
        {headers},
      );

      console.log('Lookings successfully submitted:', lookingsToSubmit);
      return true;
    } catch (error) {
      console.error('Error submitting lookings:', error);
      return false;
    }
  };

  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked(!checked);
  };

  const dummyOptions = [
    {label: 'Option 1', value: 'option1'},
    {label: 'Option 2', value: 'option2'},
    {label: 'Option 3', value: 'option3'},
    {label: 'Option 4', value: 'option4'},
    {label: 'Option 5', value: 'option5'},
  ];

  const infoImageOptions = [
    {label: 'Headshots', value: '1'},
    {label: 'Full body', value: '2'},
    {label: 'Smilling', value: '3'},
    {label: 'Just you', value: '4'},
    {label: 'Recent', value: '5'},
    {label: 'Candids', value: '6'},
  ];

  // Callback para actualizar los prompts
  const handlePromptsChange = (newPrompts: any) => {
    setFormDetails({...formDetails, prompts: newPrompts});
  };

  // Función para manejar la selección de opciones
  const handleOptionSelect = (option: any) => {
    setSelectedOption2(option);
  };

  const [selectedOption2, setSelectedOption2] = useState(null);

  const [answers, setAnswers] = useState(['', '', '']); // Mantén el estado de los tres TextInput

  const handleOptionPressPropmpt = (index: any, text: any) => {
    const newAnswers = [...answers];
    newAnswers[index] = text;
    setAnswers(newAnswers);
  };

  const getBackgroundColor = (index: any) => {
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
        await handleUploadPhoto(imageUri, type, name);
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

        setSelectedProfile(imageUri);

        setModalVisibleProfile(false);
        await handleUploadPhoto(imageUri, type, name);
      } catch (error) {
        console.log('Error selecting image:', error);
      }
    });
  };

  // IMAGENES ARRAY
  // ImagePicker
  const handleCameraLaunch = async () => {
    try {
      const options = {
        mediaType: 'photo', // or 'video' depending on your requirements
        includeBase64: false,
        maxHeight: 800,
        maxWidth: 800,
        quality: 1,
        selectionLimit: 6, // Permitir hasta 6 imágenes seleccionadas
        storageOptions: {
          skipBackup: true,
          path: 'images', // Ruta donde se almacenará el archivo
        },
      };

      launchCamera(options, async response => {
        try {
          if (response.didCancel) {
            console.log('User cancelled camera');
            return;
          }

          if (!response.assets || response.assets.length === 0) {
            console.log('No image selected');
            return;
          }

          // Verificar si se seleccionaron al menos 3 imágenes
          if (response.assets.length < 3) {
            Alert.alert(
              'Permiso denegado',
              'Por favor, selecciona al menos 3 imágenes.',
            );
            return;
          }

          const formDataArray = response.assets.map(asset => ({
            uri: asset.uri,
            type: asset.type || 'image/jpeg',
            name: asset.fileName || 'image.jpg',
          }));

          setModalVisible(false);

          // Llamar a la función handleUploadPhoto con el array de objetos FormData
          const urisArray = formDataArray.map((formData: any) => formData.uri);
          setSelectedImages(urisArray); // Guarda las imágenes seleccionadas
          console.log('Image selected', selectedImages);
          await handleUploadPhotoMultiple(formDataArray); // Aquí puedes manejar el envío de las imágenes
        } catch (error) {
          console.log('Error selecting image:', error);
        }
      });
    } catch (error) {
      console.log('Error launching camera:', error);
    }
  };

  // IMAGENES
  const openImagePickerMultiple = async () => {
    try {
      const options = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 800,
        maxWidth: 800,
        quality: 1,
        selectionLimit: 6, // Permitir hasta 3 imágenes seleccionadas
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

          // Verificar si se seleccionaron al menos 3 imágenes
          if (response.assets.length < 3) {
            Alert.alert(
              'Permiso denegado',
              'Por favor, selecciona al menos 3 imágenes.',
            );
            return;
          }

          const formDataArray = response.assets.map(asset => ({
            uri: asset.uri,
            type: asset.type || 'image/jpeg',
            name: asset.fileName || 'image.jpg',
          }));

          setModalVisible(false);

          // Llamar a la función handleUploadPhoto con el array de objetos FormData
          const urisArray = formDataArray.map((formData: any) => formData.uri);
          setSelectedImages(urisArray);
          console.log(' image selected', selectedImages);
          await handleUploadPhotoMultiple(formDataArray);
        } catch (error) {
          console.log('Error selecting image:', error);
        }
      });
    } catch (error) {
      console.log('Error opening image picker:', error);
    }
  };

  const {theme, isDarkMode} = useContext(ThemeContext);

  const handleUploadPhotoMultiple = async (formDataArray: any) => {
    try {
      // Lógica de carga de la imagen
      console.log('Uploading photos:', formDataArray);
      const formDataImg = new FormData();
      formDataArray.map(async (formData: any) => {
        formDataImg.append('files', formData);
      });

      // Subir las imágenes
      const status = await UploadMultiple(formDataImg);
      const urls = status;

      setModalVisibleProfile(false);

      // Crear el array de objetos con las URLs de las imágenes
      const imagesArray = urls.map(url => ({image_url: url}));

      // Establecer el estado con el array de imágenes
      setImagesGallery(imagesArray);

      //setFormDetails({...formDetails, photos: imagesArray});

      //console.log('imagen ARRAY',imagesArray)
      // Obtiene el token de AsyncStorage
      // Obtener el token de AsyncStorage
      
    } catch (error: any ) {
      console.error('Error submitting prompts:', error);

      // Manejo de errores
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }

      return false; // Indica que hubo un error
    }
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

  const iconsWithData = [
    {Icon: Tall, data: user?.height},
    {Icon: Mapmg, data: user?.neighborhood},
    {Icon: Baby, data: user?.family_plans?.name},
    {Icon: Religion, data: user?.religions?.name},
    {Icon: People, data: user?.religions?.name},
    {Icon: Study, data: user?.school},
    {Icon: Job, data: user?.work},
    {Icon: Politic, data: user?.politicals?.name},
  ];

  const RowItem = ({text, Icon, data}: any) => (
    <View style={styles.row}>
      <Icon color={theme.text} height="24" width="24" style={styles.svg} />
      <Text style={[styles.text, {color: theme.text}]}>
        {text} {data}
      </Text>
    </View>
  );

  const images = user?.photos?.map(photo => ({uri: photo.image_url}));

  const renderContent = () => {
    switch (stage) {
      case 1:
        return (
          <>
            <Header onPress={() => handleBack()} />
            <Text style={[fonts.H3, {marginVertical: 20, color: theme.text}]}>
              Who do you want to meet?
            </Text>
            <Text style={[fonts.B1, {marginBottom: 24, color: theme.text}]}>
              Select how you want to interact
            </Text>

            <View style={styles.buttonContainer}>
              {meet?.length > 0 ? (
                meet?.map((meet, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionButton,
                      formDetails.want_to_meet === meet.id &&
                      {backgroundColor:isDarkMode?colors.primary.dark:colors.primary.light,borderWidth:0},
                    ]}
                    onPress={() => {
                      handleOptionPress('want_to_meet', meet.id),
                        handleOptionPress('want_to_meet', meet.id);
                    }}>
                    <Text
                      style={[
                        [styles.optionText,{color:theme.text}],
                        {color: theme.text},
                        formDetails.want_to_meet === meet.name &&
                          styles.selectedText,
                      ]}>
                      {meet.name}
                    </Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text>Loading genders...</Text>
              )}
            </View>
          </>
        );
      case 2:
        return (
          <>
            <Header onPress={() => handleBack()} />
            <Text style={[fonts.H3, {marginVertical: 20, color: theme.text}]}>
              Who do you want to date?
            </Text>
            <Text style={[fonts.B1, {marginBottom: 24, color: theme.text}]}>
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
                      {backgroundColor:isDarkMode?colors.primary.dark:colors.primary.light,borderWidth:0},

                        
                    ]}
                    onPress={() => {
                      handleOptionPress('sex_interests_id', sex.id),
                        handleOptionPress('sex_interests_id', sex.id);
                    }}>
                    <Text
                      style={[
                        styles.optionText,
                        {color: theme.text},
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
          </>
        );
      case 3:
        return (
          <>
            <Header onPress={() => navigation.navigate('ProfileCreate')} />
            <ScrollView
              showsVerticalScrollIndicator={false} // Oculta la barra de desplazamiento vertical
              showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento horizontal, si es necesario
            >
              <Text style={[fonts.H3, {marginVertical: 20, color: theme.text}]}>
                {' '}
                Which gender best describes you?
              </Text>

              <View style={styles.buttonContainer}>
                {genders?.length > 0 ? (
                  genders?.map((gender, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.optionButton,
                        formDetails.genders_id === gender.id &&
                        {backgroundColor:isDarkMode?colors.primary.dark:colors.primary.light,borderWidth:0},
                      ]}
                      onPress={() => {
                        handleOptionPress('genders_id', gender.id);
                      }}>
                      <Text
                        style={[
                          styles.optionText,
                          {color: theme.text},
                          formDetails.gender === gender.name &&
                            styles.selectedText,
                        ]}>
                        {gender.name}
                      </Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text>Loading genders...</Text>
                )}
              </View>

              <Text style={[fonts.H3, {marginVertical: 10, color: theme.text}]}>
                What are your pronouns?
              </Text>
              <View style={styles.buttonContainer}>
                {pronouns?.length > 0 ? (
                  pronouns?.map((pronoun, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.optionButton,
                        formDetails.pronouns_id === pronoun.id &&
                        {backgroundColor:isDarkMode?colors.primary.dark:colors.primary.light,borderWidth:0},
                      ]}
                      onPress={() => {
                        handleOptionPress('pronouns_id', pronoun.id);
                      }}>
                      <Text
                        style={[
                          styles.optionText,
                          {color: theme.text},
                          formDetails.pronouns === pronoun.name &&
                            styles.selectedText,
                        ]}>
                        {pronoun.name}
                      </Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text>Loading pronouns...</Text>
                )}
              </View>
            </ScrollView>
          </>
        );
      case 4:
        return (
          <>
            <Header onPress={() => handleBack()} />
            <ScrollView
              showsVerticalScrollIndicator={false} // Oculta la barra de desplazamiento vertical
              showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento horizontal, si es necesario
            >
              <Text style={[fonts.H3, {marginVertical: 20, color: theme.text}]}>
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
                        ) && 
                        {backgroundColor:isDarkMode?colors.primary.dark:colors.primary.light,borderWidth:0}, // Cambiamos a verificar por looking_id
                      ]}
                      onPress={() =>
                        handleOptionPressMultipleList('lookings', item.id)
                      } // Llamamos a la función pasando el `looking_id`
                    >
                      <Text
                        style={[
                          styles.optionText,
                          {color: theme.text},
                          formDetails.lookings.some(
                            selectedItem => selectedItem.looking_id === item.id,
                          ) && styles.ass, // Cambiamos a verificar por looking_id
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
          </>
        );

      case 5:
        return (
          <>
            <Header onPress={() => handleBack()} />
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{flex: 1}}>
              <ScrollView
                showsVerticalScrollIndicator={false} // Oculta la barra de desplazamiento vertical
                showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento horizontal, si es necesario
              >
                <View>
                  <Text
                    style={[fonts.H3, {marginVertical: 20, color: theme.text}]}>
                    A little about you...
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
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
                    textOption={'Select'}
                  />
                </View>

                <View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
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
                    textOption={'Select'}
                  />
                </View>

                <View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                      About me{' '}
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
                  <TextInput
                    style={[
                      styles.input2,
                      formDetails.description !== ''
                        ? styles.codeInputWithDigit
                        : styles.codeInputWithoutDigit,
                      {
                        backgroundColor: theme.placeholder,
                        color: theme.text,
                        borderColor: theme.disable,
                      },
                    ]}
                    placeholder="Talk a little about you"
                    placeholderTextColor={theme.textDisable}
                    multiline
                    value={formDetails.description}
                    onChangeText={text =>
                      handleOptionPress('description', text)
                    }
                  />
                </View>

                <View>
                  <Text
                    style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                    Looking for:
                  </Text>
                  <SelectComponent
                    options={lookingfor}
                    onSelect={(option: any) => {
                      handleOptionPress('lookings_for_id', option);
                      console.log('a', formDetails.looking_for);
                    }}
                    textOption={'Select'}
                  />
                </View>

                <View>
                  <Text
                    style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                    Family plans:
                  </Text>
                  <SelectComponent
                    options={familyplans}
                    onSelect={(option: any) => {
                      handleOptionPress('family_plans_id', option);
                    }}
                    textOption={'Select'}
                  />
                </View>

                <View>
                  <Text
                    style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                    Sun sign:
                  </Text>
                  <SelectComponent
                    options={sunsigns}
                    onSelect={(option: any) => {
                      handleOptionPress('sunsigns', option);
                    }}
                    textOption={'Select'}
                  />
                </View>

                <View>
                  <Text
                    style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                    Ethnicity
                  </Text>
                  <SelectComponent
                    options={ethnicities}
                    onSelect={(option: any) => {
                      handleOptionPress('ethnicities', option);
                    }}
                    textOption={'Select'}
                  />
                </View>

                <View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                      My neighborhood:
                    </Text>
                  </View>

                  <TextInput
                    style={[
                      styles.input,
                      formDetails.neighborhood !== ''
                        ? styles.codeInputWithDigit
                        : styles.codeInputWithoutDigit,
                      {
                        backgroundColor: theme.placeholder,
                        color: theme.text,
                        borderColor: theme.disable,
                      },
                    ]}
                    placeholder="Enter their zip code"
                    placeholderTextColor={theme.textDisable}
                    value={formDetails.neighborhood}
                    onChangeText={text =>
                      handleOptionPress('neighborhood', text)
                    }
                    keyboardType="numeric"
                  />
                </View>

                {!map && region && (
                  <TouchableOpacity
                    style={[
                      styles.buttonL,
                      {marginBottom: 20, backgroundColor: theme.text},
                    ]}
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
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
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
                    placeholder="Enter your answer"
                    placeholderTextColor={theme.textDisable}
                    value={formDetails.work}
                    onChangeText={text => handleOptionPress('work', text)}
                  />
                </View>

                <View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                      Job Tittle{' '}
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
                    placeholder="Enter your answer"
                    placeholderTextColor={theme.textDisable}
                    value={formDetails.job_name}
                    onChangeText={text => handleOptionPress('job_name', text)}
                  />
                </View>

                <View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
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
                    placeholder="Enter your answer"
                    placeholderTextColor={theme.textDisable}
                    value={formDetails.school}
                    onChangeText={text => handleOptionPress('school', text)}
                  />
                </View>
                {/* <View>
                  <Text
                    style={[
                      fonts.B1,
                      {marginBottom: 10, color: colors.neutral.darkest},
                    ]}>
                    Highest level of education
                  </Text>
                  <SelectComponent
                    options={education}
                    onSelect={(option: any) => {
                      handleOptionPress('educations', option);
                    }}
                    textOption={'Select'}
                  />
                </View> */}

                <View>
                  <Text
                    style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                    Religious beliefs
                  </Text>
                  <SelectComponent
                    options={religion}
                    onSelect={(option: any) => {
                      handleOptionPress('religions_id', option);
                    }}
                    textOption={'Select'}
                  />
                </View>

                <View>
                  <Text
                    style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                    Political views
                  </Text>
                  <SelectComponent
                    options={political}
                    onSelect={(option: any) => {
                      handleOptionPress('politicals_id', option);
                    }}
                    textOption={'Select'}
                  />
                </View>

                <View>
                  <Text
                    style={[fonts.B2, {marginBottom: 10, color: theme.text}]}>
                    Lifestyle
                  </Text>
                  <View>
                    <Text
                      style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                      Are you active?
                    </Text>
                    <SelectComponent
                      options={active}
                      onSelect={(option: any) => {
                        handleOptionPress('lifestyle_active_id', option);
                      }}
                      textOption={'Select'}
                    />
                  </View>
                  <View>
                    <Text
                      style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                      Do you drink?
                    </Text>
                    <SelectComponent
                      options={drink}
                      onSelect={(option: any) => {
                        handleOptionPress('lifestyle_drink_id', option);
                      }}
                      textOption={'Select'}
                    />
                  </View>
                  <View>
                    <Text
                      style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                      Do you smoke?
                    </Text>
                    <SelectComponent
                      options={smoke}
                      onSelect={(option: any) => {
                        handleOptionPress('lifestyle_smoke_id', option);
                      }}
                      textOption={'Select'}
                    />
                  </View>

                  <View>
                    <Text
                      style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                      Do you smoke tobacco?
                    </Text>
                    <SelectComponent
                      options={smoketobaco}
                      onSelect={(option: any) => {
                        handleOptionPress('lifestyle_tabacco_id', option);
                      }}
                      textOption={'Select'}
                    />
                  </View>

                  <View>
                    <Text
                      style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                      Do you smoke weed?
                    </Text>
                    <SelectComponent
                      options={smokeweed}
                      onSelect={(option: any) => {
                        handleOptionPress('lifestyle_weed_id', option);
                      }}
                      textOption={'Select'}
                    />
                  </View>

                  <View>
                    <Text
                      style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                      Do you use drugs?
                    </Text>
                    <SelectComponent
                      options={drugs}
                      onSelect={(option: any) => {
                        handleOptionPress('lifestyle_drug_id', option);
                      }}
                      textOption={'Select'}
                    />
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </>
        );

      case 6:
        return (
          <>
            <Header onPress={() => handleBack()} />
            <ScrollView
              showsVerticalScrollIndicator={false} // Oculta la barra de desplazamiento vertical
              showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento horizontal, si es necesario
            >
              {/* Botones de opción */}
              <View
                style={[
                  styles.menuContainer,
                  {
                    backgroundColor: theme.background,
                    borderBottomColor: theme.disable,
                  },
                ]} // Aplica el estilo para la vista horizontal
              >
                <TouchableOpacity
                  style={[
                    styles.menuItem,
                    selectedMenu === 'basic' && styles.selectedMenuItem,
                  ]}
                  onPress={() => setSelectedMenu('basic')}>
                  <Text
                    style={[
                      styles.menuText,
                      {color: theme.text},
                      selectedMenu === 'basic' && styles.selectedMenuText,
                    ]}>
                    {' '}
                    Basic filters{' '}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.menuItem,
                    selectedMenu === 'advanced' && styles.selectedMenuItem,
                  ]}
                  onPress={() => setSelectedMenu('advanced')}>
                  <Text
                    style={[
                      styles.menuText,
                      {color: theme.text},
                      selectedMenu === 'advanced' && styles.selectedMenuText,
                    ]}>
                    {' '}
                    Advanced filters{' '}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Lógica para mostrar las opciones de menú seleccionadas */}
              {selectedMenu === 'basic' ? (
                <ScrollView>
                  <Text
                    style={[fonts.H3, {marginVertical: 20, color: theme.text}]}>
                    Give us details about your ideal date...
                  </Text>
                  <Text style={[fonts.B1, {color: theme.text}]}>
                    Narrow your search for a meeting:
                  </Text>

                  <View style={{marginTop: 16}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={[
                          fonts.B1,
                          {marginBottom: 10, color: theme.text},
                        ]}>
                        How old are they?{' '}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 10,
                        paddingHorizontal: 40,
                      }}>
                      <Text style={{color: theme.text}}>{rangeold[0]}</Text>
                      <Text style={{color: theme.text}}>{rangeold[1]}</Text>
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                      }}>
                      <MultiSlider
                        values={rangeold}
                        min={0}
                        max={100}
                        onValuesChange={handleSliderChange2}
                        selectedStyle={{backgroundColor: theme.tertiary}}
                        unselectedStyle={{backgroundColor: '#E0E0E0'}}
                        trackStyle={{height: 5}}
                        sliderLength={350}
                        markerStyle={{
                          height: 20,
                          width: 20,
                          borderRadius: 10,
                          backgroundColor: theme.tertiary,
                        }}
                      />
                    </View>
                  </View>

                  <View style={{marginVertical: 8}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={[
                          fonts.B1,
                          {marginBottom: 10, color: theme.text},
                        ]}>
                        My neighborhood:{' '}
                      </Text>
                    </View>

                    <TextInput
                      style={[
                        styles.input3,
                        {
                          backgroundColor: theme.placeholder,
                          color: theme.text,
                          borderColor: theme.disable,
                        },
                      ]}
                      placeholder="Enter your answer"
                      placeholderTextColor={theme.textDisable}
                      value={formDetails.neighborhood}
                      onChangeText={text =>
                        handleOptionPress('neighborhood', text)
                      }
                    />
                    <View style={styles.chatContainer}>
                      <View style={[styles.chatContent, {marginRight: 10}]}>
                        <Text style={[fonts.B1, {color: theme.text}]}>
                          Share my location
                        </Text>
                      </View>
                      <View style={styles.switchContainer}>
                        <Switch
                          trackColor={{
                            false: '#767577',
                            true: colors.primary.light,
                          }}
                          thumbColor={
                            isSwitchEnabled ? colors.primary.medium : '#f4f3f4'
                          }
                          ios_backgroundColor={colors.neutral.medium}
                          onValueChange={() => toggleSwitch()}
                          value={isSwitchEnabled}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={{marginTop: 8}}>
                    <Text
                      style={[fonts.B2, {marginBottom: 10, color: theme.text}]}>
                      Maximum distance:
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={[
                          fonts.B1,
                          {marginBottom: 10, color: theme.text},
                        ]}>
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
                        justifyContent: 'space-between',
                        marginTop: 10,
                        paddingHorizontal: 40,
                      }}>
                      <Text style={{color: theme.text}}>{range[0]}</Text>
                      <Text style={{color: theme.text}}>{range[1]}</Text>
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                      }}>
                      <MultiSlider
                        values={range}
                        min={0}
                        max={100}
                        onValuesChange={handleSliderChange}
                        selectedStyle={{backgroundColor: theme.tertiary}}
                        unselectedStyle={{backgroundColor: '#E0E0E0'}}
                        trackStyle={{height: 5}}
                        sliderLength={350}
                        markerStyle={{
                          height: 20,
                          width: 20,
                          borderRadius: 10,
                          backgroundColor: theme.tertiary,
                        }}
                      />
                    </View>
                  </View>
                </ScrollView>
              ) : selectedMenu === 'advanced' ? (
                <ScrollView>
                  <Text
                    style={[fonts.H3, {marginVertical: 20, color: theme.text}]}>
                    More details, better meetings ...
                  </Text>
                  <Text style={[fonts.B1, {color: theme.text}]}>
                    You can specify them later
                  </Text>
                  <View style={{marginTop: 16}}>
                    <Text
                      style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                      Family plans:
                    </Text>
                    <SelectComponent
                      options={familyplans}
                      onSelect={(option: any) => {
                        handleOptionPress('family_plans_id', option);
                      }}
                      textOption={'Select'}
                    />
                  </View>

                  <View>
                    <Text
                      style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                      Political views
                    </Text>
                    <SelectComponent
                      options={political}
                      onSelect={(option: any) => {
                        handleOptionPress('politicals_id', option);
                      }}
                      textOption={'Select'}
                    />
                  </View>

                  <View>
                    <Text
                      style={[fonts.B1, {marginBottom: 10, color: theme.text}]}>
                      Religion
                    </Text>
                    <SelectComponent
                      options={religion}
                      onSelect={(option: any) => {
                        handleOptionPress('religions_id', option);
                      }}
                      textOption={'Select'}
                    />
                  </View>

                  <View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={[
                          fonts.B1,
                          {marginBottom: 10, color: theme.text},
                        ]}>
                        Sun sign
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('selection', {
                          type: 'sunSign',
                          selectedValue: formDetails.sunsigns,
                          onSelect: value =>
                            setFormDetails({...formDetails, sunsigns: value}),
                        })
                      }>
                      <View
                        style={[
                          styles.input,
                          {
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: theme.backgroundChat,
                          },
                        ]} // Agregamos justifyContent y alignItems
                      >
                        <View>
                          <Text style={{color: theme.text}}>
                            {formDetails.sun_sign &&
                            formDetails.sun_sign?.sunSign
                              ? formDetails?.sun_sign?.sunSign
                                  .map(item => item.sunsigns_id)
                                  .join(', ')
                              : 'Select'}
                          </Text>
                        </View>
                        <View>
                          <ArrowRight />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={[
                          fonts.B1,
                          {marginBottom: 10, color: theme.text},
                        ]}>
                        Education
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('selection', {
                          type: 'education',
                          selectedValue: formDetails.education,
                          onSelect: value =>
                            setFormDetails({...formDetails, education: value}),
                        })
                      }>
                      <View
                        style={[
                          styles.input,
                          {
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: theme.backgroundChat,
                          },
                        ]} // Agregamos justifyContent y alignItems
                      >
                        <View>
                          <Text style={{color: theme.text}}>
                            {formDetails?.education &&
                            formDetails?.education?.education
                              ? formDetails?.education?.education
                                  .map(item => item.education_id)
                                  .join(', ')
                              : 'Select'}
                          </Text>
                        </View>
                        <View>
                          <ArrowRight />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={[
                          fonts.B1,
                          {marginBottom: 10, color: theme.text},
                        ]}>
                        Ethnicity
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('selection', {
                          type: 'ethnicities',
                          selectedValue: formDetails.ethnicities,
                          onSelect: value =>
                            setFormDetails({...formDetails, ethnicities: value}),
                        })
                      }>
                      <View
                        style={[
                          styles.input,
                          {
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: theme.backgroundChat,
                          },
                        ]}>
                        <View>
                          <Text style={{color: theme.text}}>
                            {formDetails.ethnicities &&
                            formDetails?.ethnicities?.ethnicity
                              ? formDetails?.ethnicities?.ethnicity
                                  ?.map(item => item.ethnicities_id)
                                  .join(', ')
                              : 'Select'}
                          </Text>
                        </View>
                        <View>
                          <ArrowRight />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <Text
                      style={[
                        fonts.B2,
                        {marginVertical: 14, color: theme.text},
                      ]}>
                      Lifestyle
                    </Text>
                    <View>
                      <Text
                        style={[
                          fonts.B1,
                          {marginBottom: 10, color: theme.text},
                        ]}>
                        Are you active?
                      </Text>
                      <SelectComponent
                        options={active}
                        onSelect={(option: any) => {
                          handleOptionPress('lifestyle_active_id', option);
                        }}
                        textOption={'Select'}
                      />
                    </View>
                    <View>
                      <Text
                        style={[
                          fonts.B1,
                          {marginBottom: 10, color: theme.text},
                        ]}>
                        Do you drink?
                      </Text>
                      <SelectComponent
                        options={drink}
                        onSelect={(option: any) => {
                          handleOptionPress('lifestyle_drink_id', option);
                        }}
                        textOption={'Select'}
                      />
                    </View>
                    <View>
                      <Text
                        style={[
                          fonts.B1,
                          {marginBottom: 10, color: theme.text},
                        ]}>
                        Do you smoke tobacco?
                      </Text>
                      <SelectComponent
                        options={smoketobaco}
                        onSelect={(option: any) => {
                          handleOptionPress('lifestyle_tabacco_id', option);
                        }}
                        textOption={'Select'}
                      />
                    </View>

                    <View>
                      <Text
                        style={[
                          fonts.B1,
                          {marginBottom: 10, color: theme.text},
                        ]}>
                        Do you smoke weed?
                      </Text>
                      <SelectComponent
                        options={smokeweed}
                        onSelect={(option: any) => {
                          handleOptionPress('lifestyle_weed_id', option);
                        }}
                        textOption={'Select'}
                      />
                    </View>

                    <View>
                      <Text
                        style={[
                          fonts.B1,
                          {marginBottom: 10, color: theme.text},
                        ]}>
                        Do you use drugs?
                      </Text>
                      <SelectComponent
                        options={drugs}
                        onSelect={(option: any) => {
                          handleOptionPress('lifestyle_drug_id', option);
                        }}
                        textOption={'Select'}
                      />
                    </View>
                  </View>
                </ScrollView>
              ) : (
                <Text style={{color: theme.text}}>No selected menu</Text>
              )}
            </ScrollView>
          </>
        );
      case 7:
        return (
          <>
            <Header onPress={() => handleBack()} />
            {/* Botones de opción */}
            <ScrollView
              showsVerticalScrollIndicator={false} // Oculta la barra de desplazamiento vertical
              showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento horizontal, si es necesario
              style={styles.scrollView}
              contentContainerStyle={styles.scrollViewContent}>
              <Text style={[fonts.H3, {marginVertical: 20, color: theme.text}]}>
                Make your List
              </Text>
              {formDetails.list.length === 0 ? (
                <Text style={[fonts.B1, {marginBottom: 24, color: theme.text}]}>
                  Select minimum 3 attributes in order of most to least
                  important.
                </Text>
              ) : (
                <Text style={[fonts.B1, {marginBottom: 24, color: theme.text}]}>
                  Rank attributes in order of most to least important.
                </Text>
              )}

              {atributes?.map((attribute, index) => {
                const isSelected = formDetails.list.some(
                  item => item.attribute_id === attribute.id,
                );
                const isDisabled = formDetails.list.length >= 3 && !isSelected;

                return (
                  <TouchableOpacity
                    key={attribute.id}
                    style={[
                      styles.optionButtonB,
                      isSelected && styles.selectedButtonB, // Estilo de seleccionado
                      isDisabled && {backgroundColor:theme.disable,
                        borderWidth:isDisabled? 0:1
                      }, // Estilo de deshabilitado si ya hay 3 seleccionados
                    ]}
                    onPress={() =>
                      !isDisabled && handleOptionPressMultiple(attribute.id)
                    }
                    disabled={isDisabled}>
                    <Text
                      style={[
                        styles.optionText,
                        {color: isDisabled? theme.textDisable :theme.text, 
                        },
                        isSelected && [
                          styles.selectedText,
                          {color: theme.text},
                        ], // Estilo de texto seleccionado
                        isDisabled && styles.disabledText, // Estilo de texto deshabilitado
                      ]}>
                      {attribute.name}
                    </Text>

                    {isSelected && (
                      <View
                        style={{
                          backgroundColor: colors.secondary.light,
                          padding: 2,
                          borderRadius: 80,
                          width: 20,
                          height: 20,
                          justifyContent: 'center',
                          alignSelf: 'center',
                        }}>
                        <Text style={styles.number}>
                          {
                            formDetails.list.find(
                              item => item.attribute_id === attribute.id,
                            )?.priority
                          }
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}

              <View style={{flexDirection: 'row'}}>
                <Alertq />
                <Text
                  style={[
                    fonts.B1,
                    {
                      marginBottom: 0,
                      color: theme.text,
                      marginLeft: 3,
                    },
                  ]}>
                  Become a member of A-list to set more filters.
                </Text>
              </View>
            </ScrollView>
          </>
        );

      case 8:
        return (
          <>
            <Header onPress={() => handleBack()} />

            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{flex: 1}}>
              <ScrollView
                showsVerticalScrollIndicator={false} // Oculta la barra de desplazamiento vertical
                showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento horizontal, si es necesario
              >
                <Text
                  style={[fonts.H3, {marginVertical: 20, color: theme.text}]}>
                  More about you...
                </Text>
                <Text style={[fonts.B1, {marginBottom: 24, color: theme.text}]}>
                  Select minimum 3 prompts to the people meet you better
                </Text>

                {prompts === true ? (
                  <>
                    {promptsWithNames?.map((prompt, index) => {
                      // Función que determina el color de fondo
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
                            {
                              backgroundColor: getDynamicBackgroundColor(
                                index,
                                prompt?.reply,
                              ),
                            },
                          ]}>
                          <View style={styles.questionHeader}>
                            <Text
                              style={[
                                fonts.H4,
                                {color: colors.neutral.darkest, width: '90%'},
                              ]}>
                              {prompt?.name}
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
                                backgroundColor: getDynamicBackgroundColor(
                                  index,
                                  prompt?.reply,
                                ),
                              },
                            ]}
                            placeholder="Your answer"
                            placeholderTextColor={colors.neutral.dark}
                            value={prompt?.reply}
                            onChange={e =>
                              handleReplyChange(
                                prompt?.prompt_id,
                                e.nativeEvent.text,
                              )
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
          </>
        );
      case 9:
        return (
          <>
            <Headerprompts onPressA={() => handleBack()} />
            <HorizontalVerticalMenu
              menus={promptsMenu}
              onSelectedOptionsChange={handleSelectedOptionsChange}
            />
          </>
        );
      case 10:
        return (
          <>
            <Header onPress={() => handleBack()} />
            <Text style={[fonts.H3, {marginVertical: 20, color: theme.text}]}>
              Add your profile photo
            </Text>

            <ScrollView
              showsVerticalScrollIndicator={false} // Oculta la barra de desplazamiento vertical
              showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento horizontal, si es necesario
            >
              <View
                style={{
                  marginTop: 20,
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
                        padding: '28%',
                        borderRadius: 100,
                        flexDirection: 'row',
                        backgroundColor: theme.placeholder,
                        borderColor: theme.disable,
                        borderWidth: 1,
                      }}>
                      <Add />
                    </TouchableOpacity>
                  </>
                )}

                <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: height * 0.16, // Posiciona cerca de la parte superior derecha de la imagen
                  left: width * 0.60, // Ajusta la posición horizontal para estar al costado de la imagen
                  zIndex: 20,
                  backgroundColor: colors.primary.medium,
                  padding: 1, // Hacemos el padding más pequeño para que sea un ícono bien ajustado
                  borderRadius: 20,
                }}
                  onPress={() => openModalProfile()}>
                  {selectedProfile && (
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
                        color: theme.text,
                      },
                    ]}>
                    Upload a photo
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
        );
      case 11:
        return (
          <>
            <Header onPress={() => handleBack()} />

            <ScrollView
              showsVerticalScrollIndicator={false} // Oculta la barra de desplazamiento vertical
              showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento horizontal, si es necesario
            >
              <Text style={[fonts.H3, {marginVertical: 20, color: theme.text}]}>
                Add your photos
              </Text>
              <Text style={[fonts.B1, {color: theme.text}]}>
                Please add 3 photos minimum
              </Text>
              <View
                style={{
                  width: '100%',
                  marginTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  flexWrap: 'wrap',
                }}>
                {Array.from({length: 6}).map((_, index) => (
                  <View key={index} style={{marginTop: 20}}>
                    {selectedImages && selectedImages[index] ? (
                      <View style={{position: 'relative'}}>
                        <Image
                          source={{uri: selectedImages[index]}}
                          style={{width: 150, height: 155, borderRadius: 20}}
                        />
                        {/* Botón de edición solo si hay imagen */}
                        <TouchableOpacity
                          style={{
                            position: 'absolute',
                            zIndex: 20,
                            top: Platform.OS === 'ios' ? 5 : 5,
                            right: 5, // Para alinearlo a la derecha de la imagen
                          }}
                          onPress={() => openModalProfile(index)} // Pasamos el índice de la imagen si es necesario
                        >
                          <TouchableOpacity
                            onPress={() => setModalVisible(true)}
                            style={{
                              backgroundColor: theme.background,
                              zIndex: 3,
                              padding: 5,
                              borderRadius: 20,
                            }}>
                            <Edit color={theme.text} width={20} height={20} />
                          </TouchableOpacity>
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
                //cancelButtonText="aaa"
                confirmButtonText="From your gallery"
                //onPressA={() => handleCameraLaunch()}
                onPressB={() => openImagePickerMultiple()}
                onRrequestClose={closeModal}
              />
            </ScrollView>
          </>
        );
      case 12:
        return (
          <>
            <Header onPress={() => handleBack()} />
            <ScrollView
              showsVerticalScrollIndicator={false} // Oculta la barra de desplazamiento vertical
              showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento horizontal, si es necesario
            >
              <View style={{marginVertical: 10}}>
                <LinearGradient
                  colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.2)']}
                  style={{
                    borderRadius: 20,
                    width: '100%',
                    height: 350,
                    zIndex: 1,
                  }}
                />
                <Image
                  source={{uri: user?.profile_image}}
                  style={{
                    borderRadius: 20,
                    width: '100%',
                    height: 350,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 0,
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    paddingBottom: 20,
                    zIndex: 2,
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={[
                      {
                        color: colors.neutral.white,
                        paddingHorizontal: 12,
                        marginRight: 0,
                      },
                      fonts.H3,
                    ]}>
                    {user?.name}, {user?.age}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: colors.secondary.light,
                  paddingHorizontal: 20,
                  paddingVertical: 20,
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
                <View style={{flex: 1, marginLeft: 8}}>
                  <Text style={[fonts.H4, {color: colors.neutral.darkest}]}>
                    Your profile isn’t{' '}
                  </Text>
                  <Text
                    style={[
                      fonts.H4,
                      {marginBottom: 8, color: colors.primary.medium},
                    ]}>
                    {' '}
                    complete
                  </Text>
                  <Text style={[fonts.B1, {color: colors.neutral.darkest}]}>
                    If you want to find your perfect match, complete it 100%.{' '}
                  </Text>
                </View>
              </View>
              <ScrollView showsHorizontalScrollIndicator={false}>
                {iconsWithData.map(
                  (item, index) =>
                    item.data ? ( // Verifica si item.data no está vacío
                      <View
                        key={index}
                        style={{
                          marginRight: 12,
                          flexDirection: 'row',
                          marginTop: 12,
                        }}>
                        <RowItem text={``} Icon={item.Icon} data={item.data} />
                      </View>
                    ) : null, // No renderiza nada si item.data está vacío
                )}
              </ScrollView>

              <View style={{flex: 1, marginVertical: 30}}>
                <Text style={[fonts.H4, {color: theme.text}]}>About me</Text>

                <Text
                  style={[fonts.B1, {color: theme.text, marginVertical: 16}]}>
                  {user?.description}
                </Text>
              </View>

              {user?.prompts?.slice(0, 3).map((prompt, index) => (
                <View key={prompt.id}>
                  {/* Prompt Section */}
                  <View
                    style={{
                      backgroundColor:
                        index % 2 === 0
                          ? colors.secondary.lighest
                          : colors.primary.lighest,
                      paddingHorizontal: 20,
                      paddingVertical: 20,
                      borderRadius: 20,
                      flexDirection: 'row',
                      marginBottom: 10,
                    }}>
                    <View style={{flex: 1, marginLeft: 8}}>
                      <Text style={[fonts.H4, {color: colors.neutral.darkest}]}>
                        {prompt.name} {/* Aquí solo uso prompt.name */}
                      </Text>

                      <Text style={[fonts.B1, {color: colors.neutral.darkest}]}>
                        {prompt.user_prompts_entity?.reply}
                      </Text>
                    </View>
                  </View>

                  {/* Image Section */}
                  <View style={{marginVertical: 10}}>
                    <LinearGradient
                      colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.2)']}
                      style={{
                        borderRadius: 20,
                        width: '100%',
                        height: 350,
                        zIndex: 1,
                        marginBottom: 10,
                      }}
                    />
                    <Image
                      source={images[index]}
                      style={{
                        borderRadius: 20,
                        width: '100%',
                        height: 350,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 0,
                      }}
                    />
                  </View>
                </View>
              ))}
              <View
                style={{
                  width: '100%',
                  flex: 1,
                  marginTop: 10,
                  marginBottom: 20,
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
                    Add new prompts
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: '100%',
                  flex: 1,
                  marginTop: 0,
                  marginBottom: 20,
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
                    Add new photo
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </>
        );
      // Agrega más casos según sea necesario para otras etapas del proceso de registro
      default:
        return null;
    }
  };

  const handleContinue = () => {
    // Aquí puedes manejar la lógica para avanzar al siguiente paso del registro
    setStage(stage + 1); // Avanza a la siguiente etapa
    console.log('FORM', formDetails);
  };

  const handlePrompt = async () => {
    const submitSuccess = await handleSubmit(); // Espera el resultado de handleSubmit

    if (submitSuccess) {
      handleContinue2(); // Solo se llama si handleSubmit fue exitoso
    } else {
      console.log('Submission failed. handleContinue will not be executed.');
    }
  };

  const handleAtributes = async () => {
    const submitSuccess = await handleAttributes(); // Espera el resultado de handleSubmit

    if (submitSuccess) {
      handleContinue(); // Solo se llama si handleSubmit fue exitoso
    } else {
      console.log('Submission failed. handleContinue will not be executed.');
    }
  };

  const handleLookings = async () => {
    const submitSuccess = await handleLooking(); // Espera el resultado de handleSubmit

    if (submitSuccess) {
      handleContinue(); // Solo se llama si handleSubmit fue exitoso
    } else {
      console.log('Submission failed. handleContinue will not be executed.');
    }
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
    <SafeAreaView style={{flex: 1, backgroundColor: theme.background}}>
      <View style={styles.container}>{renderContent()}</View>
      {stage === 3 && ( // Muestra el botón "Continue" solo en la primera etapa del proceso
        <View
          style={[styles.bannerContainer, {backgroundColor: theme.background}]}>
          <TouchableOpacity
            style={[
              styles.button,
              disableBtn1 && {backgroundColor: theme.disable},
            ]}
            onPress={handleContinue}
            disabled={disableBtn1}>
            <Text
              style={[
                fonts.Btn,
                {
                  color: disableBtn1 ? theme.textDisable : colors.neutral.white,
                },
              ]}>
              Continue
            </Text>
          </TouchableOpacity>
          <View style={{marginVertical: 1}} />
          <TouchableOpacity
            style={[styles.button2, {backgroundColor: theme.text}]}
            onPress={handleContinue}>
            <Text style={[fonts.Btn, {color: theme.background}]}>Skip</Text>
          </TouchableOpacity>
        </View>
      )}
      {stage === 5 && ( // Muestra el botón "Continue" solo en la primera etapa del proceso
        <View
          style={[
            styles.bannerContainer,
            {backgroundColor: theme.background, paddingHorizontal: 0},
          ]}>
          <TouchableOpacity
            style={[
              styles.button3,
              (formDetails.age.length < 1 ||
                formDetails.height.length < 1 ||
                formDetails.description.length < 1) && {
                backgroundColor: theme.disable,
              },
            ]}
            onPress={handleContinue}
            disabled={
              formDetails.age.length < 1 ||
              formDetails.height.length < 1 ||
              formDetails.description.length < 1
            }>
            <Text
              style={[
                fonts.Btn,
                {
                  color:
                    formDetails.age.length < 1 ||
                    formDetails.height.length < 1 ||
                    formDetails.description.length < 1
                      ? theme.textDisable
                      : colors.neutral.white,
                },
              ]}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {stage === 1 && ( // Muestra el botón "Continue" solo en la primera etapa del proceso
        <View
          style={[
            styles.bannerContainer,
            {backgroundColor: theme.background, paddingHorizontal: 0},
          ]}>
          <TouchableOpacity
            style={[
              styles.button3,
              formDetails.want_to_meet.length < 1 && {
                backgroundColor: theme.disable,
              },
            ]}
            onPress={handleContinue}
            disabled={formDetails.want_to_meet.length < 1}>
            <Text
              style={[
                fonts.Btn,
                {
                  color:
                    formDetails.want_to_meet.length < 1
                      ? theme.textDisable
                      : colors.neutral.white,
                },
              ]}>
              Continue
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
            style={[
              styles.button3,
              formDetails.sex_interests_id.length < 1 && {
                backgroundColor: theme.disable,
              },
            ]}
            onPress={handleContinue}
            disabled={formDetails.sex_interests_id.length < 1}>
            <Text
              style={[
                fonts.Btn,
                {
                  color:
                    formDetails.sex_interests_id.length < 1
                      ? theme.textDisable
                      : colors.neutral.white,
                },
              ]}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {stage === 4 && ( // Muestra el botón "Continue" solo en la primera etapa del proceso
        <View
          style={[
            styles.bannerContainer,
            {backgroundColor: theme.background, paddingHorizontal: 0},
          ]}>
          <TouchableOpacity
            style={[
              styles.button3,
              formDetails.lookings.length < 1 && {
                backgroundColor: theme.disable,
              },
            ]}
            onPress={handleLookings}
            disabled={formDetails.lookings.length < 1}>
            <Text
              style={[
                fonts.Btn,
                {
                  color:
                    formDetails.lookings.length < 1
                      ? theme.textDisable
                      : colors.neutral.white,
                },
              ]}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {stage === 6 && ( // Muestra el botón "Continue" solo en la primera etapa del proceso
        <View
          style={[
            styles.bannerContainer,
            {backgroundColor: theme.background, paddingHorizontal: 0},
          ]}>
          <TouchableOpacity style={[styles.button3]} onPress={handleContinue}>
            <Text style={[fonts.Btn, {color: colors.neutral.white}]}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {stage === 7 && ( // Muestra el botón "Continue" solo en la primera etapa del proceso
        <View
          style={[styles.bannerContainer, {backgroundColor: theme.background}]}>
          <TouchableOpacity
            style={[
              styles.button,
              formDetails.list.length < 3 && {backgroundColor: theme.disable},
            ]}
            onPress={handleAtributes}
            disabled={formDetails.list.length < 3}>
            <Text
              style={[
                fonts.Btn,
                {
                  color:
                    formDetails.list.length < 3
                      ? theme.textDisable
                      : colors.neutral.white,
                },
              ]}>
              Continue
            </Text>
          </TouchableOpacity>
          <View style={{marginVertical: 1}} />
          <TouchableOpacity
            style={[styles.button2, {backgroundColor: theme.text}]}
            onPress={handleContinue}>
            <Text style={[fonts.Btn, {color: theme.background}]}>
              Set more filters
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {stage === 8 &&
        prompts === true && ( // Muestra el botón "Continue" solo en la primera etapa del proceso
          <View
            style={[
              styles.bannerContainer,
              {backgroundColor: theme.background, paddingHorizontal: 0},
            ]}>
            <TouchableOpacity
              style={[styles.button3]}
              onPress={() => {
                if (prompts) {
                  //handleContinue2();
                  handlePrompt(); // Llama a handlePrompt si prompts es true
                } else {
                  handleContinue(); // Llama a handleContinue si prompts es false
                }
              }}>
              <Text style={[fonts.Btn, {color: colors.neutral.white}]}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        )}
      {stage === 9 && (
        <View
          style={[
            styles.bannerContainer,
            {backgroundColor: theme.background, paddingHorizontal: 0},
          ]}>
          <TouchableOpacity
            style={[
              styles.button3,
              promptsWithNames.length !== 3 && {backgroundColor: theme.disable}, // Estilo deshabilitado si hay 3 prompts
            ]}
            onPress={handleContinuex2}
            disabled={promptsWithNames.length !== 3} // Deshabilita el botón si no hay exactamente 3 prompts
          >
            <Text
              style={[
                fonts.Btn,
                {
                  color:
                    promptsWithNames.length !== 3
                      ? theme.textDisable
                      : colors.neutral.white,
                },
              ]}>
              Continue with 3 prompts
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {stage === 10 && ( // Muestra el botón "Continue" solo en la primera etapa del proceso
        <View
          style={[
            styles.bannerContainer,
            {backgroundColor: theme.background, paddingHorizontal: 0},
          ]}>
          <TouchableOpacity
            style={[
              styles.button3,
              formDetails.profile_image === '' && {
                backgroundColor: theme.disable,
              },
            ]}
            onPress={() => handleContinue()}
            disabled={formDetails.profile_image === ''}>
            <Text
              style={[
                fonts.Btn,
                {
                  color:
                    formDetails.profile_image === ''
                      ? theme.textDisable
                      : colors.neutral.white,
                },
              ]}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {stage === 11 && ( // Muestra el botón "Continue" solo en la primera etapa del proceso
        <View
          style={[
            styles.bannerContainer,
            {backgroundColor: theme.background, paddingHorizontal: 0},
          ]}>
          <TouchableOpacity
            style={[
              styles.button3,
              imagesGallery === null && {backgroundColor: theme.disable},
            ]}
            onPress={() => {ValidateForm(); ValidateImages()}}
            disabled={imagesGallery === null}>
            <Text
              style={[
                fonts.Btn,
                {
                  color:
                    imagesGallery === null
                      ? theme.textDisable
                      : colors.neutral.white,
                },
              ]}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {stage === 12 && ( // Muestra el botón "Continue" solo en la primera etapa del proceso
        <View
          style={[
            styles.bannerContainer,
            {backgroundColor: theme.background, paddingHorizontal: 16},
          ]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('ListA');
              console.log(formDetails);
            }}
            //onPress={ () => {ValidateForm()}}
            //onPress={() => {console.log(formDetails)}}
          >
            <Text style={[fonts.Btn, {color: colors.neutral.white}]}>
              Continue
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button2, {backgroundColor: theme.text}]}
            onPress={() => handleBackAll()}>
            <Text style={[fonts.Btn, {color: theme.background}]}>
              Go to edit
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
    color: colors.neutral.darkest,
  },
  inputprompt: {
    fontSize: 14,
    borderRadius: 20,
    paddingBottom: 12,
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
  input3: {
    borderWidth: 1,
    borderColor: colors.neutral.light,
    fontSize: 14,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.neutral.lighest,
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
    marginBottom: 10,
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
    fontSize: 12,
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
  map: {
    marginVertical: 20,
    height: 240,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
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
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: colors.neutral.light,
    marginLeft: 16,
  },
  verticalContainer: {
    flexDirection: 'column',
  },
  verticalItem: {
    marginBottom: 12,
    flexDirection: 'row',
  },
  menuContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 6,
  },
  menuItem: {
    marginRight: 20,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  selectedMenuItem: {
    borderBottomColor: colors.primary.medium,
  },
  menuText: {
    fontSize: 16,
    color: colors.neutral.darkest,
  },
  selectedMenuText: {
    color: colors.primary.medium,
  },
  contentContainer: {
    backgroundColor: colors.neutral.lighest,
    flex: 1,
  },
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  chatContent: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  disabledButtonB: {
    backgroundColor: 'lightgray',
  },
  disabledText: {
    color: 'gray',
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
