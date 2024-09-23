import { Font } from 'design-system';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigation, StackRouteProps } from '@/types/navigation';
import withSuspense from '@/components/HOC/withSuspense';
import DetailTabNavigator from '@/routes/DetailTabNavigator';
import Spacing from '@/components/common/Spacing';
import HeartIcon from '@/assets/HeartIcon';
import useDetailQuery from '@/apis/queries/detail/useDetailQuery';

const Detail = withSuspense(() => {
  const route = useRoute<StackRouteProps<'Home/Detail'>>();
  const navigation = useNavigation<StackNavigation<'Home/Detail'>>();
  const { id: spotId } = route.params;

  const { data } = useDetailQuery(spotId);
  const {
    image,
    title,
    longitude,
    latitude,
    contentId,
    addr1,
    addr2,
    overview,
    posterUrl,
    likeCount,
    isLiked,
  } = data;

  const handleAddPlan = () => {
    navigation.navigate('Home/AddSpot', {
      spots: [
        // TODO: useDetailQuery 반환타입과 호환되지 않음
        // 추후 api응답 변경시 재변경 빌표
        {
          contentId: Number(contentId),
          title,
          image: image ?? posterUrl,
          addr1,
          addr2,
          longitude,
          latitude,
          overview,
        },
      ],
    });
  };

  return (
    <>
      <ImageBackground
        className="h-[200px]"
        source={{ uri: image ?? posterUrl }}
      >
        <View className="flex-1 justify-end bg-black/20" />
      </ImageBackground>
      <View className="flex-1 bg-[#100F0F] p-4 pb-0">
        <View>
          <Font type="mainTitle" color="white">
            {title}
          </Font>
          <Spacing height={10} />
          <View className="justify-between flex flex-row items-center">
            {/* TODO: city, region으로 변경해야하는지 확인 필요 */}
            <Font type="body1" color="white" opacity={0.5}>
              {addr1} {addr2}
            </Font>
            <View className="flex-row justify-center items-center gap-1 flex">
              <View>
                <HeartIcon color={isLiked ? 'red' : 'white'} />
              </View>
              <View>
                <Font type="body3" color="white">
                  {likeCount}
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
