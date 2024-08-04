import { Font } from 'design-system';
import { View } from 'react-native';

interface BadgeProps {
  content: string;
}

export default function Badge({ content }: BadgeProps) {
  return (
    <View className="flex items-center justify-center rounded-[32px] py-1 px-2.5 bg-SPOT-white/30">
      <Font type="ui-text" color="white">
        {content}
      </Font>
    </View>
  );
}
