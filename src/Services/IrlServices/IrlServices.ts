import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {environment} from './../environtment';


async function GetHotspots() {
  try {

    const token = await AsyncStorage.getItem('token');

    const url = `${environment.urlApi}/api/hotspots`;
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
      return response.data.data;
    } else {
      // Manejar otros casos de respuesta aquí si es necesario
      console.log(response.data.status)
      return 'other'
    } 
  } catch (error: any) {
      console.log('ErrorUx:', error.message);
      return error.message;
  }
}

async function UpdatePosition(latitude: any , longitude : any) { 
  try {
    const token = await AsyncStorage.getItem('token');
    console.log(token);

    const url = `${environment.urlApi}/api/me/users/position`;
    
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const body = { 
      latitude: latitude,//"hansgianfranco@gmail.com",
      longitude: longitude //"@Hgcm123456"
    };

    console.log('BODY UPDATE POSITION', body)

    const response = await axios.post(url, body, { headers });

    console.log('RESPONSE UPDATE POSITION',response.data)

    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      console.log(response.data.status);
      return 'other';
    }
  } catch (error: any) {
    console.log('ErrorUpdatePosition:', error.message);
    return error.message;
  }
}

async function GetNearbyHotspots(latitude: any , longitude : any) { 
  try {

    const token = await AsyncStorage.getItem('token');

    const url = `${environment.urlApi}/api/hotspots/nearby`;
    
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    };

    const body = { 
      latitude: latitude,//"hansgianfranco@gmail.com",
      longitude: longitude //"@Hgcm123456"
    };

    console.log('BODY nearby' , body)

    const response = await axios.post(url, body, { headers });

    console.log('RESPONSE nearby POSITION',response.data)

    if (response.data.status === true) {
      return response.data.data;
    } else {
      // Manejar otros casos de respuesta aquí si es necesario
      console.log(response.data.status)
      return 'other'
    } 
  } catch (error: any) {
      console.log('Error:', error.message);
      return error.message;
  }
}

// Exporta las funciones que necesites utilizar en tu código.
export {
  GetHotspots,
  GetNearbyHotspots,
  UpdatePosition,
};