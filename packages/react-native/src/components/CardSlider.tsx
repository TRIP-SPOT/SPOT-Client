import { View, Text, FlatList } from 'react-native';
import Card from './common/Card';
import { SpotData } from '../types/spot';

interface CardSliderProps {
  title: string;
  data: SpotData[];
}
function CardSeperation() {
  return <View style={{ width: 16 }} />;
}

export default function CardSlider({ title, data }: CardSliderProps) {
  return (
    <View>
      {/* FIXME: 공통 폰트 디자인 적용: text-body1 */}
      <Text className="text-white font-extrabold text-base mb-4">{title}</Text>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={CardSeperation}
        renderItem={({ item }) => <Card data={item} />}
      />
    </View>
  );
}
