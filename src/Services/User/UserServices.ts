import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { environment } from './../environtment';

async function OtpSend(phone: any, code: any) {
  try {
    const url = `${environment.urlApi}/api/auth/otp/sms/send`;


    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const body = {
      phone: `${code}${phone}`,
    };

    const response = await axios.post(url, body, { headers });

    if (response.status === 200) {
      console.log(response.data)
      return response.data.status;
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

async function OtpReceive(phone: any, code: any, codeCountry: any) {
  try {
    const url = `${environment.urlApi}/api/auth/otp/sms/verify`;
    const token = await AsyncStorage.getItem('token');


    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const body = {
      phone: `${codeCountry}${phone}`,
      code_otp: code,
    };

    const response = await axios.post(url, body, { headers });

    if (response.status === 200) {
      console.log(response.data)
      return response.data.status;
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

async function MeUser() {
  try {

    const token = await AsyncStorage.getItem('token');
    console.log(token)

    const url = `${environment.urlApi}/api/me/users`;
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

async function CreateUser(name: any, lastname: any, phone: any, email: any, password: any, is_receive_marketing: any, is_accept_terms: any) {
  try {
    const url = `${environment.urlApi}/api/auth/register`;

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body = {
      name: name,
      last_name: lastname,
      phone: "+51" + phone,
      email: email,
      password: password,
      is_receive_marketing: is_receive_marketing,
      is_accept_terms: is_accept_terms
    };

    console.log(body)

    const response = await axios.post(url, body, { headers });

    if (response.status === 200) {
      console.log('responsed', response.data.status);
      return response.data.status;
    } else {
      // Manejar otros casos de respuesta aquí si es necesario
      console.log(response.data.status)
      return 'other'
    }
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      const errorMessage = error.response.data.message;
      if (errorMessage === 'Error: This email is already registered') {
        console.log('Error:', errorMessage);
        return 'email';
      } else if (errorMessage === 'Error: This phone number is already registered') {
        console.log('Error:', errorMessage);
        return 'phone';
      } else {
        console.log('Error:', errorMessage);
        return errorMessage;
      }
    } else {
      console.log('Error:', error.message);
      return error.message;
    }
  }
}

async function LoginUser(email: any, password: any, latitude: any, longitude: any) {
  try {
    const url = `${environment.urlApi}/api/auth/login`;

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body = {
      email: email,
      password: password,
      latitude: latitude,
      longitude: longitude
    };

    const response = await axios.post(url, body, { headers });

    if (response.status === 200) {
      console.log('response', response.data);
      console.log('token', response?.data?.data?.accessToken);
      console.log('user', response?.data?.data?.user);

      const token = response.data.data.accessToken;
      const user = JSON.stringify(response.data.data.user);

      // Guardar el token y el JSON del usuario en AsyncStorage
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', user);

      console.log('status', response.status);

      return response.data.status;
    } else {
      // Manejar otros casos de respuesta aquí si es necesario
      return response.data.status;
    }
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      const errorMessage = error.response.data.message;
      if (errorMessage === 'Error: This email is already registered') {
        console.log('Error:', errorMessage);
        return 'email';
      } else {
        console.log('Error:', errorMessage);
        return errorMessage;
      }
    } else {
      console.log('Error:', error.message);
      return error;
    }
  }
}
async function LoginUserWithGoogle(email: any, google_id: any, latitude: any, longitude: any) {
  try {
    const url = `${environment.urlApi}/api/auth/login`;

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body = {
      email: email,
      google_id: google_id,
      latitude: latitude,
      longitude: longitude
    };

    const response = await axios.post(url, body, { headers });

    if (response.status === 200) {
      console.log('response', response.data);
      console.log('token', response?.data?.data?.accessToken);
      console.log('user', response?.data?.data?.user);

      const token = response.data.data.accessToken;
      const user = JSON.stringify(response.data.data.user);

      // Guardar el token y el JSON del usuario en AsyncStorage
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', user);

      console.log('status', response.status);

      return response.data.status;
    } else {
      // Manejar otros casos de respuesta aquí si es necesario
      return response.data.status;
    }
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      const errorMessage = error.response.data.message;
      if (errorMessage === 'Error: This email is already registered') {
        console.log('Error:', errorMessage);
        return 'email';
      } else {
        console.log('Error:', errorMessage);
        return errorMessage;
      }
    } else {
      console.log('Error:', error.message);
      return error;
    }
  }
}
 
interface ProfileBody {
  age: any, //
  height: any, //
  description: any, //
  relationship: any, //
  google_id?: any, //
  apple_id?: any, //
  profile_image?: any, //
  neighborhood?: any, //
  distance_min?: any,//
  distance_max?: any,//
  age_min?: any,
  age_max?: any,
  is_share_my_location?: any,
  want_to_meet?: any,
  work?: any, //
  school?: any, //
  job_name?: any, //
  latitude?: any, //
  longitude?: any, //
  pronouns_id?: any, //
  religions_id?: any, //
  politicals_id?: any, //
  lifestyle_active_id?: any, //
  lifestyle_drink_id?: any, //
  lifestyle_tabacco_id?: any,
  lifestyle_weed_id?: any,
  lifestyle_drug_id?: any,
  genders_id?: any, //
  lookings_for_id?: any, //
  family_plans_id?: any, //
  sex_interests_id?: any, //
  lifestyle_smoke_id?: any, //
  is_accept_terms?: any,//
  is_receive_marketing?: any,//
  percentage_profile?: any,//
  //prompts: any[],
  //photos: any[],
  //list:any[],
  lookings?: any[],
  //home: any, 
  //educations?:any, 
  looking_for?: any, //
  family_plans?: any, //

}


async function UpdateProfile(
  {
    age,
    height,
    description,
    relationship,
    google_id,
    apple_id,
    profile_image,
    neighborhood,
    distance_min = 15,
    distance_max = 75,
    age_min,
    age_max,
    is_share_my_location,
    want_to_meet,
    work,
    school,
    job_name,
    latitude,
    longitude,
    pronouns_id,
    religions_id,
    politicals_id,
    lifestyle_active_id,
    lifestyle_drink_id,
    lifestyle_tabacco_id,
    lifestyle_weed_id,
    lifestyle_drug_id,
    genders_id,
    lookings_for_id,
    family_plans_id,
    sex_interests_id,
    lifestyle_smoke_id,
    looking_for,
    family_plans,
    is_accept_terms,
    is_receive_marketing,
    percentage_profile,
    lookings
  }: ProfileBody
  // age?: any, //
  // height?: any, //CAMBIAR A TEXTO (NUMERICO ACTUAL)
  // description?: any, //
  // relationship?: any, //
  // google_id?: any, //
  // apple_id?: any, //
  // profile_image?: any, //
  // neighborhood?: any, //
  // distance_min?: 15,//
  // distance_max?: 75,//
  // age_min?: any,
  // age_max?: any,
  // is_share_my_location?: any,
  // want_to_meet?: any,

  // work?: any, //
  // school?: any, //

  // job_name?: any, //
  // latitude?: any, //
  // longitude?: any, //
  // pronouns_id?: any, //
  // religions_id?: any, //
  // politicals_id?: any, //
  // lifestyle_active_id?: any, //
  // lifestyle_drink_id?: any, //
  // lifestyle_tabacco_id?: any,
  // lifestyle_weed_id?: any,
  // lifestyle_drug_id?: any,
  // genders_id?: any, //
  // lookings_for_id?: any, //
  // family_plans_id?: any, //
  // sex_interests_id?: any, //
  // lifestyle_smoke_id?: any, //

  // looking_for?: any, //
  // family_plans?: any, //
  // sun_sign?: any, //
  // //prompts?: any[],
  // //photos?: any[],
  // //list?:any[],
  // //lookings?: any[],
  // //home?: any, 
  // //educations?:any, 
  // ethnicity?: any, //
) {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log(token);

    const url = `${environment.urlApi}/api/me/users`;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Accept': 'application/json',
    };

    const body: ProfileBody = {};
    // Añadir los campos de manera condicional si no están vacíos, nulos o inválidos
    if (work?.trim()) body.work = work;
    if (neighborhood?.trim()) body.neighborhood = neighborhood;
    //if (neighborhood !== null && neighborhood !== '' && !isNaN(neighborhood)) body.neighborhood = neighborhood;
    if (latitude !== null && latitude !== '' && !isNaN(latitude)) body.latitude = latitude;
    if (longitude !== null && longitude !== '' && !isNaN(longitude)) body.longitude = longitude;

    if (age !== null && age !== '' && !isNaN(age)) body.age = age;
    if (height !== null && height !== '' && !isNaN(height)) body.height = height;
    if (height?.trim()) body.height = height;
    if (lookings_for_id !== null && lookings_for_id !== '' && !isNaN(lookings_for_id)) body.lookings_for_id = lookings_for_id;
    if (family_plans_id !== null && family_plans_id !== '' && !isNaN(family_plans_id)) body.family_plans_id = family_plans_id;
    if (description?.trim()) body.description = description;


    if (relationship?.trim()) body.relationship = relationship;
    if (google_id?.trim()) body.google_id = google_id;
    if (apple_id?.trim()) body.apple_id = apple_id;
    if (typeof is_share_my_location === 'boolean') {
      body.is_share_my_location = is_share_my_location;
    }
    if (want_to_meet !== null && want_to_meet !== '' && !isNaN(want_to_meet)) body.want_to_meet = want_to_meet;
    if (distance_min !== null && distance_min !== '' && !isNaN(distance_min)) body.distance_min = distance_min;
    if (distance_max !== null && distance_max !== '' && !isNaN(distance_max)) body.distance_max = distance_max;

    if (age_min !== null && age_min !== '' && !isNaN(age_min)) body.age_min = age_min;
    if (age_max !== null && age_max !== '' && !isNaN(age_max)) body.age_max = age_max;

    if (looking_for?.trim()) body.looking_for = looking_for;
    if (family_plans?.trim()) body.family_plans = family_plans;

    //body.is_receive_marketing = is_receive_marketing;
    //body.is_accept_terms = is_accept_terms;\    if (google_id?.trim()) body.google_id = google_id;
    // if (educations?.trim()) body.educations = educations;
    if (pronouns_id) {
      // Convierte a número
      const convertedPronounsId = parseInt(pronouns_id, 10);

      // Verifica si la conversión fue exitosa
      if (!isNaN(convertedPronounsId)) {
        body.pronouns_id = convertedPronounsId;
      }
    }

    if (genders_id) {
      // Convierte a número
      const convertedGendersId = parseInt(genders_id, 10);

      // Verifica si la conversión fue exitosa
      if (!isNaN(convertedGendersId)) {
        body.genders_id = convertedGendersId;
      }
    }
    if (sex_interests_id?.length) body.sex_interests_id = sex_interests_id;
    //if (lookings?.length) body.lookings = lookings;
    //if (prompts?.length) body.prompts = prompts;
    //if (photos?.length) body.photos = photos;
    //if (list?.length) body.list = list;

    // Campos adicionales
    if (job_name?.trim()) body.job_name = job_name;
    if (school?.trim()) body.school = school;
    //if (education?.trim()) body.education = education;
    if (religions_id?.trim()) body.religions_id = religions_id;
    if (politicals_id?.trim()) body.politicals_id = politicals_id;
    if (lifestyle_active_id?.trim()) body.lifestyle_active_id = lifestyle_active_id;
    if (lifestyle_drink_id?.trim()) body.lifestyle_drink_id = lifestyle_drink_id;
    if (lifestyle_smoke_id?.trim()) body.lifestyle_smoke_id = lifestyle_smoke_id;
    if (lifestyle_tabacco_id?.trim()) body.lifestyle_tabacco_id = lifestyle_tabacco_id;

    if (lifestyle_weed_id?.trim()) body.lifestyle_weed_id = lifestyle_weed_id;

    if (lifestyle_drug_id?.trim()) body.lifestyle_drug_id = lifestyle_drug_id;
    if (profile_image?.trim()) body.profile_image = profile_image;

    console.log('body:', body);
    const response = await axios.patch(url, body, { headers });

    console.log('response up', response.data);

    if (response.status === 200) {
      const existingUserString = await AsyncStorage.getItem('user');
      let existingUser = existingUserString ? JSON.parse(existingUserString) : {};
      existingUser = { ...existingUser, ...response.data.data };
      await AsyncStorage.setItem('user', JSON.stringify(existingUser));
      console.log('response update', response.data.data);
      return response.data.status;
    } else {
      console.log(response.data.status);
      return 'other';
    }
  } catch (error: any) {
    console.log('Error:', error.message);
    return error.message;
  }
}

async function UpdateProfileSingle(body) {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log(token);

    const url = `${environment.urlApi}/api/me/users`;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Accept': 'application/json',
    };
    console.log('body:', body);
    const response = await axios.patch(url, body, { headers });

    console.log('response up', response.data);

    if (response.status === 200) {

      return response.data.status;
    } else {
      console.log(response.data.status);
      return 'other';
    }
  } catch (error: any) {
    console.log('Error:', error.message);
    return error.message;
  }
}

async function GetPronouns() {
  try {

    const token = await AsyncStorage.getItem('token');

    const url = `${environment.urlApi}/api/pronouns`;
    //environment.apiGateway.conexion.conectando = true;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    const response = await axios.get(url, { headers });

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

async function GetGenders() {
  try {

    const token = await AsyncStorage.getItem('token');

    const url = `${environment.urlApi}/api/genders`;
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
async function UpDateGenders(genders: any[]) {
  try {
    if (!genders || !Array.isArray(genders) || genders.length === 0) {
      return "genders no es válido";
    }
    const url = `${environment.urlApi}/api/me/genders`;
    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    const body = {
      genders: genders.map(eth => ({
        genders_id: eth.id,
      })),
    };
    console.log('BODY eth', body.genders);
    const response = await axios.patch(url, body, { headers });
    if (response.status === 200) {
      return response.data.status;
    } else {
      console.log(response.data.status);
      return 'other';
    }
  } catch (error) {
    console.log('Error eth:', error.message);
    return error.message;
  }
}

async function GetSexInterests() {
  try {

    const token = await AsyncStorage.getItem('token');

    const url = `${environment.urlApi}/api/sex_interests`;
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
async function UpdateAttributes(attributes: any) {
  console.log(attributes)
  try {
    const token = await AsyncStorage.getItem('token');
    console.log(token);

    const url = `${environment.urlApi}/api/me/attributes`;

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }; 
    console.log("BODY AA ",attributes)
    const response = await axios.patch(url, attributes, { headers });

    if (response.status === 200 || response.status === 201) {
      return response.data.status;
    } else {
      console.log(response.data.status);
      return 'other';
    }
  } catch (error: any) {
    console.log('Error:', error.message);
    return error.message;
  }
}

async function DeleteAttribute(attributeId: number) {
  console.log("attributeId ",attributeId)

  try {
    const token = await AsyncStorage.getItem('token');

    const url = `${environment.urlApi}/api/me/prompts/${attributeId}`;

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const response = await axios.delete(url, { headers });

    if (response.status === 200 || response.status === 204) {
      console.log("RESPONSE DELETE ",response.data)
      return response.data.status;
    } else {
      console.log('Unexpected status:', response.status);
      return 'other';
    }
  } catch (error: any) {
    console.log('Error:', error.message);
    return error.message;
  }
}


async function GetLookings() {
  try {
    const token = await AsyncStorage.getItem('token');

    const url = `${environment.urlApi}/api/lookings`; // editated /me/ 

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

async function PostLookings(lookings: any) {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log(token);

    const url = `${environment.urlApi}/api/me/users/lookings`;

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    {/* {
    "lookings": [
        { 
            "looking_id": 1
        },
        {
            "looking_id": 2
        }
    ]
    }*/}

    const response = await axios.post(url, lookings, { headers });

    if (response.status === 200 || response.status === 201) {
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

async function GetEducation() {
  try {
    const token = await AsyncStorage.getItem('token');

    const url = `${environment.urlApi}/api/educations`;

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


async function GetReligions() {
  try {
    const token = await AsyncStorage.getItem('token');

    const url = `${environment.urlApi}/api/religions`;

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

async function GetPolitical() {
  try {
    const token = await AsyncStorage.getItem('token');

    const url = `${environment.urlApi}/api/politicals`;

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

async function GetLifeActive() {
  try {
    const token = await AsyncStorage.getItem('token');

    const url = `${environment.urlApi}/api/lifestyle/active`;

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
async function GetLifeDrink() {
  try {
    const token = await AsyncStorage.getItem('token');

    const url = `${environment.urlApi}/api/lifestyle/drink`;

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
async function GetLifeSmoke() {
  try {
    const token = await AsyncStorage.getItem('token');

    const url = `${environment.urlApi}/api/lifestyle/smoke`;

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

async function GetLifeTobacco() {
  try {
    const token = await AsyncStorage.getItem('token');

    const url = `${environment.urlApi}/api/lifestyle/tabacco`;

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

async function GetLifeWeed() {
  try {
    const token = await AsyncStorage.getItem('token');

    const url = `${environment.urlApi}/api/lifestyle/weeds`;

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

async function GetLifeDrugs() {
  try {
    const token = await AsyncStorage.getItem('token');

    const url = `${environment.urlApi}/api/lifestyle/drugs`;

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


async function GetLookingfor() {
  try {
    const token = await AsyncStorage.getItem('token');

    const url = `${environment.urlApi}/api/looking_for`;

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


async function GetFamilyplans() {
  try {
    const token = await AsyncStorage.getItem('token');

    const url = `${environment.urlApi}/api/family_plans`;

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

async function GetSunsign() {
  try {
    const token = await AsyncStorage.getItem('token');

    const url = `${environment.urlApi}/api/sunsings`;

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

async function GetEthnicity() {
  try {
    const token = await AsyncStorage.getItem('token');

    const url = `${environment.urlApi}/api/ethnicities`;

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


async function GetPrompts() {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log(token);

    const url = `${environment.urlApi}/api/prompts_categories`;

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

async function GetPromptsSubtitle(id: any) {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log(token);

    const url = `${environment.urlApi}/api/prompts?prompt_id=${id}`;

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

async function GetPromptsMe() {
  try {
    const url = `${environment.urlApi}/api/me/prompts`;
    const token = await AsyncStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    };
    const response = await axios.get(url, { headers });

    if (response.status === 200) {
      console.log(response.data)
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
async function UpdatePromptsMe(prompts) {
  console.log("v....",prompts)
  try {
    const token = await AsyncStorage.getItem('token');
    console.log(token);

    const url = `${environment.urlApi}/api/me/prompts`;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const body = {
      prompts: prompts
    };
    console.log("body ",body)
    const response = await axios.patch(url, body, { headers });

    if (response.status === 200 || response.status === 201) {
      return response.data.status;
    } else {
      console.log(response.data.status);
      return 'other';
    }
  } catch (error: any) {
    console.log('Error:', error.message);
    return error.message;
  }
}
async function RegisterPhotos(photos: any) {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    const body = {
      image_urls: photos.map(photo => ({ image_url: photo }))
    };
    const url = `${environment.urlApi}/api/me/photos`;

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const response = await axios.post(url, body, { headers });

    if (response.status === 200 || response.status === 201) {
      return response.data.status;
    } else {
      console.log(response.data.status);
      return 'other';
    }
  } catch (error: any) {
    console.log('Error:', error.message);
    return error.message;
  }
}

async function GetAllPhotos() {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log(token);

    const url = `${environment.urlApi}/api/me/photos`;

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    };

    const response = await axios.get(url, { headers });

    if (response.status === 200) {
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

async function UpdatePhotos(photos: any) {
  console.log("photos update",photos)
  try {
    const token = await AsyncStorage.getItem('token');
    console.log(token);

    const url = `${environment.urlApi}/api/me/photos`;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const body = {
      image_urls: [
        {
          id:photos.idSave,
          image_url: photos.photoUrlUpdate[0]
        }
      ]
    };
    console.log("body ",body)
    const response = await axios.patch(url, body, { headers });

    if (response.status === 200 || response.status === 201) {
      return response.data.status;
    } else {
      console.log(response.data.status);
      return 'other';
    }
  } catch (error: any) {
    console.log('Error:', error.message);
    return error.message;
  }
}

















async function UsersbyId() {
  try {

    const token = await AsyncStorage.getItem('token');
    console.log(token)

    const url = `${environment.urlApi}/api/users`;
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

async function ValidateEmail(email: any) {
  try {

    const token = await AsyncStorage.getItem('token');
    console.log(token)

    const url = `${environment.urlApi}/api/users/validateEmail/${email}`;
    //environment.apiGateway.conexion.conectando = true;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Accept': 'application/json',
    };

    const response = await axios.get(url, { headers });

    console.log(response)

    // Verificar el estado de la respuesta
    if (response.status === 200) {

      //await AsyncStorage.setItem('token', (response.data.access_token).toString());
      //await AsyncStorage.setItem('user', JSON.stringify(response.data.user)); // Convertir objeto a cadena JSON
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


async function UpdateProfileEmail(email: any) {
  try {
    const url = `${environment.urlApi}/api/users`;

    const token = await AsyncStorage.getItem('token');
    console.log(token)

    const headers = {
      Authorization: `Bearer ${token}`,
      'Accept': 'application/json',
    };

    const body = {
      email: email
    };

    console.log(body)

    const response = await axios.patch(url, body, { headers });

    console.log(response)


    if (response.status === 200) {


      // Obtener el objeto existente de AsyncStorage
      const existingUserString = await AsyncStorage.getItem('user');
      let existingUser = existingUserString ? JSON.parse(existingUserString) : {};

      // Agregar nuevos datos al objeto existente
      existingUser = { ...existingUser, ...response.data.user };

      // Guardar el objeto actualizado en AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(existingUser));


      return response.data.status;
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

async function UpdateProfilePhone(phone: any) { // Falta Fotografia :) y revisar 400 ERR
  try {
    const url = `${environment.urlApi}/api/users`;

    const token = await AsyncStorage.getItem('token');
    console.log(token)

    const headers = {
      Authorization: `Bearer ${token}`,
      'Accept': 'application/json',
    };

    const body = {
      phone: phone
    };

    console.log(body)

    const response = await axios.patch(url, body, { headers });

    console.log(response)


    if (response.status === 200) {
      console.log('response', (response.data.access_token).toString())
      await AsyncStorage.setItem('token', (response.data.access_token).toString());

      // Obtener el objeto existente de AsyncStorage
      const existingUserString = await AsyncStorage.getItem('user');
      let existingUser = existingUserString ? JSON.parse(existingUserString) : {};

      // Agregar nuevos datos al objeto existente
      existingUser = { ...existingUser, ...response.data.user };

      // Guardar el objeto actualizado en AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(existingUser));

      return response.data.status;
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

async function LogoutUser() {
  try {
    const url = `${environment.urlApi}/api/auth/logout`;
    const token = await AsyncStorage.getItem('token');
    console.log(token)

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const response = await axios.post(url, null, { headers });

    if (response.status === 200) {
      return response.data.status;
    } else {
      // Manejar otros casos de respuesta aquí si es necesario
      console.log(response.data.status)
      return response.data;
    }
  } catch (error: any) {
    console.log('Error:', error.message);
    return error.message;
  }
}

async function DeleteUser(reason: any, userId: any) {
  try {
    const url = `${environment.urlApi}/api/users/${userId}`;
    const token = await AsyncStorage.getItem('token');
    console.log(token);

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const body = {
      reason: reason,
    };

    const response = await axios.delete(url, { data: body, headers });

    if (response.status === 200) {
      console.log('response', (response.data.access_token).toString())
      return response.data.status;
    } else {
      // Manejar otros casos de respuesta aquí si es necesario
      console.log(response.data.status)
      return response.data;
    }
  } catch (error: any) {
    console.log('Error:', error.message);
    return error.message;
  }
}

async function ResetPasswordUser(email: any, password: any, tokenesp: any) {
  try {

    const url = `${environment.urlApi}/api/auth/resetPassword`;


    const headers = {
      Authorization: `Bearer ${tokenesp}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const body = {
      email: email,//"hansgianfranco@gmail.com",
      password: password //"@Hgcm123456"
    };

    console.log('BODY', body)
    console.log('TOKEN', tokenesp)

    const response = await axios.post(url, body, { headers });

    if (response.status === 200) {


      return response.data.status;
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

async function ChangePasswordUserEmail(email: any, password: any) {
  try {
    const url = `${environment.urlApi}/api/auth/recovery_password/change_password`;
    const token = await AsyncStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json'
    };

    const body = { email: email, password: password };
    console.log('BODY', body)
    const response = await axios.post(url, body, { headers });

    if (response.status === 200) {
      return response.data.status;
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

async function ChangePasswordUserNumber(phone: any, password: any) {
  try {
    const url = `${environment.urlApi}/api/auth/recovery_password/change_password`;
    const token = await AsyncStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json'
    };

    const body = { phone: phone, password: password };
    console.log('BODY', body)
    const response = await axios.post(url, body, { headers });

    if (response.status === 200) {
      return response.data.status;
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

async function PostSunSingns(sunSingns: any[]) {
  try {
    if (!sunSingns || !Array.isArray(sunSingns) || sunSingns.length === 0) {
      return "sunSingns no es válido";
    }
    const url = `${environment.urlApi}/api/me/sunsigns`;
    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    const body = {
      sunsigns: sunSingns.map(sign => ({
        sunsigns_id: sign.id,
      })),
    };
    console.log('BODY', body.sunsigns);
    const response = await axios.post(url, body, { headers });
    if (response.status === 200) {
      return response.data.status;
    } else {
      console.log(response.data.status);
      return 'other';
    }
  } catch (error) {
    console.log('Error s:', error.message);
    return error.message;
  }
}
async function UpdateSunSingns(sunSingns: any[]) {
  try {
    if (!sunSingns || !Array.isArray(sunSingns) || sunSingns.length === 0) {
      return "sunSingns no es válido";
    }
    const url = `${environment.urlApi}/api/me/sunsigns`;
    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    const body = {
      sunsigns: sunSingns.map(sign => ({
        sunsigns_id: sign.id,
      })),
    };
    console.log('BODY', body.sunsigns);
    const response = await axios.patch(url, body, { headers });
    if (response.status === 200) {
      return response.data.status;
    } else {
      console.log(response.data.status);
      return 'other';
    }
  } catch (error) {
    console.log('Error s:', error.message);
    return error.message;
  }
}
async function PostEthnicities(ethnicities: any[]) {
  try {
    if (!ethnicities || !Array.isArray(ethnicities) || ethnicities.length === 0) {
      console.error("ethnicities no es un array o está vacío");
      return "ethnicities no es válido";
    }

    const url = `${environment.urlApi}/api/me/ethnicities`;
    const token = await AsyncStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    // Transformar los datos para cumplir con el formato esperado
    const body = {
      ethnicities: ethnicities.map(eth => ({
        ethnicities_id: eth.id,
      })),
    };

    console.log('BODY', body.ethnicities);

    const response = await axios.post(url, body, { headers });

    if (response.status === 200) {
      return response.data.status;
    } else {
      console.log(response.data.status);
      return 'other';
    }
  } catch (error) {
    console.log('Error s:', error.message);
    return error.message;
  }
}

async function UpdateEthnicities(ethnicities: any[]) {
  try {
    if (!ethnicities || !Array.isArray(ethnicities) || ethnicities.length === 0) {
      return "ethnicities no es válido";
    }
    const url = `${environment.urlApi}/api/me/ethnicities`;
    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    const body = {
      ethnicities: ethnicities.map(eth => ({
        ethnicities_id: eth.id,
      })),
    };
    console.log('BODY eth', body.ethnicities);
    const response = await axios.patch(url, body, { headers });
    if (response.status === 200) {
      return response.data.status;
    } else {
      console.log(response.data.status);
      return 'other';
    }
  } catch (error) {
    console.log('Error eth:', error.message);
    return error.message;
  }
}
async function UpdateEducations(educations: any[]) {
  try {
    if (!educations || !Array.isArray(educations) || educations.length === 0) {
      return "educations no es válido";
    }
    const url = `${environment.urlApi}/api/me/educations`;
    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    const body = {
      educations: educations.map(education => ({
        education_id: education.id,
      })),
    };
    console.log("body ED", body)
    const response = await axios.patch(url, body, { headers });
    if (response.status === 200) {
      return response.data.status;
    } else {
      console.log(response.data.status);
      return 'other';
    }
  } catch (error) {
    console.log('Error edu:', error.message);
    return error.message;
  }
}

// Exporta las funciones que necesites utilizar en tu código.
export {
  OtpSend,
  OtpReceive,
  MeUser,
  CreateUser,
  LoginUser,
  LoginUserWithGoogle, 
  UpdateProfile,
  UpdateProfileSingle,
  PostSunSingns,
  PostEthnicities,
  UpdateSunSingns,
  UpdateEthnicities,
  UpdateEducations,
  GetPronouns,
  GetGenders,
  UpDateGenders,
  GetSexInterests,
  GetAttributes,
  DeleteAttribute,
  PostAttributes,
  UpdateAttributes,
  GetLookings,
  PostLookings,
  GetPrompts,
  UpdatePromptsMe,
  RegisterPhotos,
  GetAllPhotos,
  UpdatePhotos,
  GetPromptsSubtitle,
  //RegisterSwipes,
  GetLookingfor,
  GetFamilyplans,
  GetSunsign,
  GetEthnicity,

  GetEducation,
  GetReligions,
  GetPolitical,
  GetLifeActive,
  GetLifeDrink,
  GetLifeSmoke,

  GetLifeTobacco,
  GetLifeDrugs,
  GetLifeWeed,
  ChangePasswordUserEmail,
  ChangePasswordUserNumber,
  GetPromptsMe,


  //GetMatches,
  //CancelMatch,
  //GetSwipes,
  // AUN NO USO LAS DE ABAJO PERO CREO QUE LAS USARE EN ALGUN MOMENTO
  LogoutUser,
  DeleteUser,
  ResetPasswordUser,
  ValidateEmail,
  UpdateProfileEmail,
  UpdateProfilePhone
};