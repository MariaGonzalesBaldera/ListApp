{/* 
  <BottomUpModal
           isVisible={modalVisible}
           onClose={closeModal}
           contentComponent={<Text style={[styles.textmodal,fonts.Sb1B]}>Instrucción</Text>}
           cancelButtonText="Elegir de la Galeria"
           confirmButtonText="Tomar Foto"
           onPressA={() => openImagePicker()}
           onPressB={() => handleCameraLaunch()}
           onRrequestClose={closeModal}
         />
*/}


import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, TouchableWithoutFeedback, Platform } from 'react-native';

import colors from '../Utils/colors';
import { Camera, Gallery } from '../Assets/svg';
import fonts from '../Utils/fonts';
import { ThemeContext } from './themeContext';

const screenHeight = Dimensions.get('window').height;

const BottomUpModal = ({ isVisible, onClose, contentComponent, cancelButtonText, confirmButtonText, onPressA , onPressB, onRequestClose }: any) => {
  const translateY = useRef(new Animated.Value(screenHeight * 0.2)).current;
  const {theme, isDarkMode} = useContext(ThemeContext);

  useEffect(() => {
    if (isVisible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: screenHeight * 0.2,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isVisible]);

  return (
    <Modal
      transparent
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay}>
        <Animated.View style={[styles.modalContainer,{backgroundColor:theme.background}, { height: Platform.OS === 'ios' 
    ? (!cancelButtonText ? screenHeight * 0.20 : screenHeight * 0.26) 
    : (!cancelButtonText ? screenHeight * 0.24 : screenHeight * 0.29), transform: [{ translateY }] }]}>
          <View style={styles.modalContent}>
            {contentComponent || <Text style={[styles.textPerfil]}>Agrega una foto de Perfil</Text>}
            {/* Si se proporciona contentComponent, se renderiza ese componente, de lo contrario, se utiliza un Text predeterminado */}
          </View>

          { !cancelButtonText ? <></> : <>
          <TouchableOpacity
            style={styles.button}
            onPress={onPressA} 
          >
              <Camera color={colors.neutral.white}/>
              <Text style={[styles.closeButton, fonts.Btn]}>{cancelButtonText || 'Cerrar'}</Text>
          </TouchableOpacity></>}
           



            <TouchableOpacity
            style={styles.button}
            onPress={onPressB}
          >
               <Gallery color={colors.neutral.white}/>
              <Text style={[styles.confirmButton, fonts.Btn]}>{confirmButtonText || 'Confirmar'}</Text>
          </TouchableOpacity>

        </Animated.View>
      </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },
  modalHeader: {
  },
  closeButton: {
    color: colors.neutral.white,
    alignSelf:'center',
    marginLeft: 8
  },
  modalContent: {
    marginTop: 10,
    marginBottom: 20
  },
  modalFooter: {
    marginTop: 10,
  },
  confirmButton: {
    color: colors.neutral.white,
    alignSelf:'center',
    marginLeft: 8
  },
  textPerfil:{
    color: colors.neutral.darkest
  },
  divider: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginVertical: 10, // Puedes ajustar el espacio vertical según tus preferencias
  },
  button: {
    backgroundColor: colors.primary.medium,
    borderRadius: 20,
    paddingVertical: 12,
    width:'90%',
    alignItems: 'center',
     marginTop: 'auto', marginBottom: 16,
    flexDirection:'row',
    alignSelf:'center',
    justifyContent:'center'
  },
});

export default BottomUpModal;
