import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageData } from '@/types/storage';

interface SaveDataParams {
  key: keyof StorageData;
  value: StorageData[keyof StorageData];
}

const getData = async <K extends keyof StorageData>(key: K) => {
  const stringData = await AsyncStorage.getItem(key);

  if (stringData) {
    return JSON.parse(stringData) as StorageData[K];
  }

  return null;
};

const saveData = async ({ key, value }: SaveDataParams) => {
  const stringifiedObject = JSON.stringify(value);
  await AsyncStorage.setItem(key, stringifiedObject);
};

export const AppStorage = {
  getData,
  saveData,
};
