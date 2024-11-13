import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {environment} from '../environtment';


async function GetInfobyUser(id: any) {
  try {

    const token = await AsyncStorage.getItem('token');
    console.log(token)


    const url = `${environment.urlApi}/api/me/users?by_userId=${id}`;
    
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    };

    const response = await axios.get(url, { headers });

    if (response.status === 200) {
      console.log('responsegibyud', response.data.data)
      return response.data.data;
    } else {
      // Manejar otros casos de respuesta aquí si es necesario
      console.log(response.data.status)
      return response.data;
    } 
  } catch (error: any) {
      console.log('ErrorA:', error.message);
      return error.message;
  }
}

async function GetChatbyUser(id : any) {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log(token)

    const url = `${environment.urlApi}/api/me/chat_messages/with_user/${id}`
    //${id}`;
    
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    };

    const response = await axios.get(url, { headers });

    if (response.status === 200) {
      //console.log('response', (response.data.access_token).toString())
      return response?.data.data;
    } else {
      // Manejar otros casos de respuesta aquí si es necesario
      console.log(response.data.status)
      return response.data;
    } 
  } catch (error: any) {
      console.log('ErrorA:', error.message);
      return error.message;
  }
}

async function GetQuestion() {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log(token)

    const url = `${environment.urlApi}/api/me/chat_messages/questions`
    //${id}`;
    
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    };

    const response = await axios.get(url, { headers });

    if (response.status === 200) {
      //console.log('response', (response.data.access_token).toString())
      return response?.data.data;
    } else {
      // Manejar otros casos de respuesta aquí si es necesario
      console.log(response.data.status)
      return response.data;
    } 
  } catch (error: any) {
      console.log('ErrorA:', error.message);
      return error.message;
  }
}

//To-do
async function GetNotificationChat(id: any) {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log(token)

    const url = `${environment.urlApi}/api/me/chat_messages/with_user/${id}/notifications`
    //${id}`;
    
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    };

    const response = await axios.get(url, { headers });

    if (response.status === 200) {
      //console.log('response', (response.data.access_token).toString())
      return response?.data.data
    } else {
      // Manejar otros casos de respuesta aquí si es necesario
      console.log(response.data.status)
      return response.data;
    } 
  } catch (error: any) {
      console.log('ErrorA:', error.message);
      return error.message;
  }
}


async function Matches() {
  try {

    const token = await AsyncStorage.getItem('token');
    console.log(token)

    const url = `${environment.urlApi}/api/me/matches`;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };


    const response = await axios.get(url, { headers });

    if (response.status === 200) {
      //console.log('response', (response.data.access_token).toString())
      return response.data.data;
    } else {
      // Manejar otros casos de respuesta aquí si es necesario
      console.log(response.data.status)
      return response.data;
    } 
  } catch (error: any) {
      console.log('ErrorA:', error.message);
      return error.message;
  }
}



async function UpdateLegal(id: any, image_url:any , title_es:any , title_en:any,abstract_es:any , abstract_en:any , content_es:any,content_en:any ){
  try {

    const token = await AsyncStorage.getItem('token');
    console.log(token)

    const url = `${environment.urlApi}/api/legals/${id}`;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const data = {
      
      image_url:image_url ,//"http://image.com/image.jpg",
      title_es:title_es ,//,//"ejemplo",
      title_en:title_en ,//"ejemplo",
      abstract_es:abstract_es ,//"ejemplo",
      abstract_en:abstract_en ,//"ejemplo",
      content_es:content_es ,//"ejemplo",
      content_en:content_en ,//"ejemplo"
      
    };

    const response = await axios.patch(url, data, { headers });

    if (response.status === 200) {
      //console.log('response', (response.data.access_token).toString())
      return response.data.status;
    } else {
      // Manejar otros casos de respuesta aquí si es necesario
      console.log(response.data.status)
      return response.data;
    } 
  } catch (error: any) {
      console.log('ErrorA:', error.message);
      return error.message;
  }
}



async function DeleteLegal(id:any) { 
  try {
    const token = await AsyncStorage.getItem('token');
    console.log(token)

    const url = `${environment.urlApi}/api/legals/${id}`;

    const headers = {
     Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const body = {
     
    };

    const response = await axios.delete(url, { data: body, headers });

    if (response.status === 200) {
      //console.log('response', (response.data.access_token).toString())
      return response.data.status;
    } else {
      // Manejar otros casos de respuesta aquí si es necesario
      console.log(response.data.status)
      return response.data;
    } 
  } catch (error: any) {
      console.log('ErrorA:', error.message);
      return error.message;
  }
}

async function CancelMatch(id:string) { 
  try {
    const token = await AsyncStorage.getItem('token');
    console.log(token)

    const url = `${environment.urlApi}/api/me/matches/${id}`;

    const headers = {
     Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const body = {
     
    };

    const response = await axios.delete(url, { data: body, headers });

    if (response.status === 200) {
      //console.log('response', (response.data.access_token).toString())
      return response.data.status;
    } else {
      // Manejar otros casos de respuesta aquí si es necesario
      console.log(response.data.status)
      return response.data;
    } 
  } catch (error: any) {
      console.log('ErrorA:', error.message);
      return error.message;
  }
}

async function GetChats() {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log(token)

    const url = `${environment.urlApi}/api/me/chat_messages/chats`
    //${id}`;
    
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    };

    const response = await axios.get(url, { headers });

    if (response.status === 200) {
      //console.log('response', (response.data.access_token).toString())
      return response?.data;
    } else {
      // Manejar otros casos de respuesta aquí si es necesario
      console.log(response.data.status)
      return response.data;
    } 
  } catch (error: any) {
      console.log('ErrorA:', error.message);
      return error.message;
  }
}

async function GetRandom() {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log(token)

    const url = `${environment.urlApi}/api/me/chat_messages/questions`
    //${id}`;
    
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    };

    const response = await axios.get(url, { headers });

    if (response.status === 200) {
      //console.log('response', (response.data.access_token).toString())
      return response?.data.data;
    } else {
      // Manejar otros casos de respuesta aquí si es necesario
      console.log(response.data.status)
      return response.data;
    } 
  } catch (error: any) {
      console.log('ErrorA:', error.message);
      return error.message;
  }
}

// Exporta las funciones que necesites utilizar en tu código.
export {
  GetChats,
  GetInfobyUser,
  GetChatbyUser,
  Matches,
  UpdateLegal,
  DeleteLegal,
  CancelMatch,
  GetRandom,
  GetQuestion,
  GetNotificationChat
};