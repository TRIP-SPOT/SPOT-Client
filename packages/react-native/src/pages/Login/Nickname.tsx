import { Font, TextField } from 'design-system';
import { useState } from 'react';
import { TextInput, View } from 'react-native';
import Header from '@/components/signup/Header';
import Overlay from '@/components/signup/Overlay';
import { SignupStackNavigation } from '@/types/navigation';

interface NicknameProps {
  navigation: SignupStackNavigation<'Signup/Nickname'>;
}

export default function Niakname({ navigation }: NicknameProps) {
  const [nickname, setNickname] = useState('');

  const validateNickname = () => {
    if (nickname.length < 0 || nickname.length > 7) {
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateNickname()) {
      navigation.navigate('Signup/Profile', {
        nickname,
      });
    }
  };

  return (
    <Overlay>
      <Header
        onBack={() => navigation.goBack()}
        onCancel={() => navigation.goBack()}
      />
      <View className="flex w-full mt-[30px]">
        <Font type="mainTitle" color="white">
          사용할 닉네임을
        </Font>
        <Font type="mainTitle" color="white">
          입력하세요
        </Font>
      </View>
      <View className="w-full mt-[30px] flex ">
        <Font type="body2" color="white">
          닉네임
        </Font>

        <TextField
          value={nickname}
          onChange={(newNickname) => setNickname(newNickname)}
          onSubmit={handleSubmit}
          placeholder="닉네임"
          validate={validateNickname}
        />
      </View>
    </Overlay>
  );
}
