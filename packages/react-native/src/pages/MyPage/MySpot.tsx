import { Dimensions, FlatList, View } from 'react-native';
import { Font } from 'design-system';
import MySpotBlock from '@/components/mypage/MySpotBlock';
import withSuspense from '@/components/HOC/withSuspense';
import useMySpotsQuery from '@/apis/queries/mypage/useMySpotsQuery';

const { width } = Dimensions.get('window');

export default withSuspense(
  function MySpot() {
    const { data: mySpots } = useMySpotsQuery();
    const numColumns = 2;
    const paddingHorizontal = 8;
    const gap = 16;

    if (mySpots.length === 0) {
      return (
        <View className="bg-black flex-1 p-4 justify-center items-center">
          <Font type="body2" color="white">
            좋아요한 SPOT이 없어요
          </Font>
        </View>
      );
    }

    return (
      <FlatList
        data={mySpots}
        style={{ flex: 1, backgroundColor: 'black', paddingHorizontal }}
        renderItem={({ item }) => (
          <MySpotBlock
            mySpot={item}
            width={(width - gap * 2 - paddingHorizontal * 2) / numColumns}
            gap={gap}
          />
        )}
        keyExtractor={(item) => item.name + item.id + item.contentId}
        numColumns={numColumns}
      />
    );
  },
  {
    fallback: (
      <View className="flex-1 justify-center items-center bg-SPOT-black">
        <Font type="body1" color="white">
          잠시만
        </Font>
        <Font type="body1" color="white">
          기다려주세요
        </Font>
      </View>
    ),
  },
);
