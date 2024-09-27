import { useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Font } from 'design-system';
import ViewShot from 'react-native-view-shot';
import { Camera, PhotoFile } from 'react-native-vision-camera';
import useCamera from '@/hooks/useCamera';
import DownloadIcon from '@/assets/DownloadIcon';
import useGallery from '@/hooks/useGallery';
import ChangeIcon from '@/assets/ChangeIcon';

const { width } = Dimensions.get('window');

export default function CameraPage() {
  const camera = useRef<Camera>(null);
  const captureRef = useRef<ViewShot>(null);
  const { device, hasPermission, changeCameraPosition } = useCamera();
  const [Filter] = useState(<View className="w-20 h-20 absolue bg-blue-300" />);
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

  if (!device || !hasPermission) return null;

  return (
    <View className="flex-1 items-center justify-center bg-black">
      {photo && (
        <View style={{ width, height: (4 * width) / 3, position: 'relative' }}>
          <ViewShot
            ref={captureRef}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={{ uri: `file://${photo.path}` }}
              style={StyleSheet.absoluteFill}
            />
            {Filter}
          </ViewShot>
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
        </View>
      )}
      {!photo && (
        <>
          <View
            style={{
              width,
              height: (4 * width) / 3,
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Camera
              ref={camera}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive
              photo
              enableZoomGesture
              audio={false}
            />
            {Filter}
          </View>
          <View className="absolute items-center justify-between flex-row bottom-0 pb-16 w-full px-10 pt-10">
            <TouchableOpacity
              onPress={changeCameraPosition}
              className="items-center justify-center w-[52px] h-[52px] rounded-full bg-SPOT-black/50"
            >
              <ChangeIcon />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={takePhoto}
              className="items-center justify-center"
            >
              <View className="absolute bg-white w-[80px] h-[80px] rounded-full" />
              <View className="absolute bg-white w-[72px] h-[72px] rounded-full border-[3px] border-SPOT-black" />
            </TouchableOpacity>
            <View className="w-[52px] h-[52px]" />
          </View>
        </>
      )}
    </View>
  );
}
