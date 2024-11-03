import AsyncStorage from '@react-native-async-storage/async-storage';

const LocalStorage = {
  /**
   * check if item exists in stored data
   */
  hasKey: async key => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return keys.includes(key);
    } catch (e) {
      console.error('Error: localStorage >> hasKey >> ', e);
    }

    return false;
  },
  /**
   * get stored item
   */
  getItem: async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (e) {
      console.error('Error: localStorage >> getItem >> ', e);
    }

    return null;
  },
  /**
   * set single item
   */
  setItem: async (key, data) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      throw new Error('Error: localStorage >> setItem >> ', e);
    }
  },
  /**
   * set multiple item
   */
  multiSet: async keyValuePairs => {
    try {
      await AsyncStorage.multiSet(keyValuePairs);
    } catch (e) {
      throw new Error('Error: localStorage >> multiSet >> ', e);
    }
  },
  /**
   * Remove stored data by key
   */
  removeItem: async key => {
    try {
      if (Array.isArray(key)) {
        await AsyncStorage.multiRemove(key);
      } else {
        await AsyncStorage.removeItem(key);
      }
    } catch (e) {
      throw new Error('Error: localStorage >> removeItem >> ', e);
    }
  },
  /**
   * Remove All Stored Storage
   */
  removeAll: async key => {
    try {
      await AsyncStorage.clear(key);
    } catch (e) {
      throw new Error('Error: localStorage >> removeAll >> ', e);
    }
  },
};

export default LocalStorage;
