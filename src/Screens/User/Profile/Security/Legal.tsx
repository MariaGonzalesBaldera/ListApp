import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import OlderHeader from '../../../../Components/ChatComponents/Headers/OlderHeader';
import colors from '../../../../Utils/colors';
import { ArrowLeft, Close, Messaging, Verifysm } from '../../../../Assets/svg';
import { useNavigation } from '@react-navigation/native';
import HeaderUser from '../../../../Components/HeaderUser';
import fonts from '../../../../Utils/fonts';
import { Picker } from '@react-native-picker/picker';
import SelectComponent from '../../../../Components/select';
import { ThemeContext } from '../../../../Components/themeContext';
import { AllLegal, LegalbyID } from '../../../../Services/Legals/LegalServices';
import RenderHtml from 'react-native-render-html';

export default function FAQ() {
  const [selectedLegal, setSelectedLegal] = useState(null);
  const [selectedLegalTitle, setSelectedLegalTitle] = useState(null);
  const [displayText, setDisplayText] = useState('Lorem ipsum dolor sit amet consectetur.');
  const {theme} = useContext(ThemeContext);

  const { width } = useWindowDimensions();

  const [legal, setLegal] = useState();
  const [text, setText] = useState();

  useEffect(() => {
    const fetchLegal = async () => {
      try {
        const data = await AllLegal(); // Llama a la API para obtener los datos legales
        const transformedOptions = data?.map(item => ({
          label: item.name,
          value: item.id,
        }));
  
        if (transformedOptions && transformedOptions.length > 0) {
          setLegal(transformedOptions); // Guarda las opciones transformadas
          setSelectedLegal(transformedOptions[0].value); // Selecciona automáticamente el primer elemento
          setSelectedLegalTitle(transformedOptions[0].label); // Selecciona automáticamente el primer elemento
          console.log(selectedLegal)
          console.log(selectedLegalTitle)

        }
      } catch (error) {
        console.error('Error fetching legal options:', error);
      }
    };
  
    fetchLegal(); // Carga los datos legales al montar el componente
  }, []);
  
  useEffect(() => {
    const fetchText = async () => {
      if (selectedLegal) { // Solo ejecuta si hay un valor seleccionado en legal
        try {
          const data = await LegalbyID(selectedLegal); // Llama al servicio
          console.log(data); // Verifica que obtuviste la respuesta correcta
    
          if (data && data.length > 0) {
            const text = data[0].name; // Accede al texto desde el primer elemento
            setText(text); // Actualiza el estado con el texto
          }
        } catch (error) {
          console.error('Error fetching legal text:', error);
        }
      }
    };
  
    fetchText(); // Llama a fetchText cuando cambie el valor seleccionado
  }, [selectedLegal]); // Dependencia en selectedLegal
  
// Función para manejar cambios en la selección
  const handleSelectionChange = (itemValue: any) => {
    setSelectedLegal(itemValue); // Actualiza el ID seleccionado
  };

  const navigation = useNavigation();
  
  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <SafeAreaView />
      <HeaderUser text='Legal pages' svg={<ArrowLeft color={theme.text}/>} onPress={() => navigation.goBack()} />
     
      <View style={[styles.container,{backgroundColor:theme.background}]}>
        <Text style={[styles.label, {color: theme.text}]}>Please select:</Text>
       
        <View>
            <SelectComponent 
          options={legal} 
          //selectedValue={selectedLegalTitle ? selectedLegalTitle : 'Politics'} 
          onSelect={(itemValue) => handleSelectionChange(itemValue)} 
          textOption={selectedLegalTitle ? selectedLegalTitle : 'Politics'}
        />
        </View>

            
        <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false} style={[styles.textContainer]}>
          <Text style={[styles.text, {color: theme.text}]}>
          <RenderHtml
            contentWidth={width}
            source={{ html: text }}
          />
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal:16
  },
  label: {
    fontSize: 16,
    marginBottom: 18,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',

    flex:1,
    backgroundColor:'red'
  },
  picker: {
    height: 500,
    width: '100%',
  },
  textContainer: {
    marginTop: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  boldText: {
    fontWeight: 'bold',
  },
});
