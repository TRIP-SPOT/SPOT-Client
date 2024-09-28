import { ReactNode } from 'react';
import { View, FlatList, ListRenderItem } from 'react-native';
import { Color, Font } from 'design-system';
import jugeokJosa from '@/utils/jugeokJosa';

interface CardSliderProps<T> {
  title: string;
  data: ArrayLike<T> | null | undefined;
  renderItem: ListRenderItem<T> | null | undefined;
  titleColor?: Color;
  titleGap?: number;
  gap?: number;
  RightActionButton?: ReactNode;
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
  RightActionButton,
}: CardSliderProps<T>) {
  return (
    <View>
      <View
        className="justify-between flex-row items-center"
        style={{
          marginBottom: titleGap || 16,
        }}
      >
        <View>
          <Font.Bold type="body1" color={titleColor || 'white'}>
            {title}
          </Font.Bold>
        </View>
        <View>{RightActionButton}</View>
      </View>
      {data?.length === 0 ? (
        <View className="justify-center items-center min-h-[80px]">
          <Font color={titleColor || 'white'} type="body2">
            조회된 {jugeokJosa(title)} 없어요.
          </Font>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => CardSeperation({ gap })}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}
