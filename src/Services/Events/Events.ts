import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { environment } from './../environtment';

async function GetAssistants(id: any) {
  try {

    const token = await AsyncStorage.getItem('token');
    console.log(token)

    const url = `${environment.urlApi}/api/events/${id}/users`;
    //environment.apiGateway.conexion.conectando = true;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Accept': 'application/json',
    };

    const response = await axios.get(url, { headers });

    // Verificar el estado de la respuesta
    if (response.status === 200) {

      //await AsyncStorage.setItem('token', (response.data.access_token).toString());
      //await AsyncStorage.setItem('user', JSON.stringify(response.data.user)); // Convertir objeto a cadena JSON
      console.log('Data', response.data.data)
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

async function GetEvents() {
  try {

    const token = await AsyncStorage.getItem('token');
    console.log(token)

    const url = `${environment.urlApi}/api/events`;
    //environment.apiGateway.conexion.conectando = true;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Accept': 'application/json',
    };

    const response = await axios.get(url, { headers });

    // Verificar el estado de la respuesta
    if (response.status === 200) {

      //await AsyncStorage.setItem('token', (response.data.access_token).toString());
      //await AsyncStorage.setItem('user', JSON.stringify(response.data.user)); // Convertir objeto a cadena JSON
      console.log('Data', response.data.data)
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

async function GetMyEvents() {
  try {

    const token = await AsyncStorage.getItem('token');
    console.log(token)

    const url = `${environment.urlApi}/api/me/events`;
    //environment.apiGateway.conexion.conectando = true;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Accept': 'application/json',
    };

    const response = await axios.get(url, { headers });

    // Verificar el estado de la respuesta
    if (response.status === 200) {

      //await AsyncStorage.setItem('token', (response.data.access_token).toString());
      //await AsyncStorage.setItem('user', JSON.stringify(response.data.user)); // Convertir objeto a cadena JSON
      console.log('Data', response.data.data)
      return response.data;
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
async function GetFilteredEvents(filters: any) {
  try {
    const token = await AsyncStorage.getItem('token');


    const url = `${environment.urlApi}/api/events`;
    console.log(token)
    const params = {
      length: 10,
      page: 1,
      is_exclusive: filters ? filters.is_exclusive || null : null,
      is_event_with_alcohol: filters ? filters.is_event_with_alcohol || null : null,
      //from_radius: filters? filters.from_radius || null : null,
      //to_radius: filters? filters.to_radius || null : null,
      from_date: filters ? filters.from_date || null : null,
      to_date: filters ? filters.to_date || null : null,
      from_time: filters ? filters.from_time || null : null,
      to_time: filters ? filters.to_time || null : null,
      from_price: filters ? filters.from_price || null : null,
      to_price: filters ? filters.to_price || null : null,
      musics: filters.musics || [],

      sports: filters.sports || [], // Si ya es un array, lo dejamos como está
      socials: filters.socials || [],
      communities: filters.communities || [],
      healths: filters.healths || [],
      seasonals: filters.seasonals || [],
    };
    console.log(params)
    // Serializa los parámetros con encodeURIComponent aplicado al array completo
    const serializedParams = Object.keys(params)
      .map(key => {
        if (params[key]?.constructor === Array) {
          if (params[key].length > 0)
            return `${key}=[${params[key].join(',')}]`
          else return null
        } else {
          if (params[key] !== null) return `${key}=${params[key]}`
          else return null
        }

      }).filter(val => val != null)
      .join('&');

    const fullUrl = `${url}?${serializedParams}`;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Accept': 'application/json',
    };
    const response = await axios.get(fullUrl, { headers });

    if (response.status === 200) {
      console.log('Filtered Events:', response.data.data);
      return response.data.data;
    } else {
      console.log('Error fetching events:', response.data.status);
      return [];
    }
  } catch (error: any) {
    console.log('Error fetching events:', error.message);
    return [];
  }
}
async function AcceptInvitation(invitationTicketId: any) {
  try {
    const token = await AsyncStorage.getItem('token');
    const url = `${environment.urlApi}/api/tickets/share_ticket/accept`;
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    };
    const body = {
      invitation_ticket_id: invitationTicketId,
    };
    console.log('BODY accept', body)

    const response = await axios.post(url, body, { headers });

    if (response.status === 200) {
      return response.data.data;
    } else {
      console.log(response.data.status)
      return 'other'
    }
  } catch (error: any) {
    console.log('Error:', error.message);
    return error.message;
  }
}
async function RejectInvitation(invitationTicketId: any) {
  try {

    const token = await AsyncStorage.getItem('token');

    const url = `${environment.urlApi}/api/tickets/share_ticket/rejected`;

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    };
    const body = {
      invitation_ticket_id: invitationTicketId,
    };
    console.log('Body reject: ', body)

    const response = await axios.post(url, body, { headers });

    if (response.status === 200) {
      return response.data.data;
    } else {
      console.log(response.data.status)
      return 'other'
    }
  } catch (error: any) {
    console.log('Error:', error.message);
    return error.message;
  }
}
async function SendInvitation(ticketId: any, toUser: any) {
  try {
    const token = await AsyncStorage.getItem('token');
    const url = `${environment.urlApi}/api/tickets/share_ticket/send_invitation`;
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    };
    const body = {
      ticket_id: ticketId,
      to_user: toUser
    };
    console.log('BODY', body)

    const response = await axios.post(url, body, { headers });

    if (response.status === 200) {
      return response.data.data;
    } else {
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
  GetEvents,
  GetMyEvents,
  GetFilteredEvents,
  GetAssistants,
  AcceptInvitation,
  RejectInvitation,
  SendInvitation
};
