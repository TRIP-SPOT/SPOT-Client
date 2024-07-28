import { Font } from 'design-system';
import { View } from 'react-native';

export default function MyBadge() {
  return (
    <View className="bg-red-300">
      <Font color="white" type="title1">
        MyBadge
      </Font>
    </View>
  );
}
