import AsyncStorage from '@react-native-async-storage/async-storage';
import {environment} from '../environtment';
import WalletManager from 'react-native-wallet-manager';

export const addPassToWallet = async (idTicket: string) => {
  try {
    const user: any = await AsyncStorage.getItem('user');
    const token = await AsyncStorage.getItem('token');
    const userObject = JSON.parse(user)
    const url = `${environment.urlApi}/api/tickets/${idTicket}/apple_wallet?by_userId=${userObject.id}`;
    const headers = {
     Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    const result = await WalletManager.addPassFromUrl(url);
    return result;
  } catch (error: any) {
    throw error;
  }
};
