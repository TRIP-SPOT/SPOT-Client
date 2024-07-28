import { FlatList, ImageBackground, Text, View } from 'react-native';
import HeartIcon from '@assets/HeartIcon';
import { SpotData } from '@/types/spot';
import Tag from './Tag';

function TagSeperation() {
  return <View style={{ width: 5 }} />;
}

export default function Card({ data }: { data: SpotData }) {
  const { location, locationName, tags, backgroundImage } = data;

  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      className="w-[180px] h-[240px] rounded-lg overflow-hidden"
    >
      <View
        className="flex-1 justify-end"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <View className="p-2.5 gap-2">
          <View>
            <View className="flex flex-row gap-2 justify-start items-center">
              {/* FIXME: 디자인 시스템 적용 */}
              <Text className="text-white font-Pretendard-Bold text-[16px] leading-[20px]">
                {locationName}
              </Text>
              <View>
                <HeartIcon width={12} height={12} />
              </View>
            </View>
            {/* FIXME: 디자인 시스템 적용 */}
            <Text className="text-white font-Pretendard-Medium text-[12px] leading-[16px]">
              {location}
            </Text>
          </View>
          <View>
            <FlatList
              data={tags}
              keyExtractor={(_, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={TagSeperation}
              renderItem={({ item }) => <Tag tag={item} />}
              className="flex flex-row"
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
