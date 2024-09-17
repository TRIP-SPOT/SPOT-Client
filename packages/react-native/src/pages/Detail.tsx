import { Font } from 'design-system';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigation, StackRouteProps } from '@/types/navigation';
import useDetailQuery from '@/apis/queries/useDetailQuery';
import withSuspense from '@/components/HOC/withSuspense';
import DetailTabNavigator from '@/routes/DetailTabNavigator';
import Spacing from '@/components/common/Spacing';
import HeartIcon from '@/assets/HeartIcon';
import { City, Region } from '@/constants/CITY';

const Detail = withSuspense(() => {
  const route = useRoute<StackRouteProps<'Home/Detail'>>();
  const navigation = useNavigation<StackNavigation<'Home/Detail'>>();
  const { id: spotId } = route.params;

  const { data } = useDetailQuery(spotId);
  const { backgroundImage, location, title } = data;

  const handleAddPlan = () => {
    navigation.navigate('Home/AddSpot', {
      spots: [
        // TODO: useDetailQuery 반환타입과 호환되지 않음
        // 추후 api응답 변경시 재변경 빌표
        {
          id: spotId,
          spotName: data.name,
          location: Region.BUSAN,
          image: data.backgroundImage,
          city: City.BUSAN,
        },
      ],
    });
  };

  return (
    <>
      <ImageBackground className="h-[200px]" source={{ uri: backgroundImage }}>
        <View className="flex-1 justify-end bg-black/20" />
      </ImageBackground>
      <View className="flex-1 bg-[#100F0F] p-4 pb-0">
        <View>
          <Font type="mainTitle" color="white">
            {title}
          </Font>
          <Spacing height={10} />
          <View className="justify-between flex flex-row items-center">
            <Font type="body1" color="white" opacity={0.5}>
              {location}
            </Font>
            {/* TODO: 좋아요 데이터 추가 필요(추후 api응답 타입 변경시 재변경 필요) */}
            <View className="flex-row justify-center items-center gap-1 flex">
              <View>
                <HeartIcon color="white" />
              </View>
              <View>
                <Font type="body3" color="white">
                  50
                </Font>
              </View>
            </View>
          </View>
          <Spacing height={10} />
          <TouchableOpacity
            className="bg-SPOT-red py-2 justify-center items-center rounded-lg"
            onPress={handleAddPlan}
          >
            <Font type="body1" color="white">
              내 여행에 담기
            </Font>
          </TouchableOpacity>
        </View>
        <View className="flex-1 mt-4">
          <DetailTabNavigator />
        </View>
      </View>
    </>
  );
});

export default Detail;
