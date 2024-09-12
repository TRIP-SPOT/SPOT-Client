import { View } from 'react-native';
import { Font } from 'design-system';

export default function EmptyPlan() {
  return (
    <View className="justify-center items-center flex-grow">
      <Font type="body1" color="white">
        비어있어요
      </Font>
      <Font type="body1" color="white">
        나만의 여행을 채워보세요
      </Font>
    </View>
  );
}
