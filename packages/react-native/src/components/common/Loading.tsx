import { View } from 'react-native';
import { Font } from 'design-system';
import BackGroundGradient from '@/layouts/BackGroundGradient';

export default function Loading() {
  return (
    <BackGroundGradient withoutScroll>
      <View className="flex-1 justify-center items-center">
        <Font type="body1" color="white">
          잠시만
        </Font>
        <Font type="body1" color="white">
          기다려주세요
        </Font>
      </View>
    </BackGroundGradient>
  );
}
