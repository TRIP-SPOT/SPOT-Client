import { FlatList, ImageBackground, Text, View } from 'react-native';
import { SpotData } from '../../types/spot';
import Tag from './Tag';
import Heart from '../../assets/Heart';

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
              <Text className="text-white font-[800] text-[16px] leading-[16px]">
                {locationName}
              </Text>
              <View>
                <Heart width={12} height={12} />
              </View>
            </View>
            <Text className="text-white font-[400] text-[12px] leading-[16px]">
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
              // @ts-expect-error 2339
              renderItem={({ item }) => <Tag tag={item} />}
              className="flex flex-row"
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
