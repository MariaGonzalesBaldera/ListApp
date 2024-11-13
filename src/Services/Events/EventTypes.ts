import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {environment} from './../environtment';
export type EventType = {
    id: number,
    name: string,
    checked: boolean
  }
async function GetEventTypes(name: string): Promise<EventType[]> {
  try {

    const token = await AsyncStorage.getItem('token');
    console.log(token)

    const url = `${environment.urlApi}/api/${name}`;
    //environment.apiGateway.conexion.conectando = true;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Accept': 'application/json',
    };

    const response = await axios.get(url, {headers});

    // Verificar el estado de la respuesta
    if (response.status === 200) {
      
      //await AsyncStorage.setItem('token', (response.data.access_token).toString());
      //await AsyncStorage.setItem('user', JSON.stringify(response.data.user)); // Convertir objeto a cadena JSON
      console.log('Data', response.data.data)
      return response.data.data;
    } else {
      // Manejar otros casos de respuesta aquí si es necesario
      console.log(response.data.status)
      return [] as EventType[]
    } 
  } catch (error: any) {
      console.log('ErrorU:', error.message);
      return error.message;
  }
}

export {
    GetEventTypes,
  };