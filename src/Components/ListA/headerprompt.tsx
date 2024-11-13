import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';
import {Close} from '../../Assets/svg';
import fonts from '../../Utils/fonts';
import {useNavigation} from '@react-navigation/native';
import {ThemeContext} from '../themeContext';

export default function Header({onPressA}: any) {
  const navigation = useNavigation();
  const {theme} = useContext(ThemeContext);

  return (
    <>
      <SafeAreaView />
      <View style={[styles.header,{backgroundColor:theme.background}]}>
        <View style={[styles.imageContainer]}>
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
            Select your prompts
          </Text>
        </View>

        <TouchableOpacity onPress={() => onPressA()}>
          <Close color={theme.text} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', // Alineación horizontal
    justifyContent: 'center', // Espacio entre los elementos
    alignItems: 'center', // Alineación vertical
    paddingHorizontal: 20, // Espacio horizontal interno
    paddingTop: 10, // Espacio superior interno
    paddingBottom: 10, // Espacio inferior interno
   },
  imageContainer: {
    flex: 1, // La imagen ocupa 1 parte del espacio disponible
    alignItems: 'center', // Centrar horizontalmente
    paddingLeft: 16,
  },
  image: {
    width: '100%', // Ancho de la imagen al 100% del contenedor
    height: 40, // Altura fija de la imagen
    marginRight: 16,
  },
  svgContainer: {
    // Estilos para el contenedor del SVG
    // Ajusta según tus necesidades
  },
});
