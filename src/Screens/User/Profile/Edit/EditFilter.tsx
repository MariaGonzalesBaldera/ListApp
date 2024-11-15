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
  TouchableWithoutFeedback,
} from "react-native";

import fonts from "../../../../Utils/fonts";
import colors from "../../../../Utils/colors";
import { ArrowLeft } from "../../../../Assets/svg";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
import HeaderUser from "../../../../Components/HeaderUser";
import {
  GetAttributes,
  MeUser,
  UpdateAttributes,
  UpdateProfile,
} from "../../../../Services/User/UserServices";
import { ThemeContext } from "../../../../Components/themeContext";

export default function Register() {
  const [stage, setStage] = useState(1); // Estado para controlar la etapa del proceso de registro
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const [list, setList] = useState([]);
  const [atributes, setAtributes] = useState([]);
  useEffect(() => {
    const fetchAtributes = async () => {
      const data = await GetAttributes();
      setAtributes(data);
      console.log("atributes: ", data);
    };

    fetchAtributes();
  }, []);

  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await MeUser();
        setUser(userData.attributes);
        setList(userData.attributes);
        console.log("LIST", userData.attributes);
        setFormDetails((prevFormData) => ({
          ...prevFormData,
          list: userData.attributes,
        }));
        console.log("$$$$ ", formDetails.list);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  // Valores Config Perfil
  const [formDetails, setFormDetails] = useState({
    age: "",
    apple_id: "",
    childrens: "",
    description: "",
    distance_max: 100,
    distance_min: 1,
    ethnicity: "",
    family_plans: "",
    gender: "",
    genders_id: "",
    google_id: "",
    height: "",
    is_accept_terms: true,
    is_receive_marketing: true,
    latitude: "",
    longitude: "",
    list: [],
    lookings: [], // Campo modificado
    looking_for: "",
    percentage_profile: "",
    prompts: [],
    photos: [],
    pronouns: "",
    pronouns_id: "",
    relationship: "",
    work: "", // Campo modificado
    sex_interest: "",
    sex_interests_id: "",
    sun_sign: "",
    jobtitle: "", // Campos adicionales añadidos
    school: "",
    education: "",
    religion: "",
    political: "",
    active: "",
    drink: "",
    smoke: "",
    profile_photo: "",
    deleted_at: "",
  });

  // Verifica si ambos campos están vacíos
  const disableBtn1 =
    formDetails.pronouns.trim() === "" || formDetails.gender.trim() === "";
  const disableBtn2 = formDetails.prompts.length > 2;
  const disableBtn3 = !(formDetails.photos.length < 3);

  const handleOptionPressMultiple = (attributeId: number) => {
    const updatedFormDetails = { ...formDetails };
  
    // Busca si el atributo ya está en la lista
    const existingAttribute = updatedFormDetails.list.find(
      (item) => item.id === attributeId
    );
  
    if (existingAttribute) {
      // Si ya existe, elimínalo de la lista
      updatedFormDetails.list = updatedFormDetails.list.filter(
        (item) => item.id !== attributeId
      );
    } else {
      // Solo agrega un nuevo atributo si la lista tiene menos de 3 elementos
      if (updatedFormDetails.list.length < 3) {
        updatedFormDetails.list.push({
          id: attributeId,
          UsersAttributesEntity: {
            priority: updatedFormDetails.list.length + 1,
          },
        });
      } else {
        // Si ya hay 3 seleccionados, no hacemos nada
        return;
      }
    }
  
    // Reasigna `priority` para mantenerlo secuencial del 1 al 3
    updatedFormDetails.list.forEach((item, index) => {
      item.UsersAttributesEntity.priority = index + 1;
    });
  
    // Actualiza el estado con el nuevo `updatedFormDetails`
    setFormDetails(updatedFormDetails);
  };
  
  const handleOptionPress = (field: any, value: any) => {
    setFormDetails((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleContinue = () => {
    // Aquí puedes manejar la lógica para avanzar al siguiente paso del registro
    setStage(stage + 1); // Avanza a la siguiente etapa
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
          <View
            style={[
              styles.modalView2,
              { backgroundColor: theme.backgroundChat },
            ]}
          >
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  const ModalAgree = ({ visible, onClose }: any) => (
    <GenericModal visible={visible} onClose={onClose}>
      <Text
        style={[
          styles.modalTitle,
          fonts.H4,
          { marginTop: 12, color: theme.text },
        ]}
      >
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

  const ValidateForm = async () => {
    const transformedData = {
      attributes: formDetails.list.map(item => ({
        attribute_id: item.id,
        priority: item.UsersAttributesEntity.priority
      }))
    };

    const Create = UpdateAttributes(transformedData);
    if ((await Create) === true) {
      console.log("EXITO UPDATE");
      setAgreeVisible(true);
    }
  };
  const selectedNames = user.map((item) => item.name);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <SafeAreaView />
      <HeaderUser
        text="My list filter"
        svg={<ArrowLeft color={theme.text} />}
        onPress={() => navigation.goBack()}
      />
      <ModalAgree
        visible={agreeVisible}
        onClose={() => setAgreeVisible(false)}
      />
      <View style={[styles.contentContainer]}>
        {formDetails.list.length === 0 ? (
          <Text
            style={[
              fonts.B1,
              { marginBottom: 24, marginTop: 15, color: theme.text },
            ]}
          >
            Select minimum 3 attributes in order of most to least important.
          </Text>
        ) : (
          <Text
            style={[
              fonts.B1,
              { marginBottom: 24, marginTop: 15, color: theme.text },
            ]}
          >
            Rank attributes in order of most to least important.
          </Text>
        )}

        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          {atributes?.length > 0 ? (
            atributes?.map((attribute, index) => {
              const selectedIds = formDetails.list.map((item) => item.id);
              const isSelected = selectedIds.includes(attribute.id);
              const isDisabled = formDetails.list.length >= 3 && !isSelected;

              return (
                <TouchableOpacity
                  key={attribute.id}
                  style={[
                    styles.optionButtonB,
                    isSelected && styles.selectedButtonB, // Estilo de seleccionado
                    isDisabled && {
                      backgroundColor: theme.disable,
                      borderWidth: isDisabled ? 0 : 1,
                    }, // Estilo de deshabilitado si ya hay 3 seleccionados
                  ]}
                  onPress={() =>
                    !isDisabled && handleOptionPressMultiple(attribute.id)
                  }
                  disabled={isDisabled}
                >
                  <Text
                    style={[
                      styles.optionText,
                      { color: isDisabled ? theme.textDisable : theme.text },
                      isSelected && [
                        styles.selectedText,
                        { color: theme.text },
                      ], // Estilo de texto seleccionado
                      isDisabled && styles.disabledText, // Estilo de texto deshabilitado
                    ]}
                  >
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
                        justifyContent: "center",
                        alignSelf: "center",
                      }}
                    >
                      <Text style={styles.number}>
                        {
                          formDetails.list.find(
                            (item) => item.id === attribute.id
                          )?.UsersAttributesEntity?.priority
                        }
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })
          ) : (
            <Text style={{ color: colors.neutral.darkest }}>
              No list options available.
            </Text>
          )}
        </ScrollView>
        <View
          style={[
            styles.bannerContainer,
            { backgroundColor: theme.background },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.button,
              formDetails.list.length < 3 && { backgroundColor: theme.disable },
            ]}
            onPress={() => ValidateForm()}
            disabled={formDetails.list.length < 3}
          >
            <Text
              style={[
                fonts.Btn,
                {
                  color:
                    formDetails.list.length < 3
                      ? theme.textDisable
                      : colors.neutral.white,
                },
              ]}
            >
              Save changes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: theme.text },
              formDetails.list.length < 3 && { backgroundColor: theme.disable },
            ]}
            onPress={() => ValidateForm()}
            disabled={formDetails.list.length < 3}
          >
            <Text
              style={[
                fonts.Btn,
                {
                  color:
                    formDetails.list.length < 3
                      ? theme.textDisable
                      : theme.background,
                },
              ]}
            >
              Set more filters
            </Text>
          </TouchableOpacity>
        </View>
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
    alignItems: "center",
    marginBottom: 10,
    // position: 'absolute',
    // bottom: 20, // Espacio desde la parte inferior
    // left: 20,
    // right: 20,
  },
  button2: {
    backgroundColor: colors.neutral.darkest,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 0, // Coloca el botón al final de la pantalla
  },
  button3: {
    backgroundColor: colors.neutral.dark,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 12, // Coloca el botón al final de la pantalla
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  codeInput: {
    borderWidth: 1,
    borderColor: colors.neutral.light,
    fontSize: 20,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: "15%",
    textAlign: "center",
  },
  selectedText: {},
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
    borderColor: colors.neutral.light,
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

  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 0,
  },

  number: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.neutral.darkest,
    justifyContent: "flex-end",
    alignSelf: "center",
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
    flexDirection: "row",
    width: "100%",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  //
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    position: "absolute",
    top: "12%", // Adjust this value to position the modal correctly
    right: "10%", // Adjust this value to position the modal correctly
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView2: {
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
    flexDirection: "row",
    alignItems: "center",
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
    flexDirection: "row",
    alignItems: "center",
  },
  button4: {
    backgroundColor: colors.primary.medium,
    borderRadius: 20,
    paddingVertical: 12,
    marginBottom: 15,
    alignItems: "center",
    marginTop: "auto",
  },
  buttonText: {
    color: colors.neutral.white,
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonText2: {
    color: colors.neutral.darkest,
  },
  bannerContainer: {
    paddingTop: 10,
    height: 90,
    width: "100%",
    marginBottom: 0,
  },
});
