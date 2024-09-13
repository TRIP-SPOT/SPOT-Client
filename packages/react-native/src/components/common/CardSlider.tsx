import { View, FlatList, ListRenderItem } from 'react-native';
import { Color, Font } from 'design-system';

interface CardSliderProps<T> {
  title: string;
  data: ArrayLike<T> | null | undefined;
  renderItem: ListRenderItem<T> | null | undefined;
  titleColor?: Color;
  titleGap?: number;
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
  titleColor,
  titleGap,
}: CardSliderProps<T>) {
  return (
    <View>
      <View
        style={{
          marginBottom: titleGap || 16,
        }}
      >
        <Font.Bold type="body1" color={titleColor || 'white'}>
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
