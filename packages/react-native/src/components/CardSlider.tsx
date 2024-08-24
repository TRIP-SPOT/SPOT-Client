import { View, FlatList } from 'react-native';
import { Font } from 'design-system';
import Card from './common/Card';
import { SpotData } from '@/types/spot';
import { CardSeperation } from './common/CardSeperation';

interface CardSliderProps {
  title: string;
  data: SpotData[];
}

export default function CardSlider({ title, data }: CardSliderProps) {
  return (
    <View>
      <View className="mb-4">
        <Font.Bold type="body1" color="white">
          {title}
        </Font.Bold>
      </View>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={CardSeperation}
        renderItem={({ item }) => <Card.Small data={item} />}
      />
    </View>
  );
}
