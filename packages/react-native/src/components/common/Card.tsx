import { ImageBackground, Text, View } from 'react-native';
import { SpotData } from '../../types/spot';

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
        <View className="p-2.5">
          <View className="flex flex-row gap-2 justify-start items-center">
            <Text className="text-white font-[800] text-[16px] leading-[16px]">
              {locationName}
            </Text>
            <Text className="text-white">하트</Text>
          </View>
          <Text className="text-white font-[400] text-[12px] leading-[16px]">
            {location}
          </Text>
          <Text className="text-white">{tags}</Text>
        </View>
      </View>
    </ImageBackground>
  );
}
