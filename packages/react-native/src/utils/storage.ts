import AsyncStorage from '@react-native-async-storage/async-storage';
import { RegionRepresentImage } from '@/apis/queries/records/useRecordRepresentativeQuery';

// Stoarge에 저장할 value 타입, 인터페이스를 작성해주세요.
export interface NicknameStorageValue {
  value: string;
  colorSet?: {
    color: string;
    bgColor: string;
  };
}

type RegionRepresentImageStorageValue = RegionRepresentImage;

// Storage에 안전하게 데이터를 저장하기 위한 타입입니다.
// 위에서 작성한 타입을 key(고유한 key), value를 형태로 작성해주세요.
type StorageData = {
  nickname: NicknameStorageValue;
  representImage: RegionRepresentImageStorageValue;
};

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
