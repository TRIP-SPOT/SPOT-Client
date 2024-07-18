import SelectProfile from '@/assets/SelectProfile';
import { Font } from 'design-system';
import { Image, View } from 'react-native';
import Header from '@/components/signup/Header';
import Overlay from '@/components/signup/Overlay';
import { SignupStackNavigation } from '@/types/navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useGallery from '@/hooks/useGallery';
import { useState } from 'react';

interface ProfileProps {
  navigation: SignupStackNavigation<'Signup/Profile'>;
}

export default function Profile({ navigation }: ProfileProps) {
  const { getPhoto } = useGallery();
  const [photoUri, setPhotoUri] = useState('');

  const handlePhotoGet = async () => {
    const photo = await getPhoto();

    if (photoUri && !photo) return;

    setPhotoUri(photo || '');
  };

  return (
    <Overlay>
      <Header
        onBack={() => navigation.goBack()}
        onCancel={() => navigation.navigate('Main')}
      />
      <View className="flex w-full mt-[30px]">
        <Font type="mainTitle" color="white">
          사용할 프로필 사진을
        </Font>
        <Font type="mainTitle" color="white">
          설정하세요
        </Font>
      </View>
      <View className="w-full mt-[60px] justify-center items-center">
        <TouchableOpacity onPress={handlePhotoGet}>
          {photoUri ? (
            <Image
              className="w-[140px] h-[140px] rounded-full bg-SPOT-white"
              source={{ uri: photoUri }}
              resizeMode="contain"
            />
          ) : (
            <SelectProfile />
          )}
        </TouchableOpacity>
        <TouchableOpacity className="mt-[30px]">
          <Font.Bold type="body2" color="white" underline>
            닉네임으로 프로필 사진 설정하기
          </Font.Bold>
        </TouchableOpacity>
      </View>
    </Overlay>
  );
}
