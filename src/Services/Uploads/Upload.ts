import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { environment } from '../environtment';
import RNFS from 'react-native-fs';

async function Upload(file: any) {
  try {
    // Obtener el token
    const token = await AsyncStorage.getItem('token');


    // Construir la URL
    const url = `${environment.urlApi}/api/image/upload/single`;



    // Configurar los encabezados
    const headers = {
      Authorization: `Bearer ${token}`,
      //Accept: "application/json",
      "Content-Type": "multipart/form-data"
    };


    //const imagePath = 'file:///data/user/0/com.somosgrandes/cache/rn_image_picker_lib_temp_e972c7f3-9b27-4d89-8afe-e74d88f73443.jpg';

    // Lee el archivo de imagen en crudo
    //const imageBuffer = RNFS.readFile(imagePath);

    // Realizar la solicitud POST
    const response = await axios.post(url, file, { headers });
    

    // Manejar la respuesta
    if (response.status === 200) {
      console.log('Exito')
      console.log('aaaaa',response.data)
      return response.data;
    } else {
      console.log('Error:', response.data.status);
      return response.data;
    }
  } catch (error: any) {
    if (error.response) {
      // Si la solicitud fue hecha y el servidor respondió con un código de estado que no está en el rango de 2xx
      console.log('Error de respuesta del servidor:', error.response);
      console.log('Estado de la respuesta:', error.response.status);
      console.log('Encabezados de la respuesta:', error.response.headers);
    } else if (error.request) {
      // Si la solicitud fue hecha pero no se recibió respuesta del servidor
      console.log('No se recibió respuesta del servidor:', error.request);
    } else {
      // Si ocurrió un error al configurar la solicitud
      console.log('Error al configurar la solicitud:', error.message);
    }
  }
}

async function UploadMultiple(file: any) {
  try {
    // Obtener el token
    const token = await AsyncStorage.getItem('token');


    // Construir la URL
    const url = `${environment.urlApi}/api/image/upload/multiple`;



    // Configurar los encabezados
    const headers = {
      Authorization: `Bearer ${token}`,
      //Accept: "application/json",
      "Content-Type": "multipart/form-data"
    };


    //const imagePath = 'file:///data/user/0/com.somosgrandes/cache/rn_image_picker_lib_temp_e972c7f3-9b27-4d89-8afe-e74d88f73443.jpg';

    // Lee el archivo de imagen en crudo
    //const imageBuffer = RNFS.readFile(imagePath);

    // Realizar la solicitud POST
    const response = await axios.post(url, file, { headers });
    

    // Manejar la respuesta
    if (response.status === 200) {
      console.log('Exito')
      console.log('aaaaa',response.data.data)
      return response.data.data;
    } else {
      console.log('Error:', response.data.status);
      return response.data;
    }
  } catch (error: any) {
    if (error.response) {
      // Si la solicitud fue hecha y el servidor respondió con un código de estado que no está en el rango de 2xx
      console.log('Error de respuesta del servidor:', error.response);
      console.log('Estado de la respuesta:', error.response.status);
      console.log('Encabezados de la respuesta:', error.response.headers);
    } else if (error.request) {
      // Si la solicitud fue hecha pero no se recibió respuesta del servidor
      console.log('No se recibió respuesta del servidor:', error.request);
    } else {
      // Si ocurrió un error al configurar la solicitud
      console.log('Error al configurar la solicitud:', error.message);
    }
  }
}




export {
  Upload,
  UploadMultiple
};
