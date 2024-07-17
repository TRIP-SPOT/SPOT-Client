import { useRef, useState } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Font } from 'design-system';
import { Camera, PhotoFile } from 'react-native-vision-camera';
import useCamera from '@/hooks/useCamera';
import DownloadIcon from '@/assets/DownloadIcon';

export default function CameraPage() {
  const camera = useRef<Camera>(null);
  const { device, hasPermission } = useCamera();
  const [photo, setPhoto] = useState<PhotoFile | null>(null);

  const takePhoto = async () => {
    if (!camera.current) return;

    const newPhoto = await camera.current.takePhoto();
    setPhoto(newPhoto);
  };

  const savePhoto = () => {
    if (!photo) return;

    Alert.alert('저장됨');
  };

  const resetPhoto = () => {
    setPhoto(null);
  };

  if (!device || !hasPermission) return null;

  return (
    <View className="flex-1 items-center justify-center">
      {photo && (
        <>
          <Image source={{ uri: photo.path }} style={StyleSheet.absoluteFill} />
          <View className="absolute bottom-14 flex-row items-center justify-between w-full px-8">
            <View className="w-20" />
            <View className="w-20">
              <TouchableOpacity
                onPress={savePhoto}
                className="items-center justify-center rounded-full bg-SPOT-white w-20 h-20"
              >
                <DownloadIcon width={60} height={60} />
              </TouchableOpacity>
            </View>
            <View className="w-20">
              <TouchableOpacity
                onPress={resetPhoto}
                className="bg-SPOT-white p-3 rounded-lg items-center justify-center"
              >
                <Font.Bold type="body1" color="black">
                  다시찍기
                </Font.Bold>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
      {!photo && (
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive
            photo
            audio={false}
          />
          <TouchableOpacity
            onPress={takePhoto}
            className="absolute bottom-24 items-center justify-center"
          >
            <View className="absolute bg-white w-[80px] h-[80px] rounded-full" />
            <View className="absolute bg-white w-[72px] h-[72px] rounded-full border-[3px] border-SPOT-black" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
