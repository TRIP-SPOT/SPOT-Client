import { Font } from 'design-system';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackNavigation, StackRouteProps } from '@/types/navigation';
import withSuspense from '@/components/HOC/withSuspense';
import DetailTabNavigator from '@/routes/DetailTabNavigator';
import Spacing from '@/components/common/Spacing';
import HeartIcon from '@/assets/HeartIcon';
import useDetailQuery from '@/apis/queries/detail/useDetailQuery';
import useSpotLikeMutation from '@/apis/mutations/useSpotLikeMutation';
import MutationLoadingModal from '@/components/common/MutationLoadingModal';
import { getDisplayRegion } from '@/utils/getDisplayRegionName';
import Header from '@/components/common/Header';

const Detail = withSuspense(() => {
  const route = useRoute<StackRouteProps<'Home/Detail'>>();
  const navigation = useNavigation<StackNavigation<'Home/Detail'>>();
  const { id, contentId: paramsContentId, workId } = route.params;

  const { data } = useDetailQuery({ id: paramsContentId, workId });
  const { like, cancelLike, isLikePending, isCancelLikePending } =
    useSpotLikeMutation({ contentId: paramsContentId });

  const {
    title,
    longitude,
    latitude,
    contentId,
    addr1,
    addr2,
    overview,
    likeCount,
    isLiked,
    city,
    region,
    dist,
    contentTypeId,
    image,
    posterUrl,
  } = data;

  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  const defaultPaddingTop =
    headerHeight - insets.top > 0 ? headerHeight - insets.top : 0;

  const handleAddPlan = () => {
    const currentRoute = route.name.split('/')[0];
    const nextRoute = `${currentRoute}/AddSpot` as
      | 'Home/AddSpot'
      | 'Mypage/AddSpot';

    navigation.navigate(nextRoute, {
      spots: [
        {
          contentId: Number(contentId),
          title,
          image: image ?? posterUrl,
          addr1,
          addr2,
          longitude,
          latitude,
          overview,
          dist,
          contentTypeId,
        },
      ],
    });
  };

  return (
    <>
      <MutationLoadingModal
        isSubmiting={isCancelLikePending || isLikePending}
      />
      <Header />
      {(image || posterUrl) && (
        <ImageBackground
          className="h-[200px]"
          source={{ uri: image || posterUrl }}
        >
          <View className="flex-1 justify-end bg-black/20" />
        </ImageBackground>
      )}

      <View
        className="flex-1 bg-[#100F0F] p-4 pb-0"
        style={{
          paddingTop: !image && !posterUrl ? defaultPaddingTop : 16,
        }}
      >
        <View>
          <Font type="mainTitle" color="white">
            {title}
          </Font>
          <Spacing height={10} />
          <View className="justify-between flex flex-row items-center">
            <Font type="body1" color="white" opacity={0.5}>
              {getDisplayRegion({
                locationEnum: region,
                cityEnum: city,
              })}
            </Font>
            <TouchableOpacity
              className="flex-row justify-center items-center gap-1 flex"
              onPress={() => (isLiked ? cancelLike({ id }) : like({ id }))}
            >
              <View>
                <HeartIcon color={isLiked ? 'red' : 'white'} />
              </View>
              <View>
                <Font type="body3" color="white">
                  {likeCount}
                </Font>
              </View>
            </TouchableOpacity>
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
