import { useRef, useState } from 'react';
import { Alert, View } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { Camera, PhotoFile } from 'react-native-vision-camera';
import { useRoute } from '@react-navigation/native';
import useGallery from '@/hooks/useGallery';
import CheckPhoto from '@/components/camera/CheckPhoto';
import SpotCamera from '@/components/camera/SpotCamera';
import { StackRouteProps } from '@/types/navigation';
import { FILTER_PATHS } from '@/constants/FILTER_PATHS';
import FilterCarousel from '@/components/camera/FilterCarousel';

export default function CameraPage() {
  const camera = useRef<Camera>(null);
  const captureRef = useRef<ViewShot>(null);
  const [photo, setPhoto] = useState<PhotoFile | null>(null);
  const { savePhoto: savePicture } = useGallery();
  const [experienceFilterIndex, setExperienceFilterIndex] = useState<number>(0);

  const route = useRoute<StackRouteProps<'Camera'>>();
  const paramsFilterUrl = route.params?.filterUrl;
  const isExperience = !paramsFilterUrl;

  const takePhoto = async () => {
    if (!camera.current) return;

    const newPhoto = await camera.current.takePhoto();
    setPhoto(newPhoto);
  };

  const savePhoto = async () => {
    if (!photo || !captureRef.current?.capture) return;

    const photoUri = await captureRef.current?.capture();
    savePicture(photoUri).then(() => {
      Alert.alert('저장이 완료되었습니다.');
      setPhoto(null);
    });
  };

  const resetPhoto = () => {
    setPhoto(null);
  };

  return (
    <View className="flex-1 items-center justify-center bg-black flex-col">
      {photo ? (
        <CheckPhoto
          ref={captureRef}
          filterUrl={paramsFilterUrl ?? FILTER_PATHS[experienceFilterIndex]}
          savePhoto={savePhoto}
          resetPhoto={resetPhoto}
          photo={photo}
        />
      ) : (
        <View className="flex-1 justify-center items-center flex-col">
          <SpotCamera
            ref={camera}
            hideButton={isExperience}
            filterUrl={paramsFilterUrl ?? FILTER_PATHS[experienceFilterIndex]}
            takePhoto={takePhoto}
          />
          <View className="absolute bottom-0">
            <FilterCarousel
              filterIndex={experienceFilterIndex}
              takePhoto={takePhoto}
              handleSnap={(index) => setExperienceFilterIndex(index)}
            />
          </View>
        </View>
      )}
    </View>
  );
}
