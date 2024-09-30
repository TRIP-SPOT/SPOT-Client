import { forwardRef } from 'react';
import { PhotoFile } from 'react-native-vision-camera';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Font } from 'design-system';
import ViewShot from 'react-native-view-shot';
import DownloadIcon from '@/assets/DownloadIcon';

const { width } = Dimensions.get('window');

interface CheckPhotoProps {
  filterUrl: string;
  savePhoto: () => Promise<void>;
  resetPhoto: () => void;
  photo: PhotoFile;
}

export default forwardRef<ViewShot, CheckPhotoProps>(function CheckPhoto(
  { filterUrl, savePhoto, resetPhoto, photo },
  captureRef,
) {
  return (
    <>
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
          <Image
            source={
              typeof filterUrl === 'string' ? { uri: filterUrl } : filterUrl
            }
            style={{
              width,
              height: (4 * width) / 3,
            }}
          />
        </ViewShot>
      </View>
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
            <Font.Bold type="body2" color="black">
              다시찍기
            </Font.Bold>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
});
