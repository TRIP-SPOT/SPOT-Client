import { useState } from 'react';
import { FlatList, View } from 'react-native';
import Badge, { badgePath } from '@/components/common/Badge';
import Spacing from '@/components/common/Spacing';
import BadgeListBottomSheet from '@/components/mypage/BadgeListBottomSheet';

export default function MyBadge() {
  const [containerWidth, setContainerWidth] = useState(0);
  const [selectedBadge, setSelectedBadge] = useState<keyof typeof badgePath>();

  const locationList = Object.keys(badgePath) as (keyof typeof badgePath)[];
  const numColumns = 3;
  const paddingHorizontal = 8;

  return (
    <>
      <FlatList
        data={locationList}
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
        style={{ flex: 1, backgroundColor: 'black', paddingHorizontal }}
        renderItem={({ item, index }) => (
          <View>
            <Badge
              location={item}
              width={(containerWidth - paddingHorizontal * 2) / numColumns}
              label={item}
              onPress={() => setSelectedBadge(item)}
              count={index % 4}
            />
            <Spacing height={20} />
          </View>
        )}
        keyExtractor={(item) => item}
        numColumns={numColumns}
      />
      {selectedBadge && (
        <BadgeListBottomSheet
          selectedBadge={selectedBadge}
          onClose={() => setSelectedBadge(undefined)}
        />
      )}
    </>
  );
}
