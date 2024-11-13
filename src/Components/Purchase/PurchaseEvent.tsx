import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import fonts from '../../Utils/fonts';
import {useNavigation} from '@react-navigation/native';

import ButtonComponent from '../../Components/Button';

import colors from '../../Utils/colors';
import {Calendarw} from '../../Assets/svg';

import RNCalendarEvents from 'react-native-calendar-events';
import {ThemeContext} from '../themeContext';

export default function PurchaseEvent({img, name, text}: any) {
  const navigation = useNavigation();
  const {theme} = useContext(ThemeContext);

  useEffect(() => {
    // Solicitar permisos al iniciar la aplicación
    requestCalendarPermission();
  }, []);

  const requestCalendarPermission = async () => {
    const permission = await RNCalendarEvents.requestPermissions();
    if (permission !== 'authorized') {
      Alert.alert('Permiso denegado', 'No se puede acceder al calendario');
    }
  };

  const addEventToCalendar = async () => {
    try {
      const startDate = new Date(2024, 5, 20, 10, 0, 0); // 20 de junio de 2024, 10:00 AM
      const endDate = new Date(2024, 5, 20, 11, 0, 0); // 20 de junio de 2024, 11:00 AM

      const event = await RNCalendarEvents.saveEvent(
        'Recordatorio de ejemplo',
        {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          notes:
            'Este es un recordatorio de ejemplo para una reunión importante.',
          calendarId: '1', // Identificador del calendario. Puedes usar RNCalendarEvents.findCalendars() para obtenerlo.
        },
      );

      if (event) {
        Alert.alert('Éxito', 'El recordatorio se ha añadido al calendario');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al añadir el recordatorio');
      console.error(error);
    }
  };

  return (
    <ImageBackground
      source={img} // Ruta de la imagen de fondo
      style={styles.backgroundImage}
      resizeMode="cover" // Ajuste de la imagen de fondo
    >
      <View style={styles.container}>
        {/* Imagen encima del ImageBackground */}
        <Text
          style={[fonts.H3, {marginBottom: 10, color: colors.neutral.white}]}>
          You're in {name ? name : ''}
        </Text>
        <Text
          style={[
            fonts.H1,
            {
              marginBottom: 10,
              color: colors.neutral.white,
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              textAlign: 'center',
              paddingHorizontal: 24,
            },
          ]}>
          {text}
        </Text>

        {/* Espacio en blanco con las puntas superiores redondeadas */}
        {/* Contenido adicional debajo */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
            }}
            onPress={() => addEventToCalendar()}>
            <Calendarw color={"white"}/>
            <Text
              style={[
                fonts.Btn,
                {
                  marginBottom: 24,
                  color: colors.neutral.white,
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignSelf: 'center',
                  marginLeft: 4,
                  marginTop: 3,
                },
              ]}>
              Add to calendar
            </Text>
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <ButtonComponent
              onPress={() => console.log('A')}
              text={'See my ticket'}
              colors={colors.primary.medium}
              colorText={colors.primary.lighest}
            />
            <ButtonComponent
              onPress={() => navigation.navigate('assistants')}
              text={'See the list'}
              colors={theme.background}
              black={true}
              colorText={theme.text}
            />
          </View>
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
    paddingTop: '75%', // Espacio arriba del 15%
  },
  centeredImage: {
    resizeMode: 'contain',
  },
  whiteSpace: {
    backgroundColor: colors.neutral.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
  },
  bottomContainer: {
    backgroundColor: 'transparent',
    height: '40%',
    width: '100%',
    paddingHorizontal: 24,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 15,
  },
  bottomText: {
    marginBottom: 20,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
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
