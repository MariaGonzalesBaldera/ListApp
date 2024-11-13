import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { ArrowLeft, Lupa } from '../../../Assets/svg';
import colors from '../../../Utils/colors';
import fonts from '../../../Utils/fonts';
import { ThemeContext } from '../../themeContext';

export default function OlderHeader({onPress, onPress2}: any){
  const {theme} = useContext(ThemeContext);
  return (
    <>
    <SafeAreaView/>
    <View style={[styles.header,{backgroundColor:theme.background}]}>
    <TouchableOpacity onPress={() => onPress()}>
      <ArrowLeft color={theme.text}/>
      </TouchableOpacity>
     

     <View style={styles.imageContainer}>
      <Text style={[fonts.H4, {justifyContent:'center', alignContent:'center', alignItems:'center', alignSelf:'center',color:theme.text}]}>Older Chats</Text>
     </View>   

     <TouchableOpacity onPress={() => onPress2()}>
      <Lupa color={theme.text}/>
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
    paddingLeft:16
  },
  image: {
    width: '100%', // Ancho de la imagen al 100% del contenedor
    height: 40, // Altura fija de la imagen
    marginRight:16
  },
  svgContainer: {
    // Estilos para el contenedor del SVG
    // Ajusta según tus necesidades
  },
});
