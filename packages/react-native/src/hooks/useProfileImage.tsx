import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Asset } from 'react-native-image-picker';
import useGallery from './useGallery';
import SelectProfileIcon from '@/assets/SelectProfileIcon';
import useProfileQuery from '@/apis/queries/useProfileQuery';

export default function useProfileImage() {
  const { getPhoto } = useGallery();
  const { profile } = useProfileQuery();
  const [photoAsset, setPhotoAsset] = useState<Asset>();

  const getPhtoFromLibrary = async () => {
    const photo = await getPhoto({ fullObject: true });

    if (photoAsset && !photo) return;

    setPhotoAsset(photo || undefined);
  };

  const renderProfileContent = () => {
    if (photoAsset || profile?.image) {
      return (
        <Image
          className="w-[140px] h-[140px] rounded-full bg-SPOT-white"
          source={{ uri: photoAsset?.uri || profile?.image }}
          resizeMode="contain"
        />
      );
    }

    if (profile && profile.colorSet?.bgColor) {
      return (
        <View
          className="w-[140px] h-[140px] rounded-full justify-center items-center"
          style={{
            backgroundColor: profile?.colorSet.bgColor,
          }}
        >
          <Text
            className="font-Pretendard-Medium text-[40px]"
            style={{
              color: profile.colorSet.color,
            }}
          >
            {profile.nickname}
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

  return { photoAsset, ProfileImage };
}
