import { Text, View } from 'react-native';

interface TagProps {
  tag: string;
}

export default function Tag({ tag }: TagProps) {
  return (
    <View
      className="rounded-[32px] py-0.5 px-1.5"
      style={{ backgroundColor: 'rgba(15,15,15,0.7)' }}
    >
      <Text className="text-white font-[400] text-[12px] leading-[16px]">
        #{tag}
      </Text>
    </View>
  );
}
