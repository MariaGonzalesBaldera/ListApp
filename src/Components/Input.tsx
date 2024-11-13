import React, { useState, useCallback } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import colors from '../Utils/colors';

const InputText = ({ id, placeholder, showSvgBack, showSvg, showSpecialSvg, type, value, onChangeText, isError }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecureText, setIsSecureText] = useState(type === 'password');

  // Comprobamos si value es nulo, si lo es, lo cambiamos a una cadena vacía
  const sanitizedValue = value === null ? '' : value;

  const handleToggleSecureText = useCallback(() => {
    setIsSecureText(prevState => !prevState);
  }, []);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, isFocused || sanitizedValue.length > 0 ? styles.titleFocused : null , { color: isError ? 'red' : '#B1ADC8'}]}>
        {isFocused || sanitizedValue.length > 0 ? placeholder : ''}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        {showSvgBack && (
          <View style={{ flex: 0.1 }}>
            {showSvgBack}
          </View>
        )}
        <TextInput
          style={[styles.input, isFocused ? styles.inputFocused : null , { color: '#B1ADC8'}]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={sanitizedValue} // Utilizamos el valor saneado
          onChangeText={(text) => onChangeText(id, text)} // Añadimos el id al callback onChangeText
          secureTextEntry={type === 'password' && isSecureText}
          placeholder={placeholder}
          placeholderTextColor={sanitizedValue.length > 0 ? '#666' : '#999'} // Cambia el color según la longitud del texto
          keyboardType={type === 'phone' ? 'phone-pad' : 'default'}
        />
        {type === 'password' && (
          <TouchableOpacity
            onPress={handleToggleSecureText}
            style={{ justifyContent: 'center', alignItems: 'center', flex: 0.1 }}
          >
            {isSecureText ? showSpecialSvg : showSvg}
          </TouchableOpacity>
        )}
      </View>
      <View style={[styles.divider, isFocused || sanitizedValue.length > 0 ? styles.dividerFocused : null, { backgroundColor: isError === true ? 'red' : '#B1ADC8'}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 7,
  },
  title: {
    fontSize: 12,
    color: 'blue',
    marginBottom: 2,
  },
  titleFocused: {
    color: colors.neutral.medium,
  },
  input: {

    borderColor: '#B1ADC8',
    fontSize: 14,
    flex: 0.8,
    height: Platform.OS === 'ios' ? 40 : 'auto'

  },
  inputFocused: {
    color: '#353344',
  },
  divider: {
    marginTop: 0,
    height: 1,
  
  },
  dividerFocused: {
    marginTop: 0,
    height: 1.5,
    backgroundColor: colors.neutral.medium,
  },
});

export default InputText;
