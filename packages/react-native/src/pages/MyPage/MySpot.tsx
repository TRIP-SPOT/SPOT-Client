import { Dimensions, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MySpotBlock from '@/components/mypage/MySpotBlock';
import withSuspense from '@/components/HOC/withSuspense';
import useMySpotsQuery from '@/apis/queries/mypage/useMySpotsQuery';
import { getDisplayRegion } from '@/utils/getDisplayRegionName';
import { StackNavigation } from '@/types/navigation';

const { width } = Dimensions.get('window');

export default withSuspense(function MySpot() {
  const { data: mySpots } = useMySpotsQuery();
  const navigation = useNavigation<StackNavigation<'MyPage/Profile'>>();
  const numColumns = 2;
  const paddingHorizontal = 8;
  const gap = 16;

  return (
    <FlatList
      data={mySpots}
      style={{ flex: 1, backgroundColor: 'black', paddingHorizontal }}
      renderItem={({ item }) => (
        <MySpotBlock
          title={item.name}
          backgroundImage={item.posterUrl}
          location={getDisplayRegion({
            locationEnum: item.region,
            cityEnum: item.city,
          })}
          width={(width - gap * 2 - paddingHorizontal * 2) / numColumns}
          gap={gap}
          handleClickBlock={() =>
            navigation.navigate('MyPage/Detail', {
              contentId: item.contentId,
              id: item.id,
              workId: item.workId,
            })
          }
        />
      )}
      keyExtractor={(item) => item.name + item.id + item.contentId}
      numColumns={numColumns}
    />
  );
});
