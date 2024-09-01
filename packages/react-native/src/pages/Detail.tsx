import { useRoute } from '@react-navigation/native';
import { ImageBackground, View } from 'react-native';
import { Font } from 'design-system';
import { StackRouteProps } from '@/types/navigation';
import useDetailQuery from '@/apis/queries/useDetailQuery';
import withSuspense from '@/components/HOC/withSuspense';
import DetailTabNavigator from '@/routes/DetailTabNavigator';
import Spacing from '@/components/common/Spacing';

const Detail = withSuspense(() => {
  const route = useRoute<StackRouteProps<'Home/Detail'>>();
  const { id: spotId } = route.params;

  const { data } = useDetailQuery(spotId);
  const { backgroundImage, location, title } = data;

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
          <Font type="body1" color="white" opacity={0.5}>
            {location}
          </Font>
        </View>
        <View className="flex-1 mt-4">
          <DetailTabNavigator />
        </View>
      </View>
    </>
  );
});

export default Detail;
