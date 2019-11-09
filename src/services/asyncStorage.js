import AsyncStorage from '@react-native-community/async-storage';
import showErrorMessage from './showErrorMessage';

export const getAsyncStorageItem = async name => {
  try {
    const data = await AsyncStorage.getItem(name);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    showErrorMessage({message: 'Unable to retrieve items from async storage'});
  }
};

export const setAsyncStorageItem = async (item, name) => {
  try {
    await AsyncStorage.setItem(name, JSON.stringify(item));
  } catch (err) {
    showErrorMessage({message: 'Unable to use async storage'});
  }
};
