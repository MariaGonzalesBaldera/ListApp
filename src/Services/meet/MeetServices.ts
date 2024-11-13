import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {environment} from './../environtment';


async function GetGenders() {
  try {

    const token = await AsyncStorage.getItem('token');

    const url = `${environment.urlApi}/api/genders`;
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
      console.log('ErrorU:', error.message);
      return error.message;
  }
}

async function UserSwipe() {
  try {

    const token = await AsyncStorage.getItem('token');

    const url = `${environment.urlApi}/api/me/users_interests?length=12`;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Accept': 'application/json',
    };

    const response = await axios.get(url, {headers});

    // Verificar el estado de la respuesta
    if (response.status === 200) {
      return response.data.data;
    } else {
      // Manejar otros casos de respuesta aquí si es necesario
      console.log(response.data.status)
      return 'other'
    } 
  } catch (error: any) {
      console.log('ErrorU:', error.message);
      return error.message;
  }
}

async function UserRematch() {
  try {

    const token = await AsyncStorage.getItem('token');

    const url = `${environment.urlApi}/api/me/swipes/rematch`;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Accept': 'application/json',
    };

    const response = await axios.get(url, {headers});

    // Verificar el estado de la respuesta
    if (response.status === 200) {
      return response.data.data;
    } else {
      // Manejar otros casos de respuesta aquí si es necesario
      console.log(response.data.status)
      return 'other'
    } 
  } catch (error: any) {
      console.log('ErrorU:', error.message);
      return error.message;
  }
}

async function UserSwipe12() {
  try {

    const token = await AsyncStorage.getItem('token');

    const url = `${environment.urlApi}/api/me/users_interests?length=12`;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Accept': 'application/json',
    };

    const response = await axios.get(url, {headers});

    // Verificar el estado de la respuesta
    if (response.status === 200) {
      return response.data.data;
    } else {
      // Manejar otros casos de respuesta aquí si es necesario
      console.log(response.data.status)
      return 'other'
    } 
  } catch (error: any) {
      console.log('ErrorU:', error.message);
      return error.message;
  }
}

async function Swipe(user_to: string, is_like: boolean) {
  try {
    const token = await AsyncStorage.getItem('token');

    const url = `${environment.urlApi}/api/me/swipes`;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json', // Asegúrate de especificar el tipo de contenido
    };

    // Cuerpo de la petición
    const body = {
      user_to: user_to, // Usuario al que se le hace swipe
      is_like: is_like, // Indica si es like o dislike
    };

    console.log('body', body)

    const response = await axios.post(url, body, { headers });

    // Verificar el estado de la respuesta
    if (response.status === 200) {
      return response.data;
    } else {
      // Manejar otros casos de respuesta aquí si es necesario
      console.log(response.data.status);
      return 'other';
    }
  } catch (error: any) {
    console.log('ErrorU:', error.message);
    return error.message;
  }
}


async function GetAttributes() {
  try {
    const token = await AsyncStorage.getItem('token');

    const url = `${environment.urlApi}/api/attributes`; // editated /me/ 
    
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    };

    const response = await axios.get(url, { headers });

    if (response.status === 200) {
      return response.data.data;
    } else {
      console.log(response.data.status);
      return 'other';
    }
  } catch (error: any) {
    console.log('Error:', error.message);
    return error.message;
  }
}

async function PostAttributes(attributes: any) {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log(token);

    const url = `${environment.urlApi}/api/me/users/attributes`;
    
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    {/* {
    "attributes": [
        {
            "attribute_id": 1,
            "priority": 2
        },
        {
            "attribute_id": 2,
            "priority": 1
        }
    ]
} */}
    const response = await axios.post(url, attributes, { headers });

    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      console.log(response.data.status);
      return 'other';
    }
  } catch (error: any) {
    console.log('Error:', error.message);
    return error.message;
  }
}



// Exporta las funciones que necesites utilizar en tu código.
export {
  GetGenders,
  UserSwipe,
  GetAttributes,
  PostAttributes,
  Swipe,
  UserSwipe12,
  UserRematch
};