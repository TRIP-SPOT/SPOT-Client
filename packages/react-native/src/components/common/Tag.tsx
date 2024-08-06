import { Font } from 'design-system';
import { View } from 'react-native';

interface TagProps {
  tag: string;
}

export default function Tag({ tag }: TagProps) {
  return (
    <View className="rounded-[32px] py-1 px-2 bg-SPOT-black/50">
      <Font type="body3" color="white">
        #{tag}
      </Font>
    </View>
  );
}
