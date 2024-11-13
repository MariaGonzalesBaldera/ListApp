import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import fonts from '../Utils/fonts';

import Logo from '../Assets/img/logo.png';
import { ThemeContext } from './themeContext';

export default function HeaderUser({onPress, onPress2, svg , svg2 , text}: any){
  const {theme} = useContext(ThemeContext);

  return (
    <>
    <SafeAreaView/>
    <View style={[styles.header,{backgroundColor:theme.background}]}>
    <TouchableOpacity style={[styles.svgContainer]} onPress={() => onPress()}>
      {svg}
      </TouchableOpacity>
     

     <View style={styles.imageContainer}>
     {text ? (
        <Text style={[fonts.H4, {
          justifyContent: 'center', 
          alignContent: 'center', 
          alignItems: 'center', 
          alignSelf: 'center', 
          marginRight: svg2 ? 0 : 16, 
          marginLeft: svg ? 0 : 16,
          color: theme.text,
        }]}>
          {text}
        </Text>
      ) : (
        <Image 
          source={Logo} 
          tintColor={theme.text}
          style={{
            justifyContent: 'center', 
            alignContent: 'center', 
            alignItems: 'center', 
            alignSelf: 'center', 
            marginRight: svg2 ? 0 : 16, 
            marginLeft: svg ? 0 : 16,
            resizeMode:'contain',
            height: 40,
          }} 
        />
      )}
     </View>   

     <TouchableOpacity style={styles.svgContainer} onPress={() => onPress2()}>
     {svg2}
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
    paddingTop: 12, // Espacio superior interno
    paddingBottom: 12, // Espacio inferior interno
  },
  imageContainer: {
    flex: 1, // La imagen ocupa 1 parte del espacio disponible
    alignItems: 'center', // Centrar horizontalmente
    
  },
  image: {

    height: 40, // Altura fija de la imagen
    resizeMode:'contain'

  },
  svgContainer: {
    // Estilos para el contenedor del SVG
    // Ajusta según tus necesidades
    zIndex: 10,
  },
});
