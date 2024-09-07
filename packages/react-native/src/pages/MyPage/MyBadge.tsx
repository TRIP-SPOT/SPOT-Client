import { useState } from 'react';
import { Alert, FlatList } from 'react-native';
import Badge, { badgePath } from '@/components/common/Badge';

export default function MyBadge() {
  const [containerWidth, setContainerWidth] = useState(0);
  const numColumns = 3;
  const locationList = Object.keys(badgePath) as (keyof typeof badgePath)[];

  return (
    <FlatList
      data={locationList}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      style={{ flex: 1, backgroundColor: 'black' }}
      renderItem={({ item, index }) => (
        <Badge
          location={item}
          width={containerWidth / numColumns}
          label={item}
          onPress={() => Alert.alert(`${item} 뱃지 클랙`)}
          count={index % 4}
        />
      )}
      keyExtractor={(item) => item}
      numColumns={numColumns}
    />
  );
}
