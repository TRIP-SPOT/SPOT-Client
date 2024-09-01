import { View, FlatList, ListRenderItem } from 'react-native';
import { Font } from 'design-system';

interface CardSliderProps<T> {
  title: string;
  data: ArrayLike<T> | null | undefined;
  renderItem: ListRenderItem<T> | null | undefined;
  gap?: number;
}

function CardSeperation({ gap }: { gap: number }) {
  return <View style={{ width: gap }} />;
}

export default function CardSlider<T>({
  title,
  data,
  renderItem,
  gap = 16,
}: CardSliderProps<T>) {
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
        ItemSeparatorComponent={() => CardSeperation({ gap })}
        renderItem={renderItem}
      />
    </View>
  );
}
