import { useState } from 'react';
import { FlatList, View } from 'react-native';
import Badge, { badgePath } from '@/components/common/Badge';
import Spacing from '@/components/common/Spacing';
import BadgeListBottomSheet from '@/components/mypage/BadgeListBottomSheet';
import useMyBadgeQuery from '@/apis/queries/mypage/useMyBadgeQuery';
import withSuspense from '@/components/HOC/withSuspense';

export default withSuspense(function MyBadge() {
  const { data: badges } = useMyBadgeQuery();
  const [containerWidth, setContainerWidth] = useState(0);
  // const [selectedBadge, setSelectedBadge] = useState<keyof typeof badgePath>();

  const numColumns = 3;
  const paddingHorizontal = 8;

  return (
    <>
      <FlatList
        data={badges}
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
        style={{ flex: 1, backgroundColor: 'black', paddingHorizontal }}
        renderItem={({ item, index }) => (
          <View>
            <Badge
              location={item.badgeRegion}
              width={(containerWidth - paddingHorizontal * 2) / numColumns}
              label={item.badgeRegion}
              // onPress={() => setSelectedBadge(item.badgeRegion)}
              count={item.count}
            />
            <Spacing height={20} />
          </View>
        )}
        keyExtractor={(item) => item.badgeRegion}
        numColumns={numColumns}
      />
      {/* <BadgeListBottomSheet
        selectedBadge={selectedBadge}
        onClose={() => setSelectedBadge(undefined)}
      /> */}
    </>
  );
});
