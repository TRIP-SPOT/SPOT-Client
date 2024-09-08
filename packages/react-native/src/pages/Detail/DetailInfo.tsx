import { ScrollView, View } from 'react-native';
import Block from '@/components/detail/Block';
import DetailMap from './DetailMap';

export default function DetailInfo() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="bg-[#100F0F] flex-1"
    >
      <View
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'space-between',
          gap: 20,
          paddingBottom: 20,
        }}
      >
        <Block title="주소" content="강원 강릉시 주문진읍 해안로 1609" />
        <View className="rounded-lg overflow-hidden items-center justify-center">
          <DetailMap />
        </View>
        <Block
          title="내용 타이틀"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        />
        <Block
          title="내용 타이틀"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        />
      </View>
    </ScrollView>
  );
}
