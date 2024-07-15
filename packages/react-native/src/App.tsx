import { useState } from 'react';
import { View, Text, TextInput, ScrollView, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Card from './components/Card';
import CardSeperation from './components/CardSeperation';

export default function App() {
  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <LinearGradient
      colors={['#FF1919', '#000000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.3 }}
      className="w-screen h-screen"
    >
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.75)', 'rgba(0, 0, 0, 0.75)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="w-screen h-screen"
      >
        <ScrollView className="top-16 flex flex-col gap-10 p-4">
          {/* FIXME: 공통 폰트 디자인 적용: text-title1 */}
          <Text className="text-white font-[400] text-[22px] lZeading-[30px]">
            {/* TODO: 실제 사용자 이름 넣기 */}
            안녕하세요, 아무개님.{'\n'}오늘은 어디로 가 볼까요?
          </Text>
          {/* FIXME: 공통 폰트 디자인 적용: text-body1 text-spot-black */}
          <TextInput
            value={searchKeyword}
            onChangeText={(newKeyword) => setSearchKeyword(newKeyword)}
            placeholder="드라마/영화 제목을 검색하세요."
            placeholderTextColor="#0F0F0F"
            className="rounded-md p-4 opacity-60 bg-white border text-base text-[#0F0F0F]"
          />
          <View>
            {/* FIXME: 공통 폰트 디자인 적용: text-body1 */}
            <Text className="text-white font-extrabold text-base mb-4">
              나를 위한 여행지
            </Text>
            <FlatList
              // TODO: mock 데이터 삽입
              data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
              keyExtractor={(_, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={CardSeperation}
              renderItem={({ item }) => <Card locationName={item.toString()} />}
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </LinearGradient>
  );
}
