import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  GetEducation,
  GetEthnicity,
  GetSunsign,
} from '../../Services/User/UserServices';
import Header from '../../Components/Header';
import colors from '../../Utils/colors';
import fonts from '../../Utils/fonts';
import {environment} from '../../Services/environtment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeContext} from '../../Components/themeContext';

const SelectionScreen = ({route, navigation}: any) => {
  const {type, onSelect} = route.params;
  const {theme} = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    sunSign: [],
    ethnicity: [],
    education: [],
  });

  // Función para seleccionar una opción y regresar a la pantalla de formulario
  const handleSelect = (value: any) => {
    onSelect(formData); // Envía el objeto formData completo
    navigation.goBack(); // Regresa a la pantalla anterior
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      // Aquí vamos a realizar varias solicitudes dependiendo de qué datos estén presentes

      // Envía sunSign si tiene datos
      if (formData.sunSign.length > 0) {
        console.log(formData.sunSign);

        const responseSunSign = await fetch(
          `${environment.urlApi}/api/me/sunsigns`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            // Asegúrate de que el nombre de la propiedad sea 'sunsigns'
            body: JSON.stringify({sunsigns: formData.sunSign}),
          },
        );

        if (!responseSunSign.ok) {
          throw new Error('Error al enviar sunSign');
        } else {
          console.log('SunSign enviado correctamente');
        }
      }

      // Envía ethnicity si tiene datos
      if (formData.ethnicity.length > 0) {
        try {
          const responseEthnicity = await fetch(
            `${environment.urlApi}/api/me/ethnicities`,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ethnicities: formData.ethnicity}), // Cambiar a 'ethnicities' si corresponde
            },
          );

          if (!responseEthnicity.ok) {
            // Lee el texto de la respuesta para obtener información sobre el error
            const errorText = await responseEthnicity.text();
            throw new Error(`Error al enviar ethnicity: ${errorText}`);
          } else {
            console.log('Ethnicity enviado correctamente');
          }
        } catch (error) {
          console.log(`Error en el envío: ${error}`);
        }
      }

      // Envía education si tiene datos
      // Envía education si tiene datos
      if (formData.education.length > 0) {
        try {
          console.log(formData.education);
          const responseEducation = await fetch(
            `${environment.urlApi}/api/me/educations`,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({educations: formData.education}), // Asegúrate que la estructura sea correcta
            },
          );

          if (!responseEducation.ok) {
            // Lee el texto de la respuesta para ver el error
            const errorText = await responseEducation.text();
            throw new Error(`Error al enviar education: ${errorText}`);
          } else {
            console.log('Education enviado correctamente');
          }
        } catch (error) {
          console.log(`Error en el envío: ${error}`);
        }
      }

      // Si todas las solicitudes fueron exitosas, volvemos a la pantalla anterior con la data actualizada
      handleSelect(formData);
    } catch (error) {
      console.log('Error en el envío:', error);
    }
  };

  const handleOptionPressMultiple = (
    attributeId: number,
    field: 'sunSign' | 'ethnicity' | 'education',
  ) => {
    // Aseguramos que el campo sea un array y el nombre del campo sea correcto
    const updatedFormDetails = {
      ...formData,
      [field]: formData[field] || [],
    };

    // Buscamos si el atributo ya está seleccionado
    const existingAttribute = updatedFormDetails[field].find(
      item => item.sunsigns_id === attributeId,
    );

    if (existingAttribute) {
      // Si el atributo ya está seleccionado, lo eliminamos
      updatedFormDetails[field] = updatedFormDetails[field].filter(
        item => item.sunsigns_id !== attributeId,
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
      updatedFormDetails[field],
    );

    // Actualizamos el estado con los detalles actualizados
    setFormData(updatedFormDetails);
  };

  const handleOptionPressMultiple2 = (
    attributeId: number,
    field: 'sunSign' | 'ethnicity' | 'education',
  ) => {
    // Aseguramos que el campo sea un array y el nombre del campo sea correcto
    const updatedFormDetails = {
      ...formData,
      [field]: formData[field] || [],
    };

    // Buscamos si el atributo ya está seleccionado
    const existingAttribute = updatedFormDetails[field].find(
      item => item.ethnicities_id === attributeId,
    );

    if (existingAttribute) {
      // Si el atributo ya está seleccionado, lo eliminamos
      updatedFormDetails[field] = updatedFormDetails[field].filter(
        item => item.ethnicities_id !== attributeId,
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
      updatedFormDetails[field],
    );

    // Actualizamos el estado con los detalles actualizados
    setFormData(updatedFormDetails);
  };

  const handleOptionPressMultiple3 = (
    attributeId: number,
    field: 'sunSign' | 'ethnicity' | 'education',
  ) => {
    // Aseguramos que el campo sea un array y el nombre del campo sea correcto
    const updatedFormDetails = {
      ...formData,
      [field]: formData[field] || [],
    };

    // Buscamos si el atributo ya está seleccionado
    const existingAttribute = updatedFormDetails[field].find(
      item => item.education_id === attributeId,
    );

    if (existingAttribute) {
      // Si el atributo ya está seleccionado, lo eliminamos
      updatedFormDetails[field] = updatedFormDetails[field].filter(
        item => item.education_id !== attributeId,
      );
    } else {
      // Añadimos el atributo sin límite
      updatedFormDetails[field].push({
        education_id: attributeId, // Cambiado a "sunsigns_id"
      });
    }

    // Consola para ver el resultado
    console.log(
      `Atributos seleccionados para ${field}:`,
      updatedFormDetails[field],
    );

    // Actualizamos el estado con los detalles actualizados
    setFormData(updatedFormDetails);
  };

  const [sunSign, setSunsign] = useState([]);
  const [ethnicity, setEthnicity] = useState([]);
  const [education, setEducation] = useState([]);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const data = await GetEducation();

        setEducation(data);
      } catch (error) {
        console.error('Error fetching education levels:', error);
      }
    };
    const fetchSunsign = async () => {
      try {
        const data = await GetSunsign();

        setSunsign(data);
      } catch (error) {
        console.error('Error fetching education levels:', error);
      }
    };

    const fetchEthnicity = async () => {
      try {
        const data = await GetEthnicity();

        setEthnicity(data);
      } catch (error) {
        console.error('Error fetching education levels:', error);
      }
    };

    fetchEducation();
    fetchSunsign();
    fetchEthnicity();
  }, []); // El array vacío [] hace que useEffect se ejecute solo una vez cuando el componente se monta.

  console.log(sunSign);

  const renderOptions = () => {
    switch (type) {
      case 'sunSign':
        return (
          <>
            <Header onPress={() => navigation.goBack()} />
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={{marginTop: 40}}
              contentContainerStyle={styles.scrollViewContent}>
              {sunSign?.length > 0 ? (
                sunSign.map(attribute => {
                  const isSelected = formData.sunSign.some(
                    item => item.sunsigns_id === attribute.id,
                  );
                  const isDisabled =
                    formData.sunSign.length >= 3 && !isSelected;

                  return (
                    <TouchableOpacity
                      key={attribute.id}
                      style={[
                        styles.optionButtonB,
                        isSelected && styles.selectedButtonB,
                        isDisabled && styles.disabledButtonB,
                      ]}
                      onPress={() =>
                        !isDisabled &&
                        handleOptionPressMultiple(attribute.id, 'sunSign')
                      }
                      disabled={isDisabled}>
                      <Text
                        style={[
                          styles.optionText,
                          {color: theme.text},
                          isSelected && [
                            styles.selectedText,
                            {color: theme.text},
                          ],
                          isDisabled && styles.disabledText,
                        ]}>
                        {attribute.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <Text style={{color: colors.neutral.darkest}}>
                  No sun signs available.
                </Text>
              )}
            </ScrollView>

            <TouchableOpacity style={styles.button3} onPress={handleSubmit}>
              <Text style={{color: colors.neutral.white}}>Continue</Text>
            </TouchableOpacity>
          </>
        );
      case 'ethnicity':
        return (
          <>
            <Header onPress={() => navigation.goBack()} />

            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={{marginTop: 40}}
              contentContainerStyle={styles.scrollViewContent}>
              {ethnicity?.length > 0 ? (
                ethnicity.map(attribute => {
                  // Verificamos si el atributo está seleccionado
                  const isSelected = formData.ethnicity.some(
                    item => item.ethnicities_id === attribute.id,
                  );
                  const isDisabled =
                    formData.ethnicity.length >= 3 && !isSelected; // Deshabilitar si ya hay 3 seleccionados

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
                        handleOptionPressMultiple2(attribute.id, 'ethnicity')
                      }
                      disabled={isDisabled}>
                      <Text
                        style={[
                          styles.optionText,{color:theme.text},
                          isSelected && [styles.selectedText,{color:theme.text}], // Estilo de texto para seleccionados
                          isDisabled && styles.disabledText, // Estilo de texto para deshabilitados
                        ]}>
                        {attribute.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <Text style={{color: colors.neutral.darkest}}>
                  No ethnicities available.
                </Text>
              )}
            </ScrollView>

            <TouchableOpacity style={styles.button3} onPress={handleSubmit}>
              <Text style={{color: colors.neutral.white}}>Continue</Text>
            </TouchableOpacity>
          </>
        );
      case 'education':
        return (
          <>
            <Header onPress={() => navigation.goBack()} />

            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={{marginTop: 40}}
              contentContainerStyle={styles.scrollViewContent}>
              {education?.length > 0 ? (
                education.map(attribute => {
                  // Verificamos si el atributo está seleccionado
                  const isSelected = formData.education.some(
                    item => item.education_id === attribute.id,
                  );
                  const isDisabled =
                    formData.education.length >= 3 && !isSelected; // Deshabilitar si ya hay 3 seleccionados

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
                        handleOptionPressMultiple3(attribute.id, 'education')
                      }
                      disabled={isDisabled}>
                      <Text
                        style={[
                          styles.optionText,{color:theme.text},
                          isSelected && [styles.selectedText,{color:theme.text}], // Estilo de texto para seleccionados
                          isDisabled && styles.disabledText, // Estilo de texto para deshabilitados
                        ]}>
                        {attribute.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <Text style={{color: colors.neutral.darkest}}>
                  No education options available.
                </Text>
              )}
            </ScrollView>

            <TouchableOpacity style={styles.button3} onPress={handleSubmit}>
              <Text style={{color: colors.neutral.white}}>Continue</Text>
            </TouchableOpacity>
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
      }}>
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
    marginBottom: 12,
  },
  button3: {
    backgroundColor: colors.primary.medium,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 16,
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
    borderBottomColor: colors.neutral.white,
    backgroundColor: colors.neutral.white,
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
});

export default SelectionScreen;