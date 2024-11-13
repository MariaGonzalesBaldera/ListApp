import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import fonts from '../../../Utils/fonts'
import { useNavigation } from '@react-navigation/native';

import ButtonComponent from '../../../Components/Button'
import ButtonOutline from '../../../Components/ButtonOutlined';
import { ArrowLeft, Heartw } from '../../../Assets/svg';
import colors from '../../../Utils/colors';

import { useAuth } from '../../../Context/AuthContext';
import { MeUser } from '../../../Services/User/UserServices';
import { GetInfobyUser } from '../../../Services/Messaging/MessagingServices';

export default function Match({ route }: any) {
  const { userId } = route.params; // Obtén el userId de los parámetros
  const navigation = useNavigation()
  const {login} = useAuth()
  const [user, setUser] = useState(false);
  const [user2, setUser2] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await MeUser(); // Aquí asumes que `MeUser` es una función que obtiene datos del usuario
        setUser(userData);
        console.log('userData', userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchInfo = async () => {
      try {
        const userData = await GetInfobyUser(userId); // Aquí asumes que `MeUser` es una función que obtiene datos del usuario
        setUser2(userData);
        console.log('userData2', userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };



    // Ejecuta la función `fetchUser` directamente cuando el componente se monta
    fetchUser();
    fetchInfo()


  }, []); // Solo depende de navigation


  
  return (
    <ImageBackground
      source={require('../../../Assets/img/match.png')} // Ruta de la imagen de fondo
      style={styles.backgroundImage}
      resizeMode="cover" // Ajuste de la imagen de fondo
    >
      <View style={styles.container}>
        {/* Imagen encima del ImageBackground */}
        <Text style={[fonts.H2, {marginBottom:10, color:colors.neutral.white}]}>It's a <Text style={{color: colors.secondary.medium}}>Match!</Text></Text>
        <Text style={[fonts.B4, {marginBottom:10, color:colors.neutral.white}]}>You have liked each other</Text>
        <View style={{flexDirection:'row', paddingVertical: 40}}>
          <View style={{alignItems:'center'}}>
          <Image 
            source={{ uri: user?.profile_image || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y' }} 
            style={styles.centeredImage} 
          />
          <Text style={[fonts.B4, {marginBottom:10, color:colors.neutral.white, marginTop: 12}]}>You</Text>
          </View>
          <Heartw/>
          <View style={{alignItems:'center'}}>
          <Image 
            source={{ uri: user2?.profile_image || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y' }} 
            style={styles.centeredImage} 
          />
          <Text style={[fonts.B4, {marginBottom:10, color:colors.neutral.white, marginTop: 12}]}>{user2?.name}</Text>
          </View>
        </View>
         <Text style={[fonts.B4, {marginBottom:24, color: colors.neutral.white, textAlign:'center', paddingHorizontal:50}]}>It’s time to meet better. Ask her something interest to start a conversation.</Text>
        
        {/* Espacio en blanco con las puntas superiores redondeadas */}
        {/* Contenido adicional debajo */}
        <View style={styles.bottomContainer}>
         
          

        <ButtonComponent 
          onPress={() => navigation.navigate('ChatStack', { screen: 'messaging', params: { id: userId } })}
          text={'Start a conversation'} 
          colors={colors.primary.medium}
        />
              

              <TouchableOpacity onPress={() => navigation.goBack()} style={{marginTop: 10}} >
                <Text style={[fonts.Btn,{color: colors.neutral.white}]}>Back</Text>
              </TouchableOpacity>
       
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '45%', // Espacio arriba del 15%
  },
  centeredImage: {
    resizeMode:'contain',
    width: 140,
    height:140,
    borderRadius:70,
  },
  whiteSpace: {
    backgroundColor: colors.neutral.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',


  },
  bottomContainer: {
    backgroundColor: 'transparent',
    width:'100%',
    paddingHorizontal:24,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,

  },
  bottomText: {
    marginBottom: 20,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',

  },
  buttonText: {
    color: colors.neutral.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

