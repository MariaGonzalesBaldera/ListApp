// En GradientButton.js

import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import fonts from '../Utils/fonts';

const GradientButton = ({
  onPress,
  text,
  colors,
  padd,
  showSvg,
  showSvgBack,
  disabled,
  black,
  colorText,
}: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonContainer,
        {
          backgroundColor: colors,
          borderRadius: 20,
          paddingVertical: 10,
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}
      disabled={disabled}>
      <View style={{flexDirection: 'row'}}>
        {showSvgBack && <View style={{paddingRight: 6}}>{showSvgBack}</View>}
        <Text style={[styles.buttonText, fonts.Btn, {color: colorText}]}>
          {text}
        </Text>

        {showSvg && <View style={{paddingLeft: 6}}>{showSvg}</View>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 5,
    width: '100%', // Ajusta el ancho al 100%
  },
  buttonText: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 2,
  },
  disabledGradient: {
    opacity: 0.5, // Cambia la opacidad para indicar que el botón está deshabilitado
  },
});

export default GradientButton;
