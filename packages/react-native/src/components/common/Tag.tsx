import { Text, View } from 'react-native';

interface TagProps {
  tag: string;
}

export default function Tag({ tag }: TagProps) {
  return (
    <View
      className="rounded-[32px] py-1 px-2"
      style={{ backgroundColor: 'rgba(15,15,15,0.7)' }}
    >
      {/* FIXME: 디자인 시스템 적용 */}
      <Text className="text-white font-Pretendard-Light text-[12px] leading-[16px]">
        #{tag}
      </Text>
    </View>
  );
}
