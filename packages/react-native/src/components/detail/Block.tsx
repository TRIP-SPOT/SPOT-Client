import { Font } from 'design-system';
import { View } from 'react-native';
import Spacing from '../common/Spacing';

interface BlockProps {
  title: string;
  content: string;
}

export default function Block({ title, content }: BlockProps) {
  return (
    <View className="bg-[#191919] rounded-lg p-4 flex-1">
      <Font type="body3" color="white">
        {title}
      </Font>
      <Spacing height={15} />
      <Font.Bold type="body2" color="white">
        {content}
      </Font.Bold>
    </View>
  );
}
