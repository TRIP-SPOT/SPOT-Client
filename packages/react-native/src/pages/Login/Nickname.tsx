import Header from '@/components/signup/Header';
import Overlay from '@/components/signup/Overlay';
import { SignupStackNavigation } from '@/routes/SignupStackNavigator';
import { Font } from 'design-system';
import { useState } from 'react';
import { TextInput, View } from 'react-native';

interface NicknameProps {
  navigation: SignupStackNavigation<'Signup/Nickname'>;
}

export default function Niakname({ navigation }: NicknameProps) {
  const [nickname, setNickname] = useState('');

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
        <TextInput
          value={nickname}
          onChangeText={(nickname) => setNickname(nickname)}
          placeholder="닉네임"
          placeholderTextColor="#ffffff"
          className="text-SPOT-white text-body2  rounded-md p-4  placeholder-SPOT-white bg-SPOT-white/60 mt-[8px]"
          onSubmitEditing={() => {
            navigation.navigate('Signup/Profile', {
              nickname,
            });
          }}
        />
      </View>
    </Overlay>
  );
}
