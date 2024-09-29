import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Camera } from 'react-native-vision-camera';
import { forwardRef } from 'react';
import useCamera from '@/hooks/useCamera';
import ChangeIcon from '@/assets/ChangeIcon';

const { width } = Dimensions.get('window');
interface SpotCameraProps {
  filterUrl: string;
  takePhoto: () => Promise<void>;
}

export default forwardRef<Camera, SpotCameraProps>(function SpotCamera(
  { filterUrl, takePhoto },
  cameraRef,
) {
  const { device, hasPermission, changeCameraPosition } = useCamera();

  if (!device || !hasPermission) return null;

  return (
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
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive
          photo
          enableZoomGesture
          audio={false}
        />
        <Image source={{ uri: filterUrl }} />
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
  );
});
