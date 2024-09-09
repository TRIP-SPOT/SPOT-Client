import { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import useGallery from './useGallery';
import SelectProfileIcon from '@/assets/SelectProfileIcon';

export default function useProfileImage(uri?: string) {
  const { getPhoto } = useGallery();
  const [photoUri, setPhotoUri] = useState(uri || '');

  const getPhtoFromLibrary = async () => {
    const photo = (await getPhoto()) as string;

    if (photoUri && !photo) return;

    setPhotoUri(photo || '');
  };

  function ProfileImage() {
    return (
      <TouchableOpacity onPress={getPhtoFromLibrary}>
        {photoUri ? (
          <Image
            className="w-[140px] h-[140px] rounded-full bg-SPOT-white"
            source={{ uri: photoUri }}
            resizeMode="contain"
          />
        ) : (
          <SelectProfileIcon />
        )}
      </TouchableOpacity>
    );
  }

  return { photoUri, ProfileImage };
}
