import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../Utils/colors';
import { Validator } from '../Assets/svg';
import { GetPromptsSubtitle } from '../Services/User/UserServices';
import { ThemeContext } from './themeContext';

const HorizontalVerticalMenu = ({ menus, options, onSelectedOptionsChange }: any) => {
  const [promptsSub, setPromptsSub] = useState([]);
  const {theme} = useContext(ThemeContext);
  const fetchPromptsSub = async (menuId: number) => {
    const data = await GetPromptsSubtitle(menuId);
    setPromptsSub(data);
  };

  const initialSelectedOptions: { [key: string]: string[] } = {}; // Objeto para almacenar opciones seleccionadas por menú
  menus.forEach((menu: any) => {
    initialSelectedOptions[menu.id] = [];
  });

  const [selectedMenu, setSelectedMenu] = useState(menus[0]?.id); // Por defecto, selecciona el primer menú
  const [selectedOptions, setSelectedOptions] = useState(initialSelectedOptions); // Estado para opciones seleccionadas

  useEffect(() => {
    fetchPromptsSub(selectedMenu); // Llamada al servicio cuando se monta el componente o cambia el menú seleccionado
  }, [selectedMenu]);

  const handleMenuSelect = (menuId: number) => {
    setSelectedMenu(menuId);
  };

  const handleOptionPress = (option: any) => {
    const currentOptions = selectedOptions[selectedMenu];
  
    // Construir el objeto de la opción seleccionada
    const optionObject = {
      prompt_id: option.id
    };
  
    // Contar el total de opciones seleccionadas en todos los menús
    const totalSelectedOptions = Object.values(selectedOptions).reduce(
      (total, options) => total + options.length,
      0
    );
  
    // Verificar si la opción ya está seleccionada
    const isOptionSelected = currentOptions.find((item: any) => item.prompt_id === option.id);
  
    let updatedOptions;
  
    // Si la opción ya está seleccionada, la eliminamos
    if (isOptionSelected) {
      updatedOptions = currentOptions.filter((item: any) => item.prompt_id !== option.id);
    } else {
      // Si la opción no está seleccionada, la añadimos solo si el total es menos de 3
      if (totalSelectedOptions < 3) {
        updatedOptions = [...currentOptions, optionObject];
      } else {
        return; // Salimos si ya hay 3 opciones seleccionadas en total
      }
    }
  
    // Actualizar las opciones seleccionadas para el menú actual
    const newSelectedOptions = {
      ...selectedOptions,
      [selectedMenu]: updatedOptions,
    };
  
    // Actualizar el estado de las opciones seleccionadas
    setSelectedOptions(newSelectedOptions);
  
    // Enviar el estado actualizado al componente padre
    onSelectedOptionsChange(newSelectedOptions);
  };
  
  

  useEffect(() => {
    console.log("Selected options updated:", selectedOptions);
  }, [selectedOptions]); // Este efecto se ejecutará cada vez que `selectedOptions` cambie

  return (
    <View>
      {/* ScrollView horizontal para mostrar los menús */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.menuContainer}>
        {menus.map((menu: any, index: any) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuButton,{backgroundColor:theme.background}, selectedMenu === menu.id ? styles.selectedMenu : null]}
            onPress={() => handleMenuSelect(menu.id)}
          >
            <Text style={[styles.menuText,{color:theme.text}, selectedMenu === menu.id ? styles.selectedText : null]}>{menu.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ScrollView vertical para mostrar las opciones del menú seleccionado */}
      <ScrollView style={styles.optionsContainer}>
      {promptsSub.map((option: any, index: any) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.optionButton,
        selectedOptions[selectedMenu].some((item: any) => item.prompt_id === option.id) ? styles.selectedOption : null
      ]}
      onPress={() => handleOptionPress(option)}
    >
      <Text style={[styles.optionText,{color:theme.text}]}>{option.name}</Text>
      {selectedOptions[selectedMenu].some((item: any) => item.prompt_id === option.id) && <Validator color={"red"} />}
    </TouchableOpacity>
  ))}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    maxHeight: 55, // Ajusta la altura máxima del menú
  },
  menuButton: {
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  selectedMenu: {
  },
  menuText: {
    fontSize: 16,
  },
  selectedText: {
    fontWeight: '600',
    color: colors.primary.medium
  },
  optionsContainer: {
    marginTop: 12,
  },
  optionText: {
    fontSize: 14,
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
  selectedOption: {
    borderColor: colors.primary.medium,
  },
  checkmark: {
    fontSize: 16,
    color: colors.primary.medium,
    marginLeft: 8,
  },
});

export default HorizontalVerticalMenu;