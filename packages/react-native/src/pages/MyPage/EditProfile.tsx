import { Font } from 'design-system';
import { View } from 'react-native';
import BackGroundGradient from '@/layouts/BackGroundGradient';

export default function EditProfile() {
  return (
    <BackGroundGradient>
      <View className="p-4 pt-14">
        <Font color="white" type="title1">
          프로필 수정
        </Font>
      </View>
    </BackGroundGradient>
  );
}
