import React, { useContext, useEffect, useRef, useState } from "react";
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
  Modal,
} from "react-native";

import fonts from "../../../../Utils/fonts";
import colors from "../../../../Utils/colors";
import { ArrowLeft, ArrowRight } from "../../../../Assets/svg";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

import SelectComponent from "../../../../Components/select";
import HeaderUser from "../../../../Components/HeaderUser";
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
  UpdateSunSingns,
  UpdateEthnicities,
  UpdateEducations,
} from "../../../../Services/User/UserServices";
import { ThemeContext } from "../../../../Components/themeContext";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Switch, TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function Register() {
  const [stage, setStage] = useState(1); // Estado para controlar la etapa del proceso de registro
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const [selectedMenu, setSelectedMenu] = useState("basic");

  const [pronouns, setPronouns] = useState([]);
  const [genders, setGenders] = useState([]);
  const [atributes, setAtributes] = useState([]);
  const [sex, setSex] = useState([]);
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
  const [toInterest, setToInterest] = useState("");

  const [user, setUser] = useState([]);
  const [imagesGallery, setImagesGallery] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
  const [isShareMyLocation, setIsShareMyLocation] = useState(false); // Estado inicial booleano

  const [formDetails, setFormDetails] = useState({
    age: "", //
    height: "", //
    description: "", //
    relationship: "",
    google_id: "",
    apple_id: "",
    profile_image: "", //
    neighborhood: "", //
    distance_min: "0", //
    distance_max: "100", //
    age_min: "0",
    age_max: "100",
    is_share_my_location: isShareMyLocation,
    want_to_meet: "",
    work: "", //
    school: "", //
    job_name: "", //
    latitude: "", //
    longitude: "", //
    pronouns_id: "", //
    religions_id: "", //
    politicals_id: "", //
    lifestyle_active_id: "", //
    lifestyle_drink_id: "", //
    lifestyle_smoke_id: "",
    lifestyle_tabacco_id: "", //
    lifestyle_weed_id: "", //
    lifestyle_drugs_id: "", //
    lookings_for_id: "", //
    family_plans_id: "", //
    genders_id: "", //
    sex_interests_id: "", //

    prompts: [],
    photos: [],
    list: [],
    lookings: [], // ---
    education_id: "", //
    meet: "",
    looking_for: "", //
    family_plans: "", //
    sunsigns: [], //
    ethnicities: [], //
    educations: [], //
  });
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await MeUser();
      setUser(userData);
      setToInterest(userData.sex_interests_id)
    };
    const unsubscribeFocus = navigation.addListener('focus', () => {
      console.log('Pantalla enfocada, actualizando usuario...');
      fetchUser();
    });
    fetchUser();
    return () => {
      unsubscribeFocus();
    };
  }, [navigation]);

  // Valores Config Perfil
  const toggleSwitch = () => {
    setIsSwitchEnabled((previousState) => !previousState);
    setIsShareMyLocation((previousState) => {
      const newState = !previousState;
      console.log("switch", newState); // Usamos el nuevo valor directamente aquí
      return newState;
    });
  };

  // Verifica si ambos campos están vacíos
  const disableBtn1 = formDetails.looking_for.trim() === "";

  const [looking, setLookings] = useState([]);

  useEffect(() => {
    const fetchLookings = async () => {
      const data = await GetLookings();
      setLookings(data);
    };

    fetchLookings(); // Llamada a la función dentro del useEffect
  }, []);

  const handleOptionPress = (field: any, value: any) => {
    setFormDetails((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
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
      console.log("sex interest ", data);
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
        const transformedOptions = data.map((item) => ({
          label: item.name,
          value: item.id.toString(),
        }));
        setReligion(transformedOptions);
      } catch (error) {
        console.error("Error fetching religions:", error);
      }
    };

    const fetchPolitical = async () => {
      try {
        const data = await GetPolitical();
        const transformedOptions = data.map((item) => ({
          label: item.name,
          value: item.id.toString(),
        }));
        setPolitical(transformedOptions);
      } catch (error) {
        console.error("Error fetching political views:", error);
      }
    };

    const fetchActive = async () => {
      try {
        const data = await GetLifeActive();
        const transformedOptions = data.map((item) => ({
          label: item.name,
          value: item.id.toString(),
        }));
        setActive(transformedOptions);
      } catch (error) {
        console.error("Error fetching life activity:", error);
      }
    };

    const fetchDrink = async () => {
      try {
        const data = await GetLifeDrink();
        const transformedOptions = data.map((item) => ({
          label: item.name,
          value: item.id.toString(),
        }));
        setDrink(transformedOptions);
      } catch (error) {
        console.error("Error fetching drink preferences:", error);
      }
    };

    const fetchSmoke = async () => {
      try {
        const data = await GetLifeSmoke();
        const transformedOptions = data.map((item) => ({
          label: item.name,
          value: item.id.toString(),
        }));
        setSmoke(transformedOptions);
      } catch (error) {
        console.error("Error fetching smoke preferences:", error);
      }
    };

    const fetchEducation = async () => {
      try {
        const data = await GetEducation();
        const transformedOptions = data.map((item) => ({
          label: item.name,
          value: item.id.toString(),
        }));
        setEducation(transformedOptions);
      } catch (error) {
        console.error("Error fetching education levels:", error);
      }
    };

    const fetchLookingFor = async () => {
      try {
        const data = await GetLookingfor();
        const transformedOptions = data.map((item) => ({
          label: item.name,
          value: item.id.toString(),
        }));
        setLookingfor(transformedOptions);
      } catch (error) {
        console.error("Error fetching education levels:", error);
      }
    };

    const fetchFamilyplans = async () => {
      try {
        const data = await GetFamilyplans();
        const transformedOptions = data.map((item) => ({
          label: item.name,
          value: item.id.toString(),
        }));
        setFamilyplans(transformedOptions);
      } catch (error) {
        console.error("Error fetching education levels:", error);
      }
    };

    const fetchSunsign = async () => {
      try {
        const data = await GetSunsign();
        const transformedOptions = data.map((item) => ({
          label: item.name,
          value: item.id.toString(),
        }));
        setSunsigns(transformedOptions);
      } catch (error) {
        console.error("Error fetching education levels:", error);
      }
    };

    const fetchEthnicity = async () => {
      try {
        const data = await GetEthnicity();
        const transformedOptions = data.map((item) => ({
          label: item.name,
          value: item.id.toString(),
        }));
        setEthnicities(transformedOptions);
      } catch (error) {
        console.error("Error fetching education levels:", error);
      }
    };

    const fetchTobacco = async () => {
      try {
        const data = await GetLifeTobacco();
        const transformedOptions = data.map((item) => ({
          label: item.name,
          value: item.id.toString(),
        }));
        setSmoketobaco(transformedOptions);
      } catch (error) {
        console.error("Error fetching smoke preferences:", error);
      }
    };

    const fetchWeed = async () => {
      try {
        const data = await GetLifeWeed();
        const transformedOptions = data.map((item) => ({
          label: item.name,
          value: item.id.toString(),
        }));
        setSmokeweed(transformedOptions);
      } catch (error) {
        console.error("Error fetching smoke preferences:", error);
      }
    };

    const fetchDrugs = async () => {
      try {
        const data = await GetLifeDrugs();
        const transformedOptions = data.map((item) => ({
          label: item.name,
          value: item.id.toString(),
        }));
        setDrugs(transformedOptions);
      } catch (error) {
        console.error("Error fetching smoke preferences:", error);
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
    fetchEthnicity();
  }, []); // El array vacío [] hace que useEffect se ejecute solo una vez cuando el componente se monta.

  const [range, setRange] = useState([15, 85]);
  const [rangeold, setRangeold] = useState([15, 85]);

  useEffect(() => {
    if (user) {
      setRangeold([user.age_min ?? 15, user.age_max ?? 85]);
      setRange([user.distance_min ?? 15, user.distance_max ?? 85]);
    }
  }, [user]);

  const handleSliderChange = (values) => {
    setRange(values);
    handleOptionPress("distance_min", values[0]);
    handleOptionPress("distance_max", values[1]);
  };

  const handleSliderChange2 = (values) => {
    setRangeold(values);
    handleOptionPress("age_min", values[0]);
    handleOptionPress("age_max", values[1]);
  };
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
   // const UpdateEducation = UpdateEducations([formDetails.educations]);

    if (
      (await Create) === true &&
      (await UpdateSunSing) === true &&
      (await UpdateEthnicity) === true
       //&& (await UpdateEducation) === true
    ) {
      console.log("EXITO UPDATE");
      setAgreeVisible(true);
    }
  };

  const GenericModal = ({ visible, onClose, children }: any) => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground2}>
          <View style={styles.modalView2}>{children}</View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
  const ModalAgree = ({ visible, onClose }: any) => (
    <GenericModal visible={visible} onClose={onClose}>
      <Text style={[styles.modalTitle, fonts.H4, { marginTop: 12 }]}>
        Your changes were saved successfully
      </Text>
      <View style={styles.horizontalButtonContainer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => {
            onClose;
            navigation.goBack();
          }}
        >
          <Text style={[styles.buttonText, fonts.Btn]}>Done</Text>
        </TouchableOpacity>
      </View>
    </GenericModal>
  );

  const [agreeVisible, setAgreeVisible] = useState(false);
  const selectedInterest = sex.find(
    (interest) => interest.id === toInterest
  );
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <SafeAreaView />
      <HeaderUser
        text="Edit interest"
        svg={<ArrowLeft color={theme.text} />}
        onPress={() => navigation.goBack()}
      />
      <ModalAgree
        visible={agreeVisible}
        onClose={() => setAgreeVisible(false)}
      />
      <ScrollView
        style={{ paddingHorizontal: 20 }}
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
              selectedMenu === "basic" && styles.selectedMenuItem,
            ]}
            onPress={() => setSelectedMenu("basic")}
          >
            <Text
              style={[
                styles.menuText,
                { color: theme.text },
                selectedMenu === "basic" && styles.selectedMenuText,
              ]}
            >
              {" "}
              Basic filters{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.menuItem,
              selectedMenu === "advanced" && styles.selectedMenuItem,
            ]}
            onPress={() => setSelectedMenu("advanced")}
          >
            <Text
              style={[
                styles.menuText,
                { color: theme.text },
                selectedMenu === "advanced" && styles.selectedMenuText,
              ]}
            >
              {" "}
              Advanced filters{" "}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Lógica para mostrar las opciones de menú seleccionadas */}
        {selectedMenu === "basic" ? (
          <ScrollView style={{ marginTop: 20 }}>
            <Text style={[fonts.B1, { color: theme.text }]}>
              Gender of your interest:
            </Text>
            <TouchableOpacity
              style={{ marginTop: 10 }}
              onPress={() =>
                navigation.navigate("selectionuser", {
                  type: "gender",
                  //selectedValue: formDetails.sun_sign,
                  onSelect: [user?.sex_interests_id] || [],
                })
              }
            >
              <View
                style={[
                  styles.input,
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: theme.backgroundChat,
                  },
                ]} // Agregamos justifyContent y alignItems
              >
                <View>
                  <Text>
                    {selectedInterest ? selectedInterest.name : "Select"}
                  </Text>
                </View>
                <View>
                  <ArrowRight />
                </View>
              </View>
            </TouchableOpacity>

            <View style={{ marginTop: 16 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={[fonts.B1, { marginBottom: 10, color: theme.text }]}
                >
                  How old are they?{" "}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                  paddingHorizontal: 40,
                }}
              >
                <Text style={{ color: theme.text }}>{rangeold[0]}</Text>
                <Text style={{ color: theme.text }}>{rangeold[1]}</Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <MultiSlider
                  key={`age-${rangeold[0]}-${rangeold[1]}`}
                  values={rangeold}
                  min={0}
                  max={100}
                  onValuesChange={handleSliderChange2}
                  selectedStyle={{ backgroundColor: theme.tertiary }}
                  unselectedStyle={{ backgroundColor: "#E0E0E0" }}
                  trackStyle={{ height: 5 }}
                  sliderLength={300}
                  markerStyle={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    backgroundColor: theme.tertiary,
                  }}
                />
              </View>
            </View>

            <View style={{ marginVertical: 8 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={[fonts.B1, { marginBottom: 10, color: theme.text }]}
                >
                  My neighborhood:{" "}
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
                placeholder={
                  user?.neighborhood ? user.neighborhood : "Enter your answer"
                }
                placeholderTextColor={theme.textDisable}
                value={formDetails.neighborhood}
                onChangeText={(text) => handleOptionPress("neighborhood", text)}
                keyboardType="numeric"
              />
              <View style={styles.chatContainer}>
                <View style={[styles.chatContent, { marginRight: 10 }]}>
                  <Text style={[fonts.B1, { color: theme.text }]}>
                    Share my location
                  </Text>
                </View>
                <View style={styles.switchContainer}>
                  <Switch
                    trackColor={{
                      false: "#767577",
                      true: colors.primary.light,
                    }}
                    thumbColor={
                      isSwitchEnabled ? colors.primary.medium : "#f4f3f4"
                    }
                    ios_backgroundColor={colors.neutral.medium}
                    onValueChange={() => toggleSwitch()}
                    value={isSwitchEnabled}
                  />
                </View>
              </View>
            </View>

            <View style={{ marginTop: 8 }}>
              <Text style={[fonts.B2, { marginBottom: 10, color: theme.text }]}>
                Maximum distance:
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={[fonts.B1, { marginBottom: 10, color: theme.text }]}
                >
                  Range (Miles){" "}
                </Text>
                <Text
                  style={[
                    {
                      marginBottom: 10,
                      color: colors.secondary.dark,
                      fontSize: 8,
                    },
                  ]}
                >
                  (Between 0-100)
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                  paddingHorizontal: 40,
                }}
              >
                <Text style={{ color: theme.text }}>{range[0]}</Text>
                <Text style={{ color: theme.text }}>{range[1]}</Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <MultiSlider
                  key={`distance-${range[0]}-${range[1]}`}
                  values={range}
                  min={0}
                  max={100}
                  onValuesChange={handleSliderChange}
                  selectedStyle={{ backgroundColor: theme.tertiary }}
                  unselectedStyle={{ backgroundColor: "#E0E0E0" }}
                  trackStyle={{ height: 5 }}
                  sliderLength={300}
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
        ) : selectedMenu === "advanced" ? (
          <ScrollView>
            <View style={{ marginTop: 16 }}>
              <Text style={[fonts.B1, { marginBottom: 10, color: theme.text }]}>
                Family plans:
              </Text>
              <SelectComponent
                options={familyplans}
                onSelect={(option: any) => {
                  handleOptionPress("family_plans_id", option);
                }}
                textOption={
                  user?.family_plans ? user?.family_plans?.name : "Select"
                }
              />
            </View>

            <View>
              <Text style={[fonts.B1, { marginBottom: 10, color: theme.text }]}>
                Political views
              </Text>
              <SelectComponent
                options={political}
                onSelect={(option: any) => {
                  handleOptionPress("politicals_id", option);
                }}
                textOption={
                  user?.politicals ? user?.politicals?.name : "Select"
                }
              />
            </View>

            <View>
              <Text style={[fonts.B1, { marginBottom: 10, color: theme.text }]}>
                Religion
              </Text>
              <SelectComponent
                options={religion}
                onSelect={(option: any) => {
                  handleOptionPress("religions_id", option);
                }}
                textOption={user?.religions ? user.religions?.name : "Select"}
              />
            </View>

            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={[fonts.B1, { marginBottom: 10, color: theme.text }]}
                > 
                  Sun sign
                </Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("selectionuser", {
                    type: "sunSign",
                    //selectedValue: formDetails.sun_sign,
                    onSelect: user?.sunsigns || [],
                  })
                }
              >
                <View
                  style={[
                    styles.input,
                    {
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: theme.backgroundChat,
                    },
                  ]}
                >
                  <View>
                    <Text style={{ color: theme.text }}>
                      {user?.sunsigns && user.sunsigns.length > 0
                        ? user.sunsigns
                            .map((sunSign) => sunSign.name)
                            .join(", ")
                        : "Select"}
                    </Text>
                  </View>
                  <View>
                    <ArrowRight />
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={[fonts.B1, { marginBottom: 10, color: theme.text }]}
                >
                  Education
                </Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("selectionuser", {
                    type: "education",
                    onSelect: user?.educations || null,
                  })
                }
              >
                <View
                  style={[
                    styles.input,
                    {
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: theme.backgroundChat,
                    },
                  ]} // Agregamos justifyContent y alignItems
                >
                  <View>
                    <Text style={{ color: theme.text }}>
                      {user?.educations && user.educations.length > 0
                        ? user.educations.map((edu) => edu.name).join(", ")
                        : "Select"}
                    </Text>
                  </View>
                  <View>
                    <ArrowRight />
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={[fonts.B1, { marginBottom: 10, color: theme.text }]}
                >
                  Ethnicity
                </Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("selectionuser", {
                    type: "ethnicity",
                    selectedValue: formDetails.ethnicity,
                    onSelect: user?.ethnicities || null,
                  })
                }
              >
                <View
                  style={[
                    styles.input,
                    {
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: theme.backgroundChat,
                    },
                  ]}
                >
                  <View>
                    <Text style={{ color: theme.text }}>
                      {user?.ethnicities && user.ethnicities.length > 0
                        ? user.ethnicities.map((eth) => eth.name).join(", ")
                        : "Select"}
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
                style={[fonts.B2, { marginVertical: 14, color: theme.text }]}
              >
                Lifestyle
              </Text>
              <View>
                <Text
                  style={[fonts.B1, { marginBottom: 10, color: theme.text }]}
                >
                  Are you active?
                </Text>
                <SelectComponent
                  options={active}
                  onSelect={(option: any) => {
                    handleOptionPress("lifestyle_active_id", option);
                  }}
                  textOption={
                    user?.lifestyle_active
                      ? user.lifestyle_active?.name
                      : "Select"
                  }
                />
              </View>
              <View>
                <Text
                  style={[fonts.B1, { marginBottom: 10, color: theme.text }]}
                >
                  Do you drink?
                </Text>
                <SelectComponent
                  options={drink}
                  onSelect={(option: any) => {
                    handleOptionPress("lifestyle_drink_id", option);
                  }}
                  textOption={
                    user?.lifestyle_drink
                      ? user.lifestyle_drink?.name
                      : "Select"
                  }
                />
              </View>
              <View>
                <Text
                  style={[fonts.B1, { marginBottom: 10, color: theme.text }]}
                >
                  Do you smoke tobacco?
                </Text>
                <SelectComponent
                  options={smoketobaco}
                  onSelect={(option: any) => {
                    handleOptionPress("lifestyle_tabacco_id", option);
                  }}
                  textOption={
                    user?.lifestyle_tabacco
                      ? user?.lifestyle_tabacco?.name
                      : "Select"
                  }
                />
              </View>

              <View>
                <Text
                  style={[fonts.B1, { marginBottom: 10, color: theme.text }]}
                >
                  Do you smoke weed?
                </Text>
                <SelectComponent
                  options={smokeweed}
                  onSelect={(option: any) => {
                    handleOptionPress("lifestyle_weed_id", option);
                  }}
                  textOption={
                    user?.lifestyle_weed ? user.lifestyle_weed?.name : "Select"
                  }
                />
              </View>

              <View>
                <Text
                  style={[fonts.B1, { marginBottom: 10, color: theme.text }]}
                >
                  Do you use drugs?
                </Text>
                <SelectComponent
                  options={drugs}
                  onSelect={(option: any) => {
                    handleOptionPress("lifestyle_drug_id", option);
                  }}
                  textOption={
                    user?.lifestyle_drug ? user.lifestyle_drug?.name : "Select"
                  }
                />
              </View>
            </View>
          </ScrollView>
        ) : (
          <Text style={{ color: theme.text }}>No selected menu</Text>
        )}
      </ScrollView>
      <View
        style={[
          styles.bannerContainer,
          { backgroundColor: theme.background, paddingHorizontal: 0 },
        ]}
      >
        <TouchableOpacity style={[styles.button]}>
          <Text
            style={[
              fonts.Btn,
              {
                color: colors.neutral.white,
              },
            ]}
            onPress={() => {
              console.log("VALIDATE", formDetails);
              ValidateForm();
            }}
          >
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
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 80, // Asegura espacio para el botón
  },
  keyboardContainer: {
    flexGrow: 1,
  },

  button: {
    backgroundColor: colors.primary.medium,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: "center",
    position: "absolute",
    bottom: 20, // Espacio desde la parte inferior
    left: 20,
    right: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    backgroundColor: colors.primary.medium,
    borderColor: colors.primary.medium,
  },
  checkboxText: {
    fontSize: 14,
    color: colors.neutral.dark,
    maxWidth: "80%",
  },

  buttonContainer: {
    justifyContent: "space-between",
    marginBottom: 24,
  },
  optionButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  optionButtonB: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    fontWeight: "600",
  },
  selectedText: {},

  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },

  disabledButton: {
    backgroundColor: colors.neutral.medium,
    opacity: 0.5, // Opacidad reducida cuando el botón está deshabilitado
  },
  questionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 16,
  },
  questionHeader: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  menuContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 6,
  },
  menuItem: {
    marginRight: 20,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  selectedMenuItem: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary.medium,
    marginBottom: -6,
  },
  menuText: {
    fontSize: 16,
    color: colors.neutral.darkest,
    fontWeight: "500",
  },
  selectedMenuText: {
    color: colors.primary.medium,
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
  chatContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  chatContent: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  modalBackground2: {
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView2: {
    backgroundColor: colors.neutral.white,
    borderRadius: 20,
    padding: 20,
    width: "80%",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  horizontalButtonContainer: {
    width: "100%",
    marginTop: 12,
  },
  buttonText: {
    color: colors.neutral.white,
    justifyContent: "center",
    alignSelf: "center",
  },
  confirmButton: {
    backgroundColor: colors.primary.medium,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  bannerContainer: {
    height: 90,
    paddingTop: 16,
    paddingBottom: 10,
    paddingHorizontal: 16,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5, // Solo en Android
      },
    }),
  },
});
