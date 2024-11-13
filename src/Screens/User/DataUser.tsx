import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  Modal,
} from "react-native";
import {
  GetEducation,
  GetEthnicity,
  GetGenders,
  GetSexInterests,
  GetSunsign,
  MeUser,
  UpdateEducations,
  UpdateProfileSingle,
} from "../../Services/User/UserServices";
import Header from "../../Components/Header";
import colors from "../../Utils/colors";
import { environment } from "../../Services/environtment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../../Components/themeContext";
import fonts from "../../Utils/fonts";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const SelectionUserScreen = ({ route, navigation }: any) => {
  const { type, onSelect } = route.params;
  console.log("type ", type);
  console.log("onSelect ", onSelect);
  const [toInterest, setToInterest] = useState("");
  const [toEducation, setToEducation] = useState([]);

  const { theme, isDarkMode } = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    sunSign: [],
    ethnicity: [],
    education: [],
    genders: [],
    sex_interests_id: null,
  });
  const UpdateSexInterestMeet = async (value) => {
    setToInterest(value);
    const update = UpdateProfileSingle({ sex_interests_id: value });

    if ((await update) === true) {
      setAgreeVisible(true);
      console.log("EXITO UPDATE");
    }
  };
  const UpdateEducation = async () => {
    const update = UpdateEducations(formData.education);

    if ((await update) === true) {
      setAgreeVisible(true);
      console.log("EXITO UPDATE");
    }
  };
  const handleOptionPress = (field: any, value: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    if (field === "sex_interests_id") {
      setToInterest((prev) => (prev === value ? null : value));
    }
  };
  // Función para seleccionar una opción y regresar a la pantalla de formulario
  const handleSelect = (value: any) => {
    onSelect(formData); // Envía el objeto formData completo
    navigation.goBack(); // Regresa a la pantalla anterior
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      // Aquí vamos a realizar varias solicitudes dependiendo de qué datos estén presentes

      // Envía sunSign si tiene datos
      if (formData.sunSign.length > 0) {
        console.log(formData.sunSign);

        const responseSunSign = await fetch(
          `${environment.urlApi}/api/me/sunsigns`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            // Asegúrate de que el nombre de la propiedad sea 'sunsigns'
            body: JSON.stringify({ sunsigns: formData.sunSign }),
          }
        );

        if (!responseSunSign.ok) {
          throw new Error("Error al enviar sunSign");
        } else {
          setAgreeVisible(true);
          console.log("EXITO UPDATE");        }
      }

      // Envía ethnicity si tiene datos
      if (formData.ethnicity.length > 0) {
        try {
          const responseEthnicity = await fetch(
            `${environment.urlApi}/api/me/ethnicities`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ethnicities: formData.ethnicity }), // Cambiar a 'ethnicities' si corresponde
            }
          );

          if (!responseEthnicity.ok) {
            // Lee el texto de la respuesta para obtener información sobre el error
            const errorText = await responseEthnicity.text();
            throw new Error(`Error al enviar ethnicity: ${errorText}`);
          } else {
            setAgreeVisible(true);
            console.log("EXITO UPDATE");
          }
        } catch (error) {
          console.log(`Error en el envío: ${error}`);
        }
      }
 
      if (formData.education.length > 0) {
        try {
          console.log("FFF",formData.education);
          const responseEducation = await fetch(
            `${environment.urlApi}/api/me/educations`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ educations: formData.education }), // Asegúrate que la estructura sea correcta
            }
          );

          if (!responseEducation.ok) {
            // Lee el texto de la respuesta para ver el error
            const errorText = await responseEducation.text();
            throw new Error(`Error al enviar education: ${errorText}`);
          } else {
            setAgreeVisible(true);
            console.log("EXITO UPDATE");          }
        } catch (error) {
          console.log(`Error en el envío: ${error}`);
        }
      }
      if (formData.genders.length > 0) {
        console.log(formData.genders);

        const responseGenders = await fetch(
          `${environment.urlApi}/api/me/genders`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            // Asegúrate de que el nombre de la propiedad sea 'genders'
            body: JSON.stringify({ genders: formData.genders }),
          }
        );

        if (!responseGenders.ok) {
          throw new Error("Error al enviar genders");
        } else {
          console.log("Genders enviado correctamente");
        }
      }

      // Si todas las solicitudes fueron exitosas, volvemos a la pantalla anterior con la data actualizada
      handleSelect(formData);
    } catch (error) {
      console.log("Error en el envío:", error);
    }
  };

  const handleOptionPressMultiple = (
    attributeId: number,
    field: "sunSign" | "ethnicity" | "education" | "genders"
  ) => {
    // Aseguramos que el campo sea un array y el nombre del campo sea correcto
    const updatedFormDetails = {
      ...formData,
      [field]: formData[field] || [],
    };

    // Buscamos si el atributo ya está seleccionado
    const existingAttribute = updatedFormDetails[field].find(
      (item) => item.sunsigns_id === attributeId
    );
    console.log("wwwww",updatedFormDetails)

    if (existingAttribute) {
      // Si el atributo ya está seleccionado, lo eliminamos
      updatedFormDetails[field] = updatedFormDetails[field].filter(
        (item) => item.sunsigns_id !== attributeId
      );
    } else {
      // Añadimos el atributo sin límite
      updatedFormDetails[field].push({
        sunsigns_id: attributeId, // Cambiado a "sunsigns_id"
      });
    }

    // Consola para ver el resultado
    console.log(
      `Atributos seleccionados para ${field}:`,
      updatedFormDetails[field]
    );

    // Actualizamos el estado con los detalles actualizados
    setFormData(updatedFormDetails);
  };

  const handleOptionPressMultiple2 = (
    attributeId: number,
    field: "sunSign" | "ethnicity" | "education"
  ) => {
    // Aseguramos que el campo sea un array y el nombre del campo sea correcto
    const updatedFormDetails = {
      ...formData,
      [field]: formData[field] || [],
    };

    // Buscamos si el atributo ya está seleccionado
    const existingAttribute = updatedFormDetails[field].find(
      (item) => item.ethnicities_id === attributeId
    );

    if (existingAttribute) {
      // Si el atributo ya está seleccionado, lo eliminamos
      updatedFormDetails[field] = updatedFormDetails[field].filter(
        (item) => item.ethnicities_id !== attributeId
      );
    } else {
      // Añadimos el atributo sin límite
      updatedFormDetails[field].push({
        ethnicities_id: attributeId, // Cambiado a "sunsigns_id"
      });
    }

    // Consola para ver el resultado
    console.log(
      `Atributos seleccionados para ${field}:`,
      updatedFormDetails[field]
    );

    // Actualizamos el estado con los detalles actualizados
    setFormData(updatedFormDetails);
  };

  const handleOptionPressMultiple3 = (
    field: "sunSign" | "ethnicity" | "education" | "genders",
    attributeId: number
  ) => {
    const updatedFormDetails = {
      ...formData,
      [field]: formData[field] || [], // Asegura que sea un array
    };
  
    // Verifica si el atributo ya está seleccionado
    const existingAttribute = updatedFormDetails[field].find(
      (item) => item.education_id === attributeId
    );
  
    if (existingAttribute) {
      // Si ya está seleccionado, se deselecciona
      updatedFormDetails[field] = updatedFormDetails[field].filter(
        (item) => item.education_id !== attributeId
      );
    } else {
      // Si el número de selecciones es menor a 3, agrega la nueva selección
      if (updatedFormDetails[field].length < 3) {
        updatedFormDetails[field].push({
          education_id: attributeId,
        });
      } else {
        console.log("Máximo de tres selecciones alcanzado.");
      }
    }
  
    console.log(`Atributos seleccionados para ${field}:`, updatedFormDetails[field]);
    setFormData(updatedFormDetails);
  };
  

  const handleOptionPressMultiple4 = (
    attributeId: number,
    field: "sunSign" | "ethnicity" | "education" | "genders"
  ) => {
    const updatedFormDetails = {
      ...formData,
      [field]: formData[field] || [],
    };
    const existingAttribute = updatedFormDetails[field].find(
      (item) => item.id === attributeId
    );
    if (existingAttribute) {
      updatedFormDetails[field] = updatedFormDetails[field].filter(
        (item) => item.id !== attributeId
      );
    } else {
      updatedFormDetails[field].push({
        id: attributeId,
      });
    }

    // Consola para ver el resultado
    console.log(
      `Atributos seleccionados para ${field}:`,
      updatedFormDetails[field]
    );

    // Actualizamos el estado con los detalles actualizados
    setFormData(updatedFormDetails);
  };
  interface ItemsData {
    id: string;
    name: string;
  }
  const [sunSign, setSunsign] = useState([]);
  const [sex, setSex] = useState<ItemsData[]>([]);
  const [ethnicity, setEthnicity] = useState([]);
  const [education, setEducation] = useState([]);
  const disableBtn3 = formData.sex_interests_id == null;
  const disableBtn4 = formData.education.length < 0;
  const disableBtn5= formData.ethnicity.length < 0;

  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
    const fetchUser = async () => {
      try {
        const userData = await MeUser();
        setToInterest(userData.sex_interests_id);
        const formattedData = userData.educations.map((item) => ({
          id: item.id.toString(),
          name: item.name,
        }));
        console.log("education me", formattedData);
        setToEducation(formattedData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    const fetchEducation = async () => {
      try {
        const data = await GetEducation();
        const formattedData = data.map((item) => ({
          id: item.id,
          name: item.name,
        }));
        setEducation(formattedData);
        console.log("fetch education:", formattedData);
      } catch (error) {
        console.error("Error fetching education levels:", error);
      }
    };
    const fetchSunsign = async () => {
      try {
        const data = await GetSunsign();

        setSunsign(data);
      } catch (error) {
        console.error("Error fetching sunsign levels:", error);
      }
    };

    const fetchEthnicity = async () => {
      try {
        const data = await GetEthnicity();

        setEthnicity(data);
      } catch (error) {
        console.error("Error fetching ethnicity levels:", error);
      }
    };
    const fetchSex = async () => {
      const data = await GetSexInterests();
      const formattedData = data.map((item) => ({
        id: item.id,
        name: item.name,
      }));

      setSex(formattedData);
      console.log("sex interests ", formattedData);
    };
    fetchUser();
    fetchEducation();
    fetchSunsign();
    fetchEthnicity();
    fetchSex();
  }, []); // El array vacío [] hace que useEffect se ejecute solo una vez cuando el componente se monta.

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
  
  const renderOptions = () => {
    switch (type) {
      case "sunSign":
        return (
          <>
            <Header onPress={() => navigation.goBack()} />

            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 40 }}
              contentContainerStyle={styles.scrollViewContent}
            >
              {sunSign?.length > 0 ? (
                sunSign.map((attribute) => {
                  // Extrae los IDs seleccionados de onSelect
                  const selectedIds = onSelect.map(
                    (item) => item.UsersSunsignsEntity.sunsigns_id
                  );

                  // Verifica si el atributo actual está seleccionado
                  const isSelected = selectedIds.includes(
                    attribute.id);
                  // Si hay más de tres seleccionados, desactiva el resto
                  const isDisabled = selectedIds.length >= 3 && !isSelected;

                  return (
                    <TouchableOpacity
                      key={attribute.id}
                      style={[
                        styles.optionButtonB,
                        isSelected && styles.selectedButtonB, // Aplica el estilo si está seleccionado
                        isDisabled && styles.disabledButtonB, // Aplica el estilo si está desactivado
                      ]}
                      onPress={() =>
                        !isDisabled &&
                        handleOptionPressMultiple(attribute.id, "sunSign")
                      }
                      disabled={isDisabled}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          { color: theme.text },
                          isSelected && [
                            styles.selectedText,
                            { color: theme.text }, // Color si está seleccionado
                          ],
                          isDisabled && styles.disabledText,
                        ]}
                      >
                        {attribute.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <Text style={{ color: colors.neutral.darkest }}>
                  No sun signs available.
                </Text>
              )}
            </ScrollView>

            <TouchableOpacity
              style={[
                styles.button3,
                disableBtn3 && { backgroundColor: theme.disable },
              ]}
              onPress={handleSubmit}
            >
              <Text
                style={[
                  fonts.Btn,
                  {
                    color: disableBtn3
                      ? theme.textDisable
                      : colors.neutral.white,
                  },
                ]}
              >
                Save change
              </Text>
            </TouchableOpacity>
          </>
        );
      case "ethnicity":
        return (
          <>
            <Header onPress={() => navigation.goBack()} />
            <ModalAgree
              visible={agreeVisible}
              onClose={() => setAgreeVisible(false)}
            />
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 40 }}
              contentContainerStyle={styles.scrollViewContent}
            >
              {ethnicity?.length > 0 ? (
                ethnicity.map((attribute) => {
                  // Extrae los IDs seleccionados de onSelect
                  const selectedIds = onSelect.map(
                    (item) => item.UsersEthnicitiesEntity.ethnicities_id
                  );

                  // Verifica si el atributo actual está seleccionado
                  const isSelected = selectedIds.includes(attribute.id);

                  // Si hay más de tres seleccionados, desactiva el resto
                  const isDisabled = selectedIds.length >= 3 && !isSelected;

                  return (
                    <TouchableOpacity
                      key={attribute.id}
                      style={[
                        styles.optionButtonB,
                        isSelected && styles.selectedButtonB, // Estilo para elementos seleccionados
                        isDisabled && styles.disabledButtonB, // Estilo para elementos deshabilitados
                      ]}
                      onPress={() =>
                        !isDisabled &&
                        handleOptionPressMultiple2(attribute.id, "ethnicity")
                      }
                      disabled={isDisabled}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          { color: theme.text },
                          isSelected && [
                            styles.selectedText,
                            { color: theme.text },
                          ], // Estilo de texto para seleccionados
                          isDisabled && styles.disabledText, // Estilo de texto para deshabilitados
                        ]}
                      >
                        {attribute.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <Text style={{ color: colors.neutral.darkest }}>
                  No ethnicities available.
                </Text>
              )}
            </ScrollView>

            <TouchableOpacity style={[
                styles.button3,
                disableBtn5 && { backgroundColor: theme.disable },
              ]}
            onPress={handleSubmit}>
              <Text style={[
                  fonts.Btn,
                  {
                    color: disableBtn5
                      ? theme.textDisable
                      : colors.neutral.white,
                  },
                ]}>Save change</Text>
            </TouchableOpacity>
          </>
        );
      case "education":
        return (
          <>
            <Header onPress={() => navigation.goBack()} />
            <ModalAgree
              visible={agreeVisible}
              onClose={() => setAgreeVisible(false)}
            />
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 40 }}
              contentContainerStyle={styles.scrollViewContent}
            >
              {education?.length > 0 ? (
                education.map((attribute) => {
                  const selectedIds = onSelect.map(
                    (item) => item.UsersEducationsEntity.education_id
                  );
                  // Verifica si el ID actual está en la lista de IDs seleccionados
                  const isSelected = selectedIds.includes(
                    attribute.id
                  );
                  const isDisabled = selectedIds.length >= 3 && !isSelected;

                  return (
                    <TouchableOpacity
                      key={attribute.id}
                      style={[
                        styles.optionButtonB,
                        isSelected && styles.selectedButtonB, // Aplica el estilo si está seleccionado
                        isDisabled && styles.disabledButtonB, // Aplica el estilo si está desactivado
                      ]}
                      onPress={() => {
                        if (!isDisabled) handleOptionPressMultiple3("education", attribute.id);
                      }}
                      disabled={isDisabled}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          { color: theme.text },
                          isSelected && [
                            styles.selectedText,
                            { color: theme.text }, // Color si está seleccionado
                          ],
                          isDisabled && styles.disabledText,
                        ]}
                      >
                        {attribute.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <Text style={{ color: colors.neutral.darkest }}>
                  No education options available.
                </Text>
              )}
            </ScrollView>

            <TouchableOpacity
              style={[
                styles.button3,
                disableBtn4 && { backgroundColor: theme.disable },
              ]}
              onPress={handleSubmit}
              >
              <Text
                style={[
                  fonts.Btn,
                  {
                    color: disableBtn4
                      ? theme.textDisable
                      : colors.neutral.white,
                  },
                ]}
              >
                Save change
              </Text>
            </TouchableOpacity>
          </>
        );
      case "gender":
        return (
          <>
            <Header onPress={() => navigation.goBack()} />
            <ModalAgree
              visible={agreeVisible}
              onClose={() => setAgreeVisible(false)}
            />
            <Text style={[fonts.H3, { marginVertical: 20, color: theme.text }]}>
              Who do you want to date?
            </Text>
            <Text style={[fonts.B1, { marginBottom: 24, color: theme.text }]}>
              Select the gender of your interest.
            </Text>

            <View style={styles.buttonContainer}>
              {sex?.length > 0 ? (
                sex?.map((attribute, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionButton,
                      toInterest === attribute.id && {
                        backgroundColor: isDarkMode
                          ? colors.primary.dark
                          : colors.primary.light,
                        borderWidth: 0,
                      },
                    ]}
                    onPress={() => {
                      handleOptionPress("sex_interests_id", attribute.id);
                    }}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        { color: theme.text },
                        toInterest === attribute.id && styles.selecteddText,
                      ]}
                    >
                      {attribute.name}
                    </Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text>Loading genders...</Text>
              )}
            </View>
            <View
              style={[
                styles.bannerContainer,
                { backgroundColor: theme.background, paddingHorizontal: 0 },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.button,
                  disableBtn3 && {
                    backgroundColor: theme.disable,
                  },
                ]}
                disabled={disableBtn3}
              >
                <Text
                  style={[
                    fonts.Btn,
                    {
                      color: disableBtn3
                        ? theme.textDisable
                        : colors.neutral.white,
                    },
                  ]}
                  onPress={() => UpdateSexInterestMeet(toInterest)}
                >
                  Save change
                </Text>
              </TouchableOpacity>
            </View>
          </>
        );
      default:
        return <Text>No hay opciones disponibles</Text>;
    }
  };

  return (
    <View
      style={{
        backgroundColor: theme.background,
        paddingHorizontal: 16,
        flex: 1,
      }}
    >
      <SafeAreaView />
      {renderOptions()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: colors.neutral.white,
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
    alignItems: "center",
    marginTop: "auto",
  },
  button2: {
    backgroundColor: colors.neutral.darkest,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8, // Coloca el botón al final de la pantalla
    marginBottom: 16,
  },
  buttonL: {
    backgroundColor: colors.neutral.darkest,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  button3: {
    backgroundColor: colors.primary.medium,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 16,
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
  selectedText: {
    color: colors.neutral.darkest,
  },

  scrollViewContent: {
    paddingBottom: 20,
  },

  number: {
    fontSize: 14,
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
  map: {
    marginVertical: 20,
    height: 240,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
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
  divider: {
    width: 1,
    height: "100%",
    backgroundColor: colors.neutral.light,
    marginLeft: 16,
  },
  verticalContainer: {
    flexDirection: "column",
  },
  verticalItem: {
    marginBottom: 12,
    flexDirection: "row",
  },
  menuContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.white,
    backgroundColor: colors.neutral.white,
  },
  menuItem: {
    marginRight: 20,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
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
    flexDirection: "row",
    alignItems: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  chatContent: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  disabledButtonB: {
    backgroundColor: "lightgray",
  },
  disabledText: {
    color: "gray",
  },
  modalText: {
    paddingVertical: 10,
    fontSize: 16,
    ...fonts.C2B,
  },
  modalView2: {
    backgroundColor: colors.neutral.white,
    borderRadius: 20,
    padding: 20,
    width: "80%",
    position: "relative",
  },
  modalBackground2: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
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
  confirmButton: {
    backgroundColor: colors.primary.medium,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  buttonText: {
    color: colors.neutral.white,
    justifyContent: "center",
    alignSelf: "center",
  }, 
  cancelButton: {
    backgroundColor: colors.neutral.darkest,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginHorizontal: 5,
  },


  bannerContainer: {
    height: 90,
    width: "100%",
    flex: 1,
    marginBottom: 20,
  },
});

export default SelectionUserScreen;
