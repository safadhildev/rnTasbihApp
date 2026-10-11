import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import momentHijri from 'moment-hijri';
import uuid from 'react-native-uuid';
import {useLocalContext} from '../../components/context';
import date from '../Date';
import LocalStorage from '../LocalStorage';
import {THEME_CONSTANT} from '../themes';
import {onSearch} from '../common';
import {COUNTER_TYPE, STORAGE_KEYS} from '../../components/constants';
import {HOME} from '../../routes/constants';
import mobileAds, {MaxAdContentRating} from 'react-native-google-mobile-ads';
import {preload as preloadInterstitial} from '../interstitial';

const useGlobalFucntion = () => {
  const {updateContext, currentData, theme, counterType} = useLocalContext();

  const _getNewCounterData = () => {
    return {
      date: moment().format('DD/MM/YYYY'),
      hijriDate: momentHijri().format('iYYYY/iM/iD'),
      id: uuid.v4(),
      count: 0,
    };
  };
  /**
   * @returns {Promise<boolean>} true when the theme was actually changed
   */
  const _handleChangeTheme = async key => {
    if (!key || THEME_CONSTANT[key] === theme) {
      return false;
    }
    try {
      await LocalStorage.setItem(STORAGE_KEYS.THEME, key);
      updateContext({theme: THEME_CONSTANT[key]});
      return true;
    } catch (e) {
      throw new Error(e);
    }
  };

  /**
   * @returns {Promise<boolean>} true when the counter type was actually changed
   */
  const _handleChangeCounterType = async key => {
    if (!key || key === counterType) {
      return false;
    }
    try {
      await LocalStorage.setItem(STORAGE_KEYS.COUNTER_TYPE, key);
      updateContext({
        counterType: key,
        currentData: _getNewCounterData(),
      });
      return true;
    } catch (e) {
      throw new Error(e);
    }
  };

  const _handleResetCounter = async () => {
    try {
      updateContext({
        currentData: _getNewCounterData(),
      });
    } catch (e) {
      throw new Error(e);
    }
  };

  const _fetchSaveRecords = async searchValue => {
    try {
      const savedExists = await LocalStorage.hasKey(STORAGE_KEYS.RECORDS);
      if (savedExists) {
        const records = await AsyncStorage.getItem(STORAGE_KEYS.RECORDS);

        if (searchValue) {
          return onSearch(searchValue, JSON.parse(records));
        }
        return JSON.parse(records);
      }
    } catch (e) {
      console.error(e);
    }

    return [];
  };

  const _handleMultiDelete = async ids => {
    try {
      const savedExists = await LocalStorage.hasKey(STORAGE_KEYS.RECORDS);
      if (savedExists) {
        const records = await AsyncStorage.getItem(STORAGE_KEYS.RECORDS);
        const savedData = JSON.parse(records);
        const filteredData = savedData.filter(item => !ids.includes(item.id));
        await AsyncStorage.setItem(
          STORAGE_KEYS.RECORDS,
          JSON.stringify(filteredData),
        );
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  const _handleDelete = async (id = null) => {
    try {
      const savedExists = await LocalStorage.hasKey(STORAGE_KEYS.RECORDS);
      if (savedExists) {
        const records = await AsyncStorage.getItem(STORAGE_KEYS.RECORDS);
        const savedData = JSON.parse(records);
        const filteredData = savedData.filter(item => item.id !== id);
        await AsyncStorage.setItem(
          STORAGE_KEYS.RECORDS,
          JSON.stringify(filteredData),
        );
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  const _handleSaveRecord = async ({item, count, id}) => {
    try {
      let savedData = [];
      const savedExists = await LocalStorage.hasKey(STORAGE_KEYS.RECORDS);
      if (savedExists) {
        const records = await AsyncStorage.getItem(STORAGE_KEYS.RECORDS);
        savedData = JSON.parse(records);
      }

      const updatedData = [
        ...savedData,
        {
          id: id ?? currentData?.id ?? uuid.v4(),
          zikir: item,
          unix: moment().unix(),
          date: date.getTodayDateAndTime(),
          hijriDate: date.getHijriDate(),
          count,
        },
      ];

      await AsyncStorage.setItem(
        STORAGE_KEYS.RECORDS,
        JSON.stringify(updatedData),
      );

      updateContext({
        currentData: {...currentData, count: 0, id: uuid.v4()},
      });
    } catch (e) {
      throw new Error(e);
    }
  };

  const _handleUpdateRecord = async ({id, data}) => {
    try {
      let savedData = [];
      const savedExists = await LocalStorage.hasKey(STORAGE_KEYS.RECORDS);
      if (savedExists) {
        const records = await AsyncStorage.getItem(STORAGE_KEYS.RECORDS);
        savedData = JSON.parse(records);

        const index = savedData.findIndex(item => item.id === id);

        if (index !== -1) {
          savedData[index] = {...savedData[index], zikir: data};
          await AsyncStorage.setItem(
            STORAGE_KEYS.RECORDS,
            JSON.stringify(savedData),
          );
        }
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  const _init = async navigation => {
    try {
      const storedTheme = await LocalStorage.getItem(STORAGE_KEYS.THEME);
      const storedCounterType = await LocalStorage.getItem(STORAGE_KEYS.COUNTER_TYPE);
      updateContext({
        theme: JSON.parse(storedTheme) ?? THEME_CONSTANT.lime,
        counterType: JSON.parse(storedCounterType) ?? COUNTER_TYPE.CLICKER,
        currentData: {
          date: moment().format('DD/MM/YYYY'),
          hijriDate: momentHijri().format('iYYYY/iM/iD'),
          id: uuid.v4(),
          count: 0,
        },
      });

      await _initAds();

      navigation.replace(HOME);
    } catch (e) {
      console.error(e);
    }
  };

  const _initAds = async () => {
    try {
      await mobileAds().initialize();
      await mobileAds().setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,
        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,
        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,
        // An array of test device IDs to allow.
        testDeviceIdentifiers: ['EMULATOR'],
      });
      preloadInterstitial();
    } catch (e) {
      console.error(`_initAds: Error >> ${e}`);
    }
  };

  return {
    onChangeTheme: _handleChangeTheme,
    onChangeCounterType: _handleChangeCounterType,
    onSaveCount: _handleSaveRecord,
    onUpdateCount: _handleUpdateRecord,
    getSavedRecords: _fetchSaveRecords,
    onDelete: _handleDelete,
    onMultiDelete: _handleMultiDelete,
    onResetCounter: _handleResetCounter,
    init: _init,
  };
};

export default useGlobalFucntion;
