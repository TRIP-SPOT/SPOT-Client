import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage에 안전하게 데이터를 저장하기 위한 타입입니다.
// key에는 리터럴타입, value는 저장할 데이터 타입을 지정해주세요.
interface NicknameStorage {
  key: 'nickname';
  value: string;
}

// 위에서 작성한 타입을 유니온 타입형태로 여기에 추가해주세요. key, value를 갖는 인터페이스여야합니다.
type StorageData = NicknameStorage;

const getData = async (key: StorageData['key']) => {
  const stringData = await AsyncStorage.getItem(key);

  if (stringData) {
    return JSON.parse(stringData);
  }

  return null;
};

const saveData = async ({ key, value }: StorageData) => {
  const stringifiedObject = JSON.stringify(value);
  await AsyncStorage.setItem(key, stringifiedObject);
};

export const AppStorage = {
  getData,
  saveData,
};
