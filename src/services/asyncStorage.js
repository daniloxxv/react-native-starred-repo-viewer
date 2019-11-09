import AsyncStorage from '@react-native-community/async-storage';
import showErrorMessage from './showErrorMessage';

export default async (items, name, callback) => {
  try {
    if (items.length > 0) {
      await AsyncStorage.setItem(name, JSON.stringify(items));
    } else {
      const data = await AsyncStorage.getItem(name);
      data && callback(JSON.parse(data));
    }
  } catch (err) {
    showErrorMessage('Unable to retrieve items from async storage');
  }
};
