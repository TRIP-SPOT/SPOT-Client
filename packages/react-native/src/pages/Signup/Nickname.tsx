import { Font, TextField } from 'design-system';
import { useState } from 'react';
import { View } from 'react-native';
import Overlay from '@/components/signup/common/Overlay';
import { SignupStackNavigation } from '@/types/navigation';
import SignupHeader from '@/components/signup/common/Header';

interface NicknameProps {
  navigation: SignupStackNavigation<'Signup/Nickname'>;
}

export default function NickName({ navigation }: NicknameProps) {
  const [nickname, setNickname] = useState('');

  const isCorrect = nickname.length > 0 && nickname.length < 7;

  const handleSubmit = () => {
    if (isCorrect) {
      navigation.navigate('Signup/Profile', {
        nickname,
      });
    }
  };

  return (
    <Overlay>
      <SignupHeader
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
          isCorrect={isCorrect}
        />
      </View>
    </Overlay>
  );
}
