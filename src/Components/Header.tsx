import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {ArrowLeft, Lupa} from '../Assets/svg';
import colors from '../Utils/colors';
import {ThemeContext} from '../Components/themeContext';

export default function Header({onPress, onPress2, lupa}: any) {
  const themeContext = useContext(ThemeContext);

  const {theme} = themeContext;
  return (
    <View style={[styles.header,{backgroundColor:theme.background}]}>
      <TouchableOpacity style={{padding:6}}  onPress={() => onPress()} >
        <ArrowLeft color={theme.text}/>
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <Image
          source={require('../Assets/img/logo.png')} // Ruta de tu imagen
          style={styles.image}
          resizeMode="contain" // Ajuste de la imagen
          tintColor={theme.text}
        />
      </View>
      {lupa && (
        <TouchableOpacity onPress={() => onPress2()}>
          <Lupa color={theme.text}/>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', // Alineación horizontal
    justifyContent: 'center', // Espacio entre los elementos
    alignItems: 'center', // Alineación vertical
    paddingHorizontal: 1, // Espacio horizontal interno
    paddingTop: 10, // Espacio superior interno
    paddingBottom: 10, // Espacio inferior interno
  },
  imageContainer: {
    flex: 1, // La imagen ocupa 1 parte del espacio disponible
    alignItems: 'center', // Centrar horizontalmente
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
