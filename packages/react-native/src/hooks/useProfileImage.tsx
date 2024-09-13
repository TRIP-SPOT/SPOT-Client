import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import useGallery from './useGallery';
import SelectProfileIcon from '@/assets/SelectProfileIcon';
import useNicknameQuery from '@/apis/queries/useNicknameQuery';

export default function useProfileImage(uri?: string) {
  const { getPhoto } = useGallery();
  const { nickname } = useNicknameQuery();
  const [photoUri, setPhotoUri] = useState(uri || '');

  const getPhtoFromLibrary = async () => {
    const photo = (await getPhoto()) as string;

    if (photoUri && !photo) return;

    setPhotoUri(photo || '');
  };

  const renderProfileContent = () => {
    if (photoUri) {
      return (
        <Image
          className="w-[140px] h-[140px] rounded-full bg-SPOT-white"
          source={{ uri: photoUri }}
          resizeMode="contain"
        />
      );
    }
    if (nickname && nickname.colorSet) {
      return (
        <View
          className="w-[140px] h-[140px] rounded-full justify-center items-center"
          style={{
            backgroundColor: nickname?.colorSet.bgColor,
          }}
        >
          <Text
            className="font-Pretendard-Medium text-[40px]"
            style={{
              color: nickname.colorSet.color,
            }}
          >
            {nickname.value}
          </Text>
        </View>
      );
    }

    return <SelectProfileIcon />;
  };

  function ProfileImage({ disableTouch }: { disableTouch?: boolean }) {
    return (
      <TouchableOpacity onPress={disableTouch ? undefined : getPhtoFromLibrary}>
        {renderProfileContent()}
      </TouchableOpacity>
    );
  }

  return { photoUri, ProfileImage };
}
