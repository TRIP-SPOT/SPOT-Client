import { useRef, useState } from 'react';
import { Alert, View } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { Camera, PhotoFile } from 'react-native-vision-camera';
import useGallery from '@/hooks/useGallery';
import CheckPhoto from '@/components/camera/CheckPhoto';
import SpotCamera from '@/components/camera/SpotCamera';

export default function CameraPage() {
  const camera = useRef<Camera>(null);
  const captureRef = useRef<ViewShot>(null);
  const [photo, setPhoto] = useState<PhotoFile | null>(null);
  const { savePhoto: savePicture } = useGallery();

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
    <View className="flex-1 items-center justify-center bg-black">
      {photo ? (
        <CheckPhoto
          filterUrl=""
          savePhoto={savePhoto}
          resetPhoto={resetPhoto}
          photo={photo}
        />
      ) : (
        <SpotCamera filterUrl="" takePhoto={takePhoto} />
      )}
    </View>
  );
}
